import "./value.css"

const Value = (props) => {
    return (
    <section className="container-card-values">
        <p>{props.title}</p>
        <h2>R$ {props.value}</h2>
    </section>
)}

export default Value