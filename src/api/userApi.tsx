import { BaseURL } from "@/service/ApiEndpoints";
import { getToken } from "@/service/authService";

export const getLoginUserInfo = async () => {
    const token = getToken();

    if (token) {
        const requestOptions: RequestInit = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'GET',
            mode: "cors",
            redirect: "follow"
        };

        try {
            const response: Response = await fetch(`${BaseURL}/users`, requestOptions);
            const data = await response.json();

            if (response.status === 401) return null;

            if (!response.ok) {
                throw new Error("Failed to fetch user information");
            }

            return data;
        } catch (error) {
            console.error("Error fetching user information:", error);
            return null; // Return null when an error occurs
        }
    }

    return null; // Return null if token doesn't exist
}
