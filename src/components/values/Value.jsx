// import "./value.css"

const Value = (props) => {
    return (
    <>
        <small className="mt-1 mb-3">{props.title}</small>
        <h2>R$ {props.value}</h2>
    </>
)}

export default Value