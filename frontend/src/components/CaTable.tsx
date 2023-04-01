import React, {useEffect, useState} from "react";
import pb from "../lib/pocketbase";
import {ListResult} from "pocketbase";
import Ca from "../model/ca";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

export default function CertTable(): JSX.Element {
    const [data, setData] = useState<ListResult<Ca> | null>(null);

    useEffect(() => {
        async function fetchData() {
            const result: ListResult<Ca> = await pb.collection('certification_authority').getList<Ca>(1, 50);
            setData(result);
        }

        fetchData();
    }, []);

    if (!data) {
        return <progress></progress>
    }

    return (
        <div className="table-ca-wrapper">
            <table role="grid">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">CA File</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Country</th>
                    <th scope="col">State</th>
                    <th scope="col">Locality</th>
                    <th scope="col">Organisation Name</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Days</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.items.map((item: Ca) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.caFile}</td>
                            <td>{item.email}</td>
                            <td>{item.country}</td>
                            <td>{item.state}</td>
                            <td>{item.locality}</td>
                            <td>{item.orgName}</td>
                            <td>{item.orgUnit}</td>
                            <td>{item.days}</td>
                            <td>
                                <FontAwesomeIcon
                                    id={item.id}
                                    icon={faTrash}
                                    onClick={() => pb.collection('certification_authority').delete(item.id)}/>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}