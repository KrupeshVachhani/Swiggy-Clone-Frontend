import { useEffect, useState } from "react";
import "./index.css";
import logo from "/assets/logo.svg";
import Restaurents from "../Restaurant Card/Restaurents";

const Index = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [restaurantsLocationTitle, setRestaurantsLocationTitle] =
    useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: newLatitude, longitude: newLongitude } =
            position.coords;
          setLatitude(newLatitude);
          setLongitude(newLongitude);
          localStorage.setItem("Latitude", newLatitude);
          localStorage.setItem("Longitude", newLongitude);
        },
        () => {
          setError("Please enable location services");
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Location services not supported");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3001/api/restaurants?lat=${latitude}&lng=${longitude}`
        );

        const data = await response.json();

        // Find restaurant list
        const restaurantListCard = data?.data?.cards?.find(
          (card) =>
            card?.card?.card?.["@type"]?.includes("RestaurantListWidget") ||
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        );

        const restaurantList =
          restaurantListCard?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants || [];

        // Find title from BasicContent card
        const titleCard = data?.data?.cards?.find(
          (card) =>
            card?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.seo.widgets.v1.BasicContent" &&
            card?.card?.card?.title
        );

        const locationTitle = titleCard?.card?.card?.title || "Restaurants";

        setRestaurantsLocationTitle(locationTitle);
        setRestaurants(restaurantList.length ? restaurantList : null);
      } catch {
        setError("Unable to fetch restaurants");
      } finally {
        setIsLoading(false);
      }
    };

    if (latitude && longitude) {
      fetchRestaurants();
    }
  }, [latitude, longitude]);

  return (
    <div className="restaurant-container">
      <div className="nav_head px-40 py-4">
        <ul className="nav_ul flex justify-between">
          <ul className="nav_item_ul_1 flex justify-center items-center gap-5">
            <img src={logo} alt="swiggy_logo" className="nav_logo_main w-12" />
            <div>
              {latitude && longitude
                ? `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                : "Location not available"}
            </div>
          </ul>
          <ul className="nav_item_ul_2 flex gap-20 justify-center items-center">
            <li className="nav_ul_2_item">Swiggy Corporate</li>
            <li className="nav_ul_2_item">Search</li>
            <li className="nav_ul_2_item">Offers</li>
            <li className="nav_ul_2_item">Help</li>
            <li className="nav_ul_2_item">Sign In</li>
            <li className="nav_ul_2_item">Cart</li>
          </ul>
        </ul>
      </div>

      <div className="restaurant-content px-40">
        {isLoading ? (
          <div className="loading">Loading restaurants...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : !restaurants ? (
          <div>No restaurants found</div>
        ) : (
          <Restaurents data={restaurants} title={restaurantsLocationTitle} />
        )}
      </div>
    </div>
  );
};

export default Index;
