import { ReactElement, FormEvent, useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import UserForm from "./UserForm";
import LocationForm from "./LocationForm";
import OrganisationForm from "./OrganisationForm";
import PropertiesForm from "./PropertiesForm";
import useCreateCa, {CaFormData} from "../../hooks/useCreateCa";

const INITIAL_DATA: CaFormData = {
  name: "",
  email: "",
  country: "",
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

export default function CreateCaForm(props: CreateCaFormProps): ReactElement{
  const {isOpen, closeForm} = props;
  const [data, setData] = useState(INITIAL_DATA)
  const createCA = useCreateCa();

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
