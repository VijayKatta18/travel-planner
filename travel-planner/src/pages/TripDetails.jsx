import { useParams } from "react-router-dom"

export default function TripDetails(){
    const {name} = useParams();
    // TODO API to display entire data using name prop
    return(
        <><h1>Trip details of {name} </h1></>
    )
}