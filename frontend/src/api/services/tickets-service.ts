import { BookingTicketPayload } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axios-instance";

export const onBookingTicket = async (
  tripId: number,
  payload: BookingTicketPayload
) => {
  try {
    const response = await axiosInstance.post("/tickets", {
      tripId,
      ...payload,
    });
    return response.data;
  } catch (error) {
    console.error("Booking ticket failed:", error);
    throw new Error("error: Booking ticket failed");
  }
};

export const onConfirmTicket = async (ticketId: number) => {
  try {
    const response = await axiosInstance.patch(`/tickets/${ticketId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Confirm ticket failed:", error);
    throw new Error("error: Confirm ticket failed");
  }
};

export function useQueryTicketById(ticketId: number, isConfirmed: boolean) {
  try {
    return useQuery(["GET_TICKET_BY_ID", ticketId, isConfirmed], async () => {
      // FETCH DATA
      const { data } = await axiosInstance.get(`/tickets/${ticketId}`);
      return data;
    });
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}

export function useQueryTicketSales() {
  try {
    return useQuery(["GET_TICKET_SALES"], async () => {
      // FETCH DATA
      const { data } = await axiosInstance.get(`/tickets/sales`);
      return data;
    });
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}

export function useQueryTicketSalesRecord() {
  try {
  return useQuery(["GET_TICKET_SALES_RECORD"], async () => {
      // FETCH DATA
      const { data } = await axiosInstance.get(`/tickets/sales-records`);
      return data;
    });
  } catch (error: any) {
    console.log("ERROR FETCH TRIPS : ", error);
    throw new Error("ERROR: Fetch trips failed");
  }
}
