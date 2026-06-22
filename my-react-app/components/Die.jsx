export default function Die(props)
{
    const heldStyle = { backgroundColor : props.isHeld ? "#59E391"  : "white"}
    
    
    return(
        <button 
        onClick={props.toggledie} 
        style={heldStyle}
        aria-label={`Die with value ${props.value},
        ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}