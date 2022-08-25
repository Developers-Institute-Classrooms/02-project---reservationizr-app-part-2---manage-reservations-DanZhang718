import "./RestaurantList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurant, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/restaurants");
      const data = await response.json();
      setRestaurants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (restaurant.length < 1) {
    return (
      <>
        <p className="no-properties">No restaurant found</p>
      </>
    );
  }

  return (
    <div className="restanrant-list-container">
      <h1>Restaurants</h1>
      <ul>
        {restaurant.map((restaurant) => {
          const linkto = `/restaurants/${restaurant.id}`;
          return (
            <li className="restaurant" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} />
              <div className="restaurant-text-container">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <p className="restaurant-description">
                  {restaurant.description}
                </p>
                <Link className="reserve-now-button" to={linkto}>
                  Reserve now &rarr;
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RestaurantList;
