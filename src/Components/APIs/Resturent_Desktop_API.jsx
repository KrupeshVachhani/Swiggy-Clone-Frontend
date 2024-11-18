// /* eslint-disable no-unused-vars */
// import { useEffect, useState, useCallback } from "react";
// import { AlertCircle } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import "./index.css";
// import logo from "/assets/logo.svg";

// // Constants
// const SWIGGY_API_BASE_URL = "https://www.swiggy.com/dapi/restaurants/list/v5";
// const GEOLOCATION_OPTIONS = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// // Custom hook for managing location
// const useGeolocation = () => {
//   const [location, setLocation] = useState({
//     latitude: null,
//     longitude: null,
//     error: null,
//     loading: true
//   });

//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       setLocation(prev => ({
//         ...prev,
//         error: "Geolocation is not supported",
//         loading: false
//       }));
//       return;
//     }

//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
      
//       // Compare with stored values
//       const storedLatitude = localStorage.getItem("Latitude");
//       const storedLongitude = localStorage.getItem("Longitude");

//       if (
//         storedLatitude !== latitude.toString() ||
//         storedLongitude !== longitude.toString()
//       ) {
//         localStorage.setItem("Latitude", latitude);
//         localStorage.setItem("Longitude", longitude);
//       }

//       setLocation({
//         latitude,
//         longitude,
//         error: null,
//         loading: false
//       });
//     };

//     const handleError = (error) => {
//       setLocation(prev => ({
//         ...prev,
//         error: error.message,
//         loading: false
//       }));
//     };

//     navigator.geolocation.getCurrentPosition(
//       handleSuccess,
//       handleError,
//       GEOLOCATION_OPTIONS
//     );
//   }, []);

//   return location;
// };

// // Custom hook for fetching restaurants
// const useRestaurants = (latitude, longitude) => {
//   const [restaurants, setRestaurants] = useState({
//     data: null,
//     error: null,
//     loading: false
//   });

//   const fetchRestaurants = useCallback(async () => {
//     if (!latitude || !longitude) return;

//     setRestaurants(prev => ({ ...prev, loading: true }));
    
//     try {
//       const response = await fetch(
//         `${SWIGGY_API_BASE_URL}?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`
//       );
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch restaurants');
//       }
      
//       const data = await response.json();
//       setRestaurants({
//         data,
//         error: null,
//         loading: false
//       });
//     } catch (error) {
//       setRestaurants({
//         data: null,
//         error: error.message,
//         loading: false
//       });
//     }
//   }, [latitude, longitude]);

//   useEffect(() => {
//     fetchRestaurants();
//   }, [fetchRestaurants]);

//   return { ...restaurants, refetch: fetchRestaurants };
// };

// // Navigation items data
// const NAV_ITEMS = [
//   { id: 1, label: "Swiggy Corporate", icon: "" },
//   { id: 2, label: "Search", icon: "" },
//   { id: 3, label: "Offers", icon: "" },
//   { id: 4, label: "Help", icon: "" },
//   { id: 5, label: "Sign In", icon: "" },
//   { id: 6, label: "Cart", icon: "" }
// ];

// const Index = () => {
//   const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();
//   const { 
//     data: restaurantsData, 
//     error: restaurantsError, 
//     loading: restaurantsLoading,
//     refetch: refetchRestaurants 
//   } = useRestaurants(latitude, longitude);

//   if (locationError) {
//     return (
//       <Alert variant="destructive">
//         <AlertCircle className="h-4 w-4" />
//         <AlertTitle>Location Error</AlertTitle>
//         <AlertDescription>{locationError}</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <nav className="nav_head">
//         <ul className="nav_ul">
//           <div className="nav_item_ul_1">
//             <img 
//               src={logo} 
//               alt="Swiggy" 
//               className="nav_logo_main"
//             />
//             <div className="flex items-center">
//               {locationLoading ? (
//                 <span>Loading location...</span>
//               ) : (
//                 `${latitude?.toFixed(6)}, ${longitude?.toFixed(6)}`
//               )}
//             </div>
//           </div>

//           <ul className="nav_item_ul_2">
//             {NAV_ITEMS.map(item => (
//               <li key={item.id} className="nav_ul_2_item">
//                 {item.icon && <img src={item.icon} alt="" />}
//                 {item.label}
//               </li>
//             ))}
//           </ul>
//         </ul>
//       </nav>

//       <main className="flex-1">
//         {restaurantsLoading && <div>Loading restaurants...</div>}
//         {restaurantsError && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertTitle>Error</AlertTitle>
//             <AlertDescription>{restaurantsError}</AlertDescription>
//           </Alert>
//         )}
//         {restaurantsData && (
//           // Render your restaurants data here
//           <div>{/* Your restaurant list component */}</div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Index;