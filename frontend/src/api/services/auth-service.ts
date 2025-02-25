import { setTokens } from "@/lib/utils";
import axios from "axios";
import axiosInstance from "../axios-instance";

export const onSignin = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/signin", credentials);

    setTokens(
      response.data.tokens.accessToken,
      response.data.tokens.refreshToken
    );

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("error: Refresh tokens failed");
  }
};

export const onRefreshTokens = async (currRefreshToken: string) => {
  try {
    
    const response = await axios.post("/auth/refresh-tokens", {
      refreshToken: currRefreshToken,
    });
    const { accessToken, refreshToken } = response.data;

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Refresh tokens failed:", error);
    throw new Error("error: Refresh tokens failed");
  }
};
