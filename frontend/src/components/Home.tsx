import { pb } from "../lib/pocketbase";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import CertTable from "./CertTable";
import Tabs from "./Tab";
import Tab from "../model/tab";
import CaTable from "./CaTable";
import { ReactElement } from "react";

export default function Home(): ReactElement {
    const navigate = useNavigate();

    useEffect(() => {
        if (!pb.authStore.isValid) {
            navigate("/login");
        }
    });

    const tabs: Tab[] = [
        {
            title: "Certs",
            content: <CertTable/>,
        },
        {
            title: "CAs",
            content: <CaTable/>,
        },

    ];

    return (
        <>
            <Header/>
            <Tabs tabs={tabs}/>
        </>
    );
}
