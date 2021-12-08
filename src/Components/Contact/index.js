import { IoMdTrash } from "react-icons/io";
import "./index.css"

const Contact=(props)=>{
    const{Details,DeleteUser}=props
    const{name,id}=Details
    const onDelete=()=>{
        DeleteUser(id)
    }
    return(
        <li className="li-container">
            <h1 className="contactname">{name}</h1>
            <button type="button" className="delete" onClick={onDelete}><IoMdTrash className="delete-icon"/></button>
        </li>
    )
}

export default Contact