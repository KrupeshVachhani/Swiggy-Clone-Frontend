import { useEffect, useState } from "react";
import "./index.css";
import logo from "/assets/logo.svg";

const Index = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Fetch the user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      //navigator for fetch lat and long
      navigator.geolocation.getCurrentPosition(
        //sucess callback
        (position) => {
          const { latitude: newLatitude, longitude: newLongitude } =
            position.coords;

          // Retrieve the stored latitude and longitude from localStorage
          const storedLatitude = localStorage.getItem("Latitude");
          const storedLongitude = localStorage.getItem("Longitude");

          // Check if the new location is different from the stored location
          if (
            storedLatitude !== newLatitude.toString() ||
            storedLongitude !== newLongitude.toString()
          ) {
            setLatitude(newLatitude);
            setLongitude(newLongitude);

            // Update localStorage with the new location
            localStorage.setItem("Latitude", newLatitude);
            localStorage.setItem("Longitude", newLongitude);
          }
        },

        //failure callback
        (error) => {
          console.error("Error getting location:", error.message);
        },

        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  // Fetch restaurants data based on the location
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`
        );
        const data = await response.json();
        console.log("Restaurant Data:", data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    if (latitude && longitude) {
      fetchRestaurants();
    }
  }, [latitude, longitude]);

  return (
    <>
      <div className="nav_head">
        <ul className="nav_ul">
          <ul className="nav_item_ul_1">
            <img src={logo} alt="swiggy_logo" className="nav_logo_main" />
            <div>Location</div>
          </ul>
          <ul className="nav_item_ul_2">
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Swiggy Corporate
            </li>
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Search
            </li>
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Offers
            </li>
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Help
            </li>
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Sign In
            </li>
            <li className="nav_ul_2_item">
              <img src="" alt="" /> Cart
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
};

export default Index;
