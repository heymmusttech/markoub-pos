import { clsx, type ClassValue } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setTokens(accessToken: string, refreshToken: string) {
  Cookies.set("access_token", accessToken, {
    expires: 1, // Expires in 1 day
    secure: true, // Ensures the cookie is only sent over HTTPS (use only in production)
    sameSite: "Strict",
  });

  Cookies.set("refresh_token", refreshToken, {
    expires: 7, // Expires in 7 days
    secure: true,
    sameSite: "Strict",
  });
}

export function clearTokensCookie() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}

export function getTokensCookie() {
  const access_token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  return {access_token, refresh_token}
}

export function generateSeatRows(totalSeats: number): (number | null)[][] {
  const seatRows: (number | null)[][] = [];
  let seatNumber = 1;

  // Calculate number of rows needed
  // Each regular row has 4 seats (except row 8 which has 2)
  // We need to find how many rows this will take to fit totalSeats seats
  let remainingSeats = totalSeats;
  let currentRow = 1;
  const rows: number[] = [];

  while (remainingSeats > 0) {
      // Row 8 special case (only 2 seats)
      if (currentRow === 8) {
          rows.push(2);
          remainingSeats -= 2;
      } else {
          rows.push(4);
          remainingSeats -= 4;
      }
      currentRow++;
  }

  const numRows = rows.length;

  // Generate the rows
  for (let row = 0; row < numRows; row++) {
      const currentRow: (number | null)[] = new Array(5);

      // Special case for Row 8 (index 7)
      if (row === 7) {
          currentRow[0] = seatNumber++;
          currentRow[1] = seatNumber++;
          currentRow[2] = null;
          currentRow[3] = null;
          currentRow[4] = null;
      } else {
          // Normal pattern for other rows
          currentRow[0] = seatNumber++;
          currentRow[1] = seatNumber++;
          currentRow[2] = null;
          currentRow[4] = seatNumber++;
          currentRow[3] = seatNumber++;
      }

      seatRows.push(currentRow);
  }

  return seatRows;
}

export function mergeDateWithTime(dateTime: Date, newTime: string): string {
  const date = new Date(dateTime); // Parse the original date-time
  const [hours, minutes] = newTime.split(":").map(Number); // Extract new time components
  
  date.setUTCHours(hours, minutes, 0, 0); // Set new time while keeping the same date

  return date.toISOString(); // Return updated ISO string
}