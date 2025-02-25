import axiosInstance from "../axios-instance";


export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Get me failed:", error);
    throw new Error("error: Get me failed");
  }
};
