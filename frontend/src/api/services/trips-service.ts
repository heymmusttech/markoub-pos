import { useQuery } from "@tanstack/react-query";

import { TripType } from "@/schemas/trip-schema";
import axiosInstance from "../axios-instance";

export const onCreateTrip = async (payload: TripType) => {
  try {
    const { data } = await axiosInstance.post("/trips", payload);
    return data;
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
};

export function useQueryAllTrips() {
  try {
  return useQuery(["GET_ALL_TRIPS"], async () => {
      // FETCH DATA
      const { data } = await axiosInstance.get(`/trips`);
      return data;
    });
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}

export function useQueryTrips(departure = "", destination = "", date: string | Date = "") {
  try {
    return useQuery(
      ["GET_TRIPS", departure, destination, date],
      async () => {
        // FETCH DATA
        const { data } = await axiosInstance.get(
          `/trips/search?departure=${departure}&destination=${destination}&date=${date}`
        );
        return data;
      }
    );
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}

export function useQueryTripsById(id: number) {
  try {
    return useQuery(
      ["GET_TRIPS_BY_ID", id],
      async () => {
        // FETCH DATA
        const { data } = await axiosInstance.get(
          `/trips/${id}/booked-seats`
        );
        return data;
      }
    );
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}

