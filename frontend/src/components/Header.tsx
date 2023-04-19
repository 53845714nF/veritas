import { ReactElement, useState } from "react";
import useLogout from "../hooks/useLogout";
import CreateCaForm from "./forms/CreateCaForm";


export default function Header(): ReactElement {
    const logout = useLogout();
    const [isOpenCaForm, setCaForm] = useState(false);
    
    function openCaForm(): void {
        setCaForm(true);
    }

    function closeCaForm(): void{
        setCaForm(false);
    }
    
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
                        <button type="submit" className="contrast outline" onClick={openCaForm}>Create CA</button>
                        <CreateCaForm isOpen={isOpenCaForm} closeForm={closeCaForm}/>
                    </li>
                    <li>
                        <button type="submit" className="secondary outline" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}