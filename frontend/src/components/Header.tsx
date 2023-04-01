import React from "react";
import useLogout from "../hooks/useLogout";

export default function Header(): JSX.Element {
    const logout = useLogout();

    return (
        <div className="header-wrapper">
            <nav>
                <ul>
                    <li><strong>Veritas</strong></li>
                </ul>
                <ul>
                    <li>
                        <button type="submit" className="outline">Create Cert</button>
                    </li>
                    <li>
                        <button type="submit" className="contrast outline">Create CA</button>
                    </li>
                    <li>
                        <button type="submit" className="secondary outline" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}