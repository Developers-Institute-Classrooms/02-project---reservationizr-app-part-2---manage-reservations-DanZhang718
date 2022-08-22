import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";
import { Link } from "react-router-dom";

const CreateReservation = ({ restaurantName }) => {
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    setIsLoading(true);

    const reservation = {
      partySize: Number(partySize),
      date,
    };
    const response = await fetch("http://localhost:5001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(reservation),
    });

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/");
    }
  };

  if (isError) {
    return (
      <>
        <p className="no-reservation">
          Error creating a reservation (error status {errorStatus})
        </p>
        <Link to="/" className="button">
          Return to restaurants
        </Link>
      </>
    );
  }

  return (
    <>
      <h2>Reserve Curry Place</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="guest-number">Number of guests</label>
          <input
            type="number"
            id="guest-number"
            className="form-imput"
            value={partySize}
            onchange={(event) => {
              setPartySize(event.target.value);
            }}
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <DatePicker
            type="date"
            id="date"
            className="form-imput"
            selected={date}
            onchange={(event) => {
              setDate(event.target.value);
            }}
            required
          />
        </p>
      </form>
    </>
  );
};

export default CreateReservation;
