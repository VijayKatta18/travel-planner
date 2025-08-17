import { Link } from "react-router-dom";

export default function Trips() {

    const trips = [
        { id: 1, name: "Paris" },
        { id: 2, name: "Goa" }
    ];

    return (
        <>
            <h1> Trips Page </h1>
            {trips.map((trip)=>(
                <li key={trip.id}><Link to={`/trips/${trip.name}`}>{trip.name}</Link></li>
            ))}
        </>
    );
}