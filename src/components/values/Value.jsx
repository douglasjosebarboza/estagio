const Value = (props) => {
    return (
    <section className="value-container-values">
        <h2 className="value-subtitle-values">{props.title}</h2>
        <p className="value-paragraph-values">R$ {props.value}</p>
    </section>
)}

export default Value