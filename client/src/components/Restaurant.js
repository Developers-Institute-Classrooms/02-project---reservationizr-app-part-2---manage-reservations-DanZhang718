import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateReservation from "./CreateReservation";
import "./Restaurant.css";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  useEffect(() => {
    // FIXME: Make a fetch request and call setRestaurant with the response body
    const fetchData = async () => {
      const fetchUrl = `${process.env.REACT_APP_API_URL}/restaurants/${id}`;
      const response = await fetch(fetchUrl);
      const restaurant = await response.json();

      if (!response.ok) {
        setIsNotFound(true);
        return;
      }
      setRestaurant(restaurant);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <>
        <div>
          <p className="error">Sorry! We can't find that restaurant.</p>
          <Link to="/" className="error-button">
            &larr; Back to restaurants
          </Link>
        </div>
      </>
    );
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="restaurant-infor-container">
        <img src={restaurant.image} alt={restaurant.name} />
        <div className="restaurant-text-container">
          <h2 className="restaurant-name">{restaurant.name}</h2>
          <p className="restaurant-description">{restaurant.description}</p>
        </div>
      </div>

      <CreateReservation restaurantName={restaurant.name} />
    </>
  );
};

export default Restaurant;
