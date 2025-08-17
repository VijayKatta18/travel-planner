import { useParams } from "react-router-dom"

export default function TripDetails(){
    const {name} = useParams();
    return(
        <><h1>Trip details of {name} </h1></>
    )
}