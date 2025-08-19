import { Link } from "react-router-dom";
import "./TripCard.css";

export default function TripCard({ trip }) {
  return (
    <div className="trip-card">
      <Link to={`/trips/${trip.name}`}> <h3 className="trip-title">
        {trip.name.charAt(0).toUpperCase() + trip.name.slice(1)}
      </h3>
      <p className="trip-destination">
        Destination: <strong>{trip.destination}</strong>
      </p>
      </Link>
    </div>
  );
}
