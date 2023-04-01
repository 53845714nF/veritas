import {useForm} from "react-hook-form";
import useLogin, {LoginData} from "../hooks/useLogin";

export default function Login() {
    const {login, isLoading} = useLogin();
    const {register, handleSubmit, reset} = useForm<LoginData>();

    async function onsubmit(data: LoginData) {
        await login(data)
        reset();
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