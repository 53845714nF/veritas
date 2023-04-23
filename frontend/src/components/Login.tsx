import { useForm } from "react-hook-form";
import useLogin, { LoginData } from "../hooks/useLogin";
import { ReactElement } from "react";
import pb from "lib/pocketbase";
import {useNavigate} from "react-router-dom";

export default function Login(): ReactElement {
    const {login, isLoading} = useLogin();
    const {register, handleSubmit, reset} = useForm<LoginData>();
    const navigate = useNavigate();

    async function onsubmit(data: LoginData) {
        await login(data)
        reset();
    }

    if (pb.authStore.isValid){
        navigate("/home")
    }

    return (
        <div className="login-wrapper">
            <h2>Veritas</h2>

            <form onSubmit={handleSubmit(onsubmit)}>

                <label htmlFor="email"> Username:
                    <input type="text" id="username" placeholder="Username" {...register("email")} />
                </label>

                <label htmlFor="password"> Password:
                    <input type="password" id="password" placeholder="Password" {...register("password")} />
                </label>

                <button type="submit" disabled={isLoading}>Login</button>
                {isLoading && <progress></progress>}
            </form>
        </div>
    );
}