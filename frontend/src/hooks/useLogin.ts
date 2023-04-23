import pb from "../lib/pocketbase";
import {useState} from "react";

export type LoginData = {
    email: string;
    password: string;
};

export default function useLogin() {
    const [isLoading, setLoading] = useState<boolean>(false);
    
    async function login(data: LoginData) {
        setLoading(true);
        try {
            await pb.collection("users").authWithPassword(data.email, data.password)     
        } catch (e) {
            alert(e)
        }
        setLoading(false);
    }

    return {login, isLoading}
}
