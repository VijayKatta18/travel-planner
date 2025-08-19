import TripCard from "../components/TripCard";
import WelcomeUser from "../components/WelcomeUser";

export default function Trips() {

    // TODO API
    const trips = [
        {id: 1, name: "goa", destination: "paris"},
        {id:2 , name: "dubai", destination : "dubai vacation"}
    ];

    return (
        <div>
            <WelcomeUser name="vijay" />
            {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
            ))}
        </div>
    );
}
