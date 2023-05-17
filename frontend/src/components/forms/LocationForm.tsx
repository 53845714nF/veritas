import { ReactElement } from "react";

type LocationData = {
    country: string;
    state: string;
    locality: string;
}
  
type LocationFormProps = LocationData & {
  updateFields: (fields: Partial<LocationData>) => void
}

export default function LocationForm({country, state, locality, updateFields}: LocationFormProps): ReactElement {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Location</h2>
    
      <label>Country:</label>
      <select id="Country" value={country} onChange={e => updateFields({ country: e.target.value })}>
        <option value="DE">DE</option>
        <option value="US">US</option>
        <option value="UK">UK</option>
        <option value="BE">BE</option>
        <option value="FR">FR</option>
        <option value="IT">IT</option>
        <option value="SW">SW</option>
        <option value="AU">AU</option>
        <option value="NE">NE</option>
        <option value="PO">PO</option>
      </select>

      <label>State:</label>
      <input
      required
      type="text"
      value={state}
      onChange={e => updateFields({ state: e.target.value })}
      />

      <label>Locality:</label>
      <input
      required
      type="text"
      value={locality}
      onChange={e => updateFields({ locality: e.target.value })}
      />
    </>
  );
}
