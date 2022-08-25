import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";
import "./Reservation.css";
import { useAuth0 } from "@auth0/auth0-react";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:5001/reservations/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        setIsNotFound(true);
        return;
      }
      setReservation(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <>
        <div className="error-message">
          <p className="error">Sorry! We can't find that reservation.</p>
          <Link className="back-reservations" to="/reservations">
            &larr; Back to reservations
          </Link>
        </div>
      </>
    );
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="reservation-container">
      <p className="name">{reservation.restaurantName}</p>
      <p className="date">{formatDate(reservation.date)}</p>
      <p className="party-size">Party Size : {reservation.partySize}</p>
      <Link className="back-reservations" to="/reservations">
        &larr; Back to reservations
      </Link>
    </div>
  );
};

export default Reservation;
