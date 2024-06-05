import { BaseURL } from "@/service/ApiEndpoints";

    export const fetchUserProfile = async (token: string) => {
      const response: Response = await fetch(`${BaseURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        mode: "cors",
        redirect: "follow",
      });

      try {
        const data = await response.json();

        if (response.status === 401) return null;

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        return data;
      } catch (error) {
        console.error("Error fetching user information:", error);
        return null; 
      }
    };
  

