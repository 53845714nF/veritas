import { ReactElement, FormEvent, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import UserForm from "./UserForm";
import LocationForm from "./LocationForm";
import OrganisationForm from "./OrganisationForm";
import PropertiesForm from "./PropertiesForm";

type CaFormData = {
  name: string,
  email: string,
  country: string,
  state: string,
  locality: string,
  orgName: string,
  orgUnit: string,
  cname: string,
  days: string,
}

const INITIAL_DATA: CaFormData = {
  name: "",
  email: "",
  country: "DE",
  state: "",
  locality: "",
  orgName: "",
  orgUnit: "",
  cname: "",
  days: "",
}

interface CreateCaFormProps {
  isOpen: boolean;
  closeForm: () => void;
}

async function createCA(data: CaFormData) {

  const url = 'http://0.0.0.0:8090/api/veritas/createca';
  const params = new URLSearchParams({
    name: data.name,
    email: data.email,
    country: data.country,
    state: data.state,
    locality: data.locality,
    org_name: data.orgName,
    org_unit: data.orgUnit,
    cname: data.cname,
    days: data.days
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

export default function CreateCaForm(props: CreateCaFormProps): ReactElement{
  const {isOpen, closeForm} = props;
  const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<CaFormData>): void{
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { currentStepIndex, step, steps, isFirstStep, isLastStep, back, next, goto } = useMultistepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <LocationForm {...data} updateFields={updateFields} />,
    <OrganisationForm {...data} updateFields={updateFields} /> ,
    <PropertiesForm {...data} updateFields={updateFields} /> ,
  ])

  function onSubmit(e: FormEvent): void {
    e.preventDefault()
    
    if (isLastStep) {
      createCA(data);
      setData(INITIAL_DATA);
      goto(0);
      closeForm();
    } else { 
      next()
    }
  }

  return (
      <>
        {isOpen && (
          <div className="overlay">
            <form onSubmit={onSubmit}>
              <div className="overlay-inside">            
                {step}
                
                {!isFirstStep && <button type="button" onClick={back} style={{width:"45%", float: "left", marginTop:"30px"}}>Back</button>}
                
                <button type="submit" style={{width:"45%", float:"right", marginTop:"30px"}}> 
                  {isLastStep ? "Submit" : "Next"}
                </button>

                <progress value={currentStepIndex + 1} max={steps.length} style={{marginTop:"30px"}}></progress>
                
              </div>
            </form>
            <button onClick={closeForm} style={{position: "absolute", bottom: "0px"}}>Close</button>
          </div>
        )}
      </>
  )}
