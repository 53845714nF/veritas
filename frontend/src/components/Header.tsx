import { ReactElement, useState } from "react";
import useLogout from "../hooks/useLogout";
import CreateCaForm from "./forms/CreateCaForm";
import CreateCertForm from "./forms/CreateCertForm";


export default function Header(): ReactElement {
    const logout = useLogout();
    const [isOpenCaForm, setCaForm] = useState(false);
    const [isOpenCertForm, setCertForm] = useState(false);
    
    function openCaForm(): void{
        setCaForm(true)
    }

    function closeCaForm(): void{
        setCaForm(false)
    }

    function openCertForm(): void{
        setCertForm(true)
    }

    function closeCertForm(): void{
        setCertForm(false)
    }
    
    return (
        <div className="header-wrapper">
            <nav>
                <ul>
                    <li><strong>Veritas</strong></li>
                </ul>
                <ul>
                    <li>
                        <button type="submit" className="outline" onClick={openCertForm}>Create Cert</button>
                        <CreateCertForm isOpen={isOpenCertForm} closeForm={closeCertForm}/>
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