import { Platform } from "react-native";

let baseUrl = "";

{
    Platform.OS == "android"
        ? (baseUrl = "http://192.168.1.135:3000/api/v1")
        : (baseUrl = "http://192.168.1.135:3000/api/v1");
}

export default baseUrl;
