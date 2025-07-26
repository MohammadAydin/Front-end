async function getLocationName(lat, lng) {
  const apiKey = "AIzaSyDH-rfDKqld3jf64z84P9e34iNBkdSwZlw"; 
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );
  const data = await response.json();

  if (data.status === "OK") {
    return data.results[0].formatted_address;
  } else {
    throw new Error("Failed to fetch location name");
  }
}

export default getLocationName;