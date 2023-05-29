import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from 'react-csv'
import Table from "../table/Table"

const SelectBottom = (props) => {
    let arrayOrgaos = props.data.Orgaos
    let arrayConvenios = props.data.Convenios
    let arrayDataPage = []
    let arrayDatasFilter = []
    let arrayAuxDatasFilter = []
    let arrayAuxIntDatasFilter = []
    let arrayYears = []
    let arraySituations = props.data.Situacoes
    let qtdPages = 0
    let indexStart = 0
    let indexEnd = 0

    const [numberPage, setNumberPage] = useState(1)
    const upNumberPage = () => {
        if(numberPage + 1 <= qtdPages){
            let newNumberPage = numberPage + 1
            setNumberPage(newNumberPage)
        }
    }
    const downNumberPage = () => {
        if(numberPage - 1 > 0){
            let newNumberPage = numberPage - 1
            setNumberPage(newNumberPage)
        }
    }

    const [optionOrgao, setOptionOrgao] = useState("Todos os ministérios")
    const handleChangeOrgao = (event) => {
        setOptionOrgao(event.target.value)
        setNumberPage(1)
    }

    const [optionAno, setOptionAno] = useState("Todos os anos")
    const handleChangeAno = (event) => {
        setOptionAno(event.target.value)
        setNumberPage(1)
    }

    const [optionSituacao, setOptionSituacao] = useState("Todos as situações")
    const handleChangeSituacao = (event) => {
        setOptionSituacao(event.target.value)
        setNumberPage(1)
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

    qtdPages = Math.ceil(arrayDatasFilter.length / 3)
    indexStart = (numberPage - 1) * 3
    indexEnd = indexStart + 3
    arrayDataPage = arrayDatasFilter.slice(indexStart, indexEnd)

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
            <div className="row d-none d-md-flex  justify-content-center">
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
                    {exportToCSV(arrayDataPage)}
                </div>
            </div>
            <div className="row d-none d-md-flex justify-content-center">
                <div className="col col-10 bg-white rounded-3 p-3 shadow">
                    <Table
                        data={arrayDataPage}
                    />
                </div>
            </div>
            <div className='row d-none d-md-block  py-5'>
                <div className="col d-flex gap-2 justify-content-center">
                    <button type="button" className="btn btn-white border border-secondary-subtle btn-lg rounded-circle" onClick={downNumberPage}>
                        &laquo;
                    </button>
                    <button type="button" className="btn btn-primary btn-lg rounded-circle">
                        {numberPage}
                    </button>
                    <button type="button" className="btn btn-white border border-secondary-subtle btn-lg rounded-circle" onClick={upNumberPage}>
                        &raquo;
                    </button>
                </div>
            </div>
        </>
    )
}

export default SelectBottom