type LocationData = {
    country: string
    state: string
    locality: string
}
  
type LocationFormProps = LocationData & {
  updateFields: (fields: Partial<LocationData>) => void
}

export default function LocationForm({country, state, locality, updateFields}: LocationFormProps) {
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
  )
}

    /*
    interface Location {
        state: string;
        countryCode: string;
      }
      
       async function getCityInfo(city: string): Promise<Location> {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search.php?city=${city}&format=jsonv2&addressdetails=1&limit=1`
        );
        //const result = response.data.geonames[0];
        //const result = response.0.address;
        return {
          state: "test",//result.state,
          countryCode: "test", //result.countryCode,
        };
      }
      
      getCityInfo("München").then((result) => {
        console.log(result.state);
        console.log(result.countryCode);
      });
    */
    // Country Code in ISO3166-1alpha2
    // State Name 
    // City Name 