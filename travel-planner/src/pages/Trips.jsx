import { useState } from "react";
import TripCard from "../components/TripCard";
import WelcomeUser from "../components/WelcomeUser";
import "./Trips.css"; 

export default function Trips() {
  const [trips, setTrips] = useState([
    { id: 1, name: "Goa", destination: "Paris" },
    { id: 2, name: "Dubai", destination: "Dubai Vacation" },
  ]);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");

  function addTrip(e) {
    e.preventDefault();  // prevent page refresh
    if (!name || !destination) return;
    const newTrip = {
      id: trips.length + 1,
      name,
      destination,
    };
    setTrips([...trips, newTrip]);
    setName("");
    setDestination("");
  }

  return (
    <div>
      <WelcomeUser name="vijay" />

      {/* Trip Form */}
      <form className="trip-form" onSubmit={addTrip}>
        <div className="form-group">
          <label>Trip Name</label>
          <input
            type="text"
            placeholder="Enter trip name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          ➕ Add Trip
        </button>
      </form>

      {/* Trips List */}
      <div className="trips-list">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
