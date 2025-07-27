import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Get the address from the location addition page
const MapComponent = ({ address }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  // Function that sends the address to get the coordinates
  const geocodeAddress = async () => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw`
    );
    // Update coordinates and location
    const data = res.data;
    if (data.results[0]) {
      const { lat, lng } = data.results[0].geometry.location;
      setLocation({ lat, lng });
    }
  };

  // Re-fetch according to address value change
  useEffect(() => {
    if (address) geocodeAddress();
  }, [address]);

  return (
    <div
      role="application"
      aria-label={t("locationInfo.mapView", { address })}
      tabIndex="0"
    >
      {/* Ready-made components from the Google Maps library */}
      <GoogleMap
        mapTypeControl={false}
        mapContainerStyle={{ width: "100%", height: "300px" }}
        center={location}
        zoom={15}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          accessibilityProvider: true,
        }}
      >
        <Marker
          position={location}
          title={address}
          aria-label={t("locationInfo.locationMarker", { address })}
        />
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
