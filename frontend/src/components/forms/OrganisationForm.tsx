import { ReactElement } from "react"

type OrganisationData = {
    orgName: string
    orgUnit: string

}
  
type OrganisationFormProps = OrganisationData & {
  updateFields: (fields: Partial<OrganisationData>) => void
}

export default function OrganisationForm({orgName, orgUnit,  updateFields}: OrganisationFormProps): ReactElement {
    return (
      <>
        <h2 style={{textAlign: "center"}}>Organisation</h2>
            
        <label>Name:</label>
        <input
        autoFocus
        required
        type="text"
        value={orgName}
        onChange={e => updateFields({ orgName: e.target.value })}
        />
  
        <label>Unit:</label>
        <input
        required
        type="text"
        value={orgUnit}
        onChange={e => updateFields({ orgUnit: e.target.value })}
        />
      </>
    )
}