import "./RestaurantList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restanrants, setRestanrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5001/restanrants");
      const data = await response.json();
      setRestanrants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (restanrants.length < 1) {
    return (
      <>
        <p className="no-properties">No restanrant found</p>
      </>
    );
  }

  return (
    <>
      <h1>Restaurants</h1>
      <ul>
        {restanrants.map((restanrant) => {
          const linkto = `/restanrants/${restanrant.id}`;
          return (
            <li className="restanrant" key={restanrant.id}>
              <img src={restanrant.image} alt={restanrant.name} />
              <div className="restanrant-text-container">
                <h2 className="restanrant-name">{restanrant.name}</h2>
                <p className="restanrant-description">
                  {restanrant.description}
                </p>
              </div>
              <Link className="reserve-now-button" to={linkto}>
                Reserve now &rarr;
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
