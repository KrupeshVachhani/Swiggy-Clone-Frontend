/* eslint-disable react/prop-types */
import { Star } from "lucide-react";

const RestaurantCard = ({ restaurant }) => {
  // Cloudinary base URL
  const CLOUDINARY_BASE_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

  return (
    <div className="restaurant-card w-72 p-4 hover:scale-95 transition-all cursor-pointer">
      <div className="relative">
        {/* Restaurant Image */}
        <img
          src={`${CLOUDINARY_BASE_URL}${restaurant.info.cloudinaryImageId}`}
          alt={restaurant.info.name}
          className="w-full h-48 object-cover rounded-xl"
        />
      </div>

      <div className="mt-3 space-y-2">
        {/* Restaurant Name */}
        <h2 className="font-bold text-xl truncate">{restaurant.info.name}</h2>

        {/* Rating and Time */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-green-600 fill-green-600" />
            <span className="font-medium">
              {restaurant.info.avgRating || "New"}
            </span>
          </div>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500">
            {restaurant.info.sla.deliveryTime} mins
          </span>
        </div>

        {/* Cuisines */}
        <p className="text-gray-500 text-sm truncate">
          {restaurant.info.cuisines.join(", ")}
        </p>

        {/* Location */}
        <p className="text-gray-500 text-sm truncate">
          {restaurant.info.areaName}
        </p>
      </div>
    </div>
  );
};

const Restaurents = ({ data, title }) => {
  if (!data)
    return <div className="text-center py-10">Loading restaurants...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {title || "Restaurants Near You"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Restaurents;
