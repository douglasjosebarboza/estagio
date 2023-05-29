import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from 'react-csv'
import Table from "../table/Table"

const SelectBottom = (props) => {
    let arrayOrgaos = props.data.Orgaos
    let arrayConvenios = props.data.Convenios
    let arrayDatasFilter = []
    let arrayAuxDatasFilter = []
    let arrayAuxIntDatasFilter = []
    let arrayYears = []
    let arraySituations = props.data.Situacoes

    const [optionOrgao, setOptionOrgao] = useState("Todos os ministérios")
    const handleChangeOrgao = (event) => {
        setOptionOrgao(event.target.value)
    }
    const [optionAno, setOptionAno] = useState("Todos os anos")
    const handleChangeAno = (event) => {
        setOptionAno(event.target.value)
    }
    const [optionSituacao, setOptionSituacao] = useState("Todos as situações")
    const handleChangeSituacao = (event) => {
        setOptionSituacao(event.target.value)
    }
    
    if(optionOrgao == "Todos os ministérios" && optionAno == "Todos os anos" && optionSituacao == "Todos as situações")
    arrayDatasFilter = arrayConvenios
    else {
        if(optionOrgao == "Todos os ministérios" && optionAno == "Todos os anos" && optionSituacao != "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].situacao == optionSituacao)
                arrayDatasFilter.push(arrayConvenios[i])
            }
        }
        else if(optionOrgao == "Todos os ministérios" && optionAno != "Todos os anos" && optionSituacao == "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].ano == optionAno)
                arrayDatasFilter.push(arrayConvenios[i])
            }
        }
        else if(optionOrgao == "Todos os ministérios" && optionAno != "Todos os anos" && optionSituacao != "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].situacao == optionSituacao){
                    arrayAuxDatasFilter.push(arrayConvenios[i])
                }
            }
            for(let i = 0; i < arrayAuxDatasFilter.length; i++){
                if(arrayAuxDatasFilter[i].ano == optionAno)
                    arrayDatasFilter.push(arrayAuxDatasFilter[i])
            }
        }
        else if(optionOrgao != "Todos os ministérios" && optionAno == "Todos os anos" && optionSituacao == "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].orgao == optionOrgao)
                    arrayDatasFilter.push(arrayConvenios[i])
            }
        }
        else if(optionOrgao != "Todos os ministérios" && optionAno == "Todos os anos" && optionSituacao != "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].situacao == optionSituacao){
                    arrayAuxDatasFilter.push(arrayConvenios[i])
                }
            }
            for(let i = 0; i < arrayAuxDatasFilter.length; i++){
                if(arrayAuxDatasFilter[i].orgao == optionOrgao)
                    arrayDatasFilter.push(arrayAuxDatasFilter[i])
            }
        }
        else if(optionOrgao != "Todos os ministérios" && optionAno != "Todos os anos" && optionSituacao == "Todos as situações"){
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].ano == optionAno){
                    arrayAuxDatasFilter.push(arrayConvenios[i])
                }
            }
            for(let i = 0; i < arrayAuxDatasFilter.length; i++){
                if(arrayAuxDatasFilter[i].orgao == optionOrgao)
                    arrayDatasFilter.push(arrayAuxDatasFilter[i])
            }
        }
        else {
            for(let i = 0; i < arrayConvenios.length; i++){
                if(arrayConvenios[i].situacao == optionSituacao){
                    arrayAuxDatasFilter.push(arrayConvenios[i])
                }
            }
            for(let i = 0; i < arrayAuxDatasFilter.length; i++){
                if(arrayAuxDatasFilter[i].ano == optionAno)
                    arrayAuxIntDatasFilter.push(arrayAuxDatasFilter[i])
            }
            for(let i = 0; i < arrayAuxDatasFilter.length; i++){
                if(arrayAuxDatasFilter[i].orgao == optionOrgao)
                    arrayDatasFilter.push(arrayAuxIntDatasFilter[i])
            }
        }
    }

    for(let i = 0; i < arrayConvenios.length; i++){
        if(!arrayYears.includes(arrayConvenios[i].ano))
            arrayYears.push(arrayConvenios[i].ano)
    }

    const exportToCSV = (data) => {
        const csvData = data.map((item) => ({
          'Número Do Convênio': item.numero_convenio,
          'Ano': item.ano,
          'Orgão': item.orgao,
          'Situação': item.situacao,
        }))
      
        const csvReport = {
          filename: 'dados.csv',
          data: csvData,
        }
      
        return <CSVLink className="text-decoration-none" {...csvReport}>
            <button type="button" className="btn btn-secondary d-flex align-items-center gap-3 shadow">
                        <FontAwesomeIcon icon={faFileArrowDown} style={{color: "#ffffff",}} />
                        <span>Exportar</span>
            </button>
        </CSVLink>
    }

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="row ps-5">
                    <div className="col">
                        <h2 className="ms-5 ps-5">Listagem de Convênios</h2>
                    </div>
                </div>
                <div className="col col-3">
                    <select className='form-select' value={optionOrgao} onChange={handleChangeOrgao}>
                        <option value="Todos os ministérios">Todos os ministérios</option>
                        {arrayOrgaos.map((orgao, index) => (
                            <option key={index} value={orgao}>{orgao}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value={optionAno} onChange={handleChangeAno}>
                        <option value="Todos os anos">Todos os anos</option>
                        {arrayYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value={optionSituacao} onChange={handleChangeSituacao}>
                        <option value="Todos as situações">Todos as situações</option>
                        {arraySituations.map((situation, index) => (
                            <option key={index} value={situation}>{situation}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-1">
                    {exportToCSV(arrayDatasFilter)}
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col col-10 bg-white rounded-3 p-3 shadow">
                    <Table
                        data={arrayDatasFilter}
                    />
                </div>
            </div>
            
        </>
    )
}


export default SelectBottom