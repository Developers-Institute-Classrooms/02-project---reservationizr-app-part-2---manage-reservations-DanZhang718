import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch("http://localhost:5001/reservations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setReservations(data);
      setIsLoading(false);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (reservations.length < 1) {
    return (
      <>
        <p className="no-properties">You don't have any reservations.</p>
        <Link className="back-restaurants" to="/">
          View the restaurants
        </Link>
      </>
    );
  }
  return (
    <>
      <h1>Upcoming reservations</h1>
      <ul>
        {reservations.map((reservation) => {
          const linkto = `/reservations/${reservation.id}`;
          return (
            <li className="reservations" key={reservation.id}>
              <p className="restaurant-name">{reservation.restaurantName}</p>
              <p className="date">{formatDate(reservation.date)}</p>
              <Link className="details" to={linkto}>
                View Details &rarr;
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ReservationList;
