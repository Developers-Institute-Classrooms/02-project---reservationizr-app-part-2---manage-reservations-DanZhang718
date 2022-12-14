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
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const reservation = { partySize, date, restaurantName };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reservation),
      }
    );

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      navigate("/reservations");
    }
  };

  if (isError) {
    return (
      <>
        <div className="error-message">
          <p className="no-reservation">
            Error creating a reservation (error status {errorStatus} error )
          </p>
          <Link to="/" className="error-button">
            Return to restaurants
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="reservation-create-container">
        <h2>Reserve Curry Place</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="guest-number">Number of guests</label>
          <input
            type="number"
            id="guest-number"
            className="form-input-item"
            autoComplete="off"
            value={partySize}
            onChange={(event) => {
              setPartySize(event.target.value);
            }}
            required
          />
          <label htmlFor="date">Date</label>
          <DatePicker
            type="date"
            id="date"
            className="form-input-item"
            selected={date}
            autoComplete="off"
            onChange={(date) => setDate(date)}
            showTimeSelect
            dateFormat="Pp"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReservation;
