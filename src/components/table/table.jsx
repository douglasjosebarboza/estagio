const Table = (props) => {
    return(
        <table>
            <thead>
                <tr>
                    <th>Número Do Convênio</th>
                    <th>Ano</th>
                    <th>Orgão</th>
                    <th>Situação</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {props.data.map((data, index) => (
                <tr key={index}>
                    <td>{data.numero_convenio}</td>
                    <td>{data.ano}</td>
                    <td>{data.orgao}</td>
                    <td>{data.situacao}</td>
                    <td>ICONE</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table