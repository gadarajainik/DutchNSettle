import { Nextclient } from "../lib/client/http";

export const createUser = async (payload, token) => {
    let response;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
        response = await Nextclient.post("/user", payload, config);
    }
    catch (err) {
        console.log("Error", err)
    }

    return response
}