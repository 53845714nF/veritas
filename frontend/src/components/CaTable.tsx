import {ReactElement, useEffect, useState} from "react";
import pb from "../lib/pocketbase";
import {ListResult, Record} from "pocketbase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileShield, faTrash} from "@fortawesome/free-solid-svg-icons";


export default function CertTable(): ReactElement  {
    const [data, setData] = useState<ListResult<Record> | null>(null);

    useEffect(() => {
        async function fetchData() {
            const result: ListResult<Record> = await pb.collection('certification_authority').getList<Record>(1, 50);
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
                    data.items.map((item: Record) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>&ensp;
                                <a href={pb.getFileUrl(item, item.caFile, {})}>
                                    <FontAwesomeIcon icon={faFileShield}/>
                                </a>
                            </td>
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
                                    onClick={() => pb.collection('certification_authority').delete(item.id)}
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