import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const Table = (props) => {
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
                        <button type="button" className="btn btn-secondary">
                            {data.situacao}
                        </button>
                    </td>
                    <td><FontAwesomeIcon icon={faEye} style={{color: "#9097a4",}} /></td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table