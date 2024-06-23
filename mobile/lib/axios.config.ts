import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
    baseURL: "http://10.5.221.43:5438/api/v1",
    timeout: 5000
});

// Fetch token from AsyncStorage
AsyncStorage.getItem("token")
    .then((token) => {
        // Set the token as the authorization header
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    })
    .catch((error) => {
        console.log("Error retrieving token from AsyncStorage:", error);
    });

export default api;