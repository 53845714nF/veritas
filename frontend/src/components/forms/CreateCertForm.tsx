import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { pb } from "../../lib/pocketbase";
import { ListResult, Record } from "pocketbase";


type CertFormData = {
    ca: string,
    url: string,
}

const INITIAL_DATA: CertFormData = {
    ca: "",
    url: "",
}


interface CreateCertFormProps {
    isOpen: boolean;
    closeForm: () => void;
}

async function createCert(data: CertFormData) {
    const url = 'http://0.0.0.0:8090/api/veritas/createcert';
    const params = new URLSearchParams({
      ca: data.ca,
      url: data.url,
    })
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
      };
    
      try {
        const response = await fetch(url, options);
        const data = await response.text();
        console.log(data);
      } catch (e) {
        alert(e);
      }
}

export default function CreateCertForm(props: CreateCertFormProps): ReactElement{
    const {isOpen, closeForm} = props;
    const [pbListCa, setPbListCa] = useState<ListResult<Record> | null>(null);
    const [data, setData] = useState(INITIAL_DATA)

    useEffect(() => {
        async function fetchData() {
            const result: ListResult<Record> = await pb.collection('certification_authority').getList<Record>(1, 50, { '$autoCancel': false });
            setPbListCa(result);
            setData({ca: result.items[0].id, url: ""} as CertFormData)
        }

        fetchData();
    }, []);

    if (pbListCa === null) {
        return (
            <>
                {isOpen && (
                    <div className="overlay">
                        <div className="overlay-inside">
                            <article aria-busy="true"></article>
                            
                        </div>
                    </div>
                )}
            </>
        )
    }

    if (pbListCa.totalItems === 0) {
        return (
            <>
                {isOpen && (
                    <div className="overlay">
                        
                            <h2 style={{textAlign: "center"}}>Please create a CA</h2>
                            <button onClick={closeForm} style={{position: "absolute", bottom: "0px"}}>Close</button>
                       
                    </div>
                )}
            </>
        )
    }

    function updateFields(fields: Partial<CertFormData>): void {
        setData(prev => {
          return { ...prev, ...fields }
        })
    }

    function onSubmit(e: FormEvent): void {
        e.preventDefault()
        createCert(data);
        setData(INITIAL_DATA);
        closeForm();
    }

    return (
        <>
            {isOpen && (
                <div className="overlay">
                    <form onSubmit={onSubmit}>
                        <div className="overlay-inside">
                            
                            <h2 style={{textAlign: "center"}}>Cert</h2>
                            
                            <label>CA:</label>
                            <select key="ca" value={data.ca} onChange={e => updateFields({ca: e.target.value})}>
                                {
                                    pbListCa.items.map((item: Record) => (
                                        <option key={item.id} value={item.id}>{item.id}</option>
                                    ))
                                }
                            </select>

                            <label>URL:</label>
                            <input
                            required
                            type="text"
                            value={data.url}
                            onChange={e => updateFields({url: e.target.value})}
                            />

                            <button type="submit" style={{marginTop:"30px"}}>Submit</button>
                        </div>
                    </form>
                    <button onClick={closeForm} style={{position: "absolute", bottom: "0px"}}>Close</button>
                </div>                
            )}
        </>
    )
}