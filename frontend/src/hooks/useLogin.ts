import { pb } from "../lib/pocketbase";
import { useState } from "react";

export type LoginData = {
    email: string;
    password: string;
};

export default function useLogin() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function login(data: LoginData) {
        setLoading(true);
        try {
            await pb.collection("users").authWithPassword(data.email, data.password);   
        } catch (e) {
            let message = "Something went wrong";
            
            if (e instanceof Error){ 
                message = e.message;
            }
            
            setError(message);
        }
        setLoading(false);
    }

    return {login, isLoading, error};
};
