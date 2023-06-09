import React, {ReactElement, useEffect, useState} from "react";
import { pb } from "../lib/pocketbase";
import {ListResult, Record} from "pocketbase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileCode, faFileShield, faKey, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function CertTable(): ReactElement {
    const [data, setData] = useState<ListResult<Record> | null>(null);

    useEffect(() => {
        async function fetchData() {
            const result: ListResult<Record> = await pb.collection('cert').getList<Record>(1, 50, { '$autoCancel': false });
            
            setData(result);
        }

        fetchData();
    }, []);

    if (!data) {
        return (
            <progress></progress>
        );
    }

    return (
        <div className="table-cert-wrapper">
            <table role="grid">
                <thead>
                <tr key="table-header">
                    <th scope="col">URL</th>
                    <th scope="col">CA</th>
                    <th scope="col">Cert</th>
                    <th scope="col">Key</th>
                    <th scope="col">Config</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                { data.items.map((item: Record, index: number) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.ca}</td>
                            <td>&ensp;
                                <a href={pb.getFileUrl(item, item.web_crt_file, {})}>
                                    <FontAwesomeIcon icon={faFileShield}/>
                                </a>
                            </td>
                            <td>&ensp;
                                <a href={pb.getFileUrl(item, item.server_key, {})}>
                                    <FontAwesomeIcon icon={faKey}/>
                                </a>
                            </td>
                            <td>&ensp;
                                <a href={pb.getFileUrl(item, item.server_key, {})}>
                                    <FontAwesomeIcon icon={faFileCode}/>
                                </a>
                            </td>
                            <td>
                                <FontAwesomeIcon
                                    id={item.id}
                                    icon={faTrash}
                                    onClick={() => pb.collection('cert').delete(item.id)}
                                />
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}
