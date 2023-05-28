import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const Table = (props) => {
    const getSpanStyle = (situation) => {
        switch (situation) {
            case "Em execução":
                return {backgroundColor: "#007fb1"}
            case "Proposta/Plano de Trabalho em Análise":
                return {backgroundColor: "#f1954c"}
    
        }
    }

    return (
        <table className="table text-center">
            <thead>
                <tr>
                    <th scope="col">Número Do Convênio</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Orgão</th>
                    <th scope="col">Situação</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((data, index) => (
                <tr key={index}>
                    <td>{data.numero_convenio}</td>
                    <td>{data.ano}</td>
                    <td>{data.orgao}</td>
                    <td>
                        <span className="rounded py-2 px-3 text-white" style={getSpanStyle(data.situacao)}>
                            {data.situacao}
                        </span>
                    </td>
                    <td><FontAwesomeIcon icon={faEye} style={{color: "#9097a4",}} /></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table