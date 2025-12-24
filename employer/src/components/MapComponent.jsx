import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Get the address from the location addition page
const MapComponent = ({ address, onLocationSelect, isSelectable = false }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const GOOGLE_MAPS_API_KEY = "AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw";

  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Function that sends the address to get the coordinates
  const geocodeAddress = async (addr) => {
    if (!addr) return;
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          addr
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      // Update coordinates and location
      const data = res.data;
      if (data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reverse geocode coordinates to get address
  const reverseGeocode = async (lat, lng) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = res.data;
      if (data.results[0] && onLocationSelect) {
        const result = data.results[0];
        const addressComponents = result.address_components;

        // Extract address components
        let street1 = "";
        let street2 = "";
        let city = "";
        let country = "";
        let postalCode = "";

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            street1 = component.long_name;
          } else if (types.includes("route")) {
            street1 = street1 ? `${street1} ${component.long_name}` : component.long_name;
          } else if (types.includes("locality") || types.includes("administrative_area_level_2")) {
            city = component.long_name;
          } else if (types.includes("country")) {
            country = component.long_name;
          } else if (types.includes("postal_code")) {
            postalCode = component.long_name;
          }
        });

        // Call the callback with the selected location data
        onLocationSelect({
          lat,
          lng,
          street1: street1 || result.formatted_address.split(",")[0],
          city: city || "",
          country: country || "",
          postalCode: postalCode || "",
          fullAddress: result.formatted_address,
        });
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle map click
  const handleMapClick = (e) => {
    if (isSelectable && e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setLocation({ lat, lng });
      reverseGeocode(lat, lng);
    }
  };

  // Initialize with default location if no address provided
  useEffect(() => {
    if (location.lat === 0 && location.lng === 0 && isLoaded) {
      setLocation({ lat: 51.2277, lng: 6.7735 }); // Default to Düsseldorf, Germany
    }
  }, [isLoaded]);

  // Re-fetch according to address value change
  useEffect(() => {
    if (address && isLoaded) {
      geocodeAddress(address);
    }
  }, [address, isLoaded]);

  // Show loading state while script is loading
  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold mb-2">Error loading map</p>
          <p className="text-gray-600 text-sm">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#F47621] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="application"
      aria-label={t("locationInfo.mapView", { address })}
      tabIndex="0"
      className="relative w-full h-full"
    >
      {isSelectable && (
        <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-sm font-medium text-gray-700">
          {t("locationInfo.clickToSelect") || "Click on the map to select location"}
        </div>
      )}
      {isLoading && (
        <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
          <div className="w-5 h-5 border-2 border-[#F47621] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Ready-made components from the Google Maps library */}
      <GoogleMap
        mapTypeControl={false}
        mapContainerStyle={{ width: "100%", height: "100%", minHeight: "300px" }}
        center={location.lat !== 0 && location.lng !== 0 ? location : { lat: 51.2277, lng: 6.7735 }}
        zoom={location.lat !== 0 && location.lng !== 0 ? 15 : 10}
        onClick={handleMapClick}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          clickableIcons: false,
          draggable: isSelectable,
          cursor: isSelectable ? "crosshair" : "default",
        }}
      >
        {location.lat !== 0 && location.lng !== 0 && (
          <Marker
            position={location}
            title={address || t("locationInfo.selectedLocation")}
            aria-label={t("locationInfo.locationMarker", { address })}
            draggable={isSelectable}
            onDragEnd={(e) => {
              if (e.latLng) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setLocation({ lat, lng });
                reverseGeocode(lat, lng);
              }
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
