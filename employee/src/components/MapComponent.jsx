import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";

// Get the address from the location addition page
const MapComponent = ({ address }) => {


 
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  // Function that sends the address to get the coordinates
  const geocodeAddress = async () => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw`
    );
    // Update coordinates and location
    const data =  res.data;
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
    // Ready-made components from the Google Maps library
      <GoogleMap
    mapTypeControl={false}
      mapContainerStyle={{ width: "100%", height: "300px" }}
        center={location}
        zoom={15}
        options={{
        mapTypeControl: false, 
        streetViewControl: false, 
  
      }}
      >
        <Marker position={location} />
      </GoogleMap>
  );
};

export default MapComponent;
