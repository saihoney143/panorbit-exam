import "./index.css"

const Alphabet=(props)=>{
    const{Letter,updateActiveId,isActive}=props
    const{letter,id}=Letter
    const activeTabClass=isActive?"active-btn":""
    const onUpdate=()=>{
        updateActiveId(id)
    }
    return(
        <li className="li-letter">
            <button type="button" className={`letter ${activeTabClass}`} onClick={onUpdate}>{letter}</button>
        </li>
    )
}

export default Alphabet