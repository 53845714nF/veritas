import { ReactElement } from "react"

type PropertiesData = {
    cname: string
    days: string
}
  
type PropertiesFormProps = PropertiesData & {
  updateFields: (fields: Partial<PropertiesData>) => void
}

export default function PropertiesForm({cname, days,  updateFields}: PropertiesFormProps): ReactElement {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Properties</h2>
          
      <label>Cname:</label>
      <input
      autoFocus
      required
      type="text"
      value={cname}
      onChange={e => updateFields({ cname: e.target.value })}
      />

      <label>Days:</label>
      <input
      required
      min={1}
      type="number"
      value={days}
      onChange={e => updateFields({ days: e.target.value })}
      />


  </>
  )}