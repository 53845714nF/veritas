import { ReactElement } from "react"

type UserData = {
  name: string
  email: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export default function UserForm({name, email, updateFields,}: UserFormProps): ReactElement {
  return (
    <>
        <h2 style={{textAlign: "center"}}>User</h2>

        <label>Name:</label>
        <input
        autoFocus
        required
        type="text"
        value={name}
        onChange={e => updateFields({ name: e.target.value })}
        />
        
        <label>E-Mail:</label>
        <input
        required
        type="email"
        value={email}
        onChange={e => updateFields({ email: e.target.value })}
        />
    
    </> 
  )}
