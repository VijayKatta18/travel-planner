import api from "../api/api"


//Get all trips 
export const getTrips = async () => {
    const response = await api.get("/trips");
    return response.data;
}

// Get trip by ID
export const getTripById = async (id) => {
  const response = await api.get(`/trips/${id}`);
  return response.data;
};

// Create new trip
export const createTrip = async (tripData) => {
  const response = await api.post("/trips", tripData);
  return response.data;
};

// Update a trip
export const updateTrip = async (id, tripData) => {
  const response = await api.put(`/trips/${id}`, tripData);
  return response.data;
};

// Delete a trip
export const deleteTrip = async (id) => {
  const response = await api.delete(`/trips/${id}`);
  return response.data;
};