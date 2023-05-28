import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';

import Table from "../table/table"

const SelectBottom = (props) => {
    let arrayOrgaos = props.data.Orgaos
    let arrayConvenios = props.data.Convenios
    let arrayOp = ["", "", ""]
    let arrayDatasFilter = []
    let arrayYears = []
    let arraySituations = []

    const [optionOrgao, setOptionOrgao] = useState('Todos os ministérios')
    const handleChangeOrgao = (event) => {
        setOptionOrgao(event.target.value);
    }
    const [optionAno, setOptionAno] = useState('Todos os anos')
    const handleChangeAno = (event) => {
        setOptionAno(event.target.value);
    }
    const [optionSituacao, setOptionSituacao] = useState('Todos as situações')
    const handleChangeSituacao = (event) => {
        setOptionSituacao(event.target.value);
    }

    const exportToCSV = (data) => {
        const csvData = data.map((item) => ({
          'Número Do Convênio': item.numero_convenio,
          'Ano': item.ano,
          'Orgão': item.orgao,
          'Situação': item.situacao,
        }));
      
        const csvReport = {
          filename: 'dados.csv',
          data: csvData,
        };
      
        return <CSVLink className="text-decoration-none" {...csvReport}>
            <button type="button" className="btn btn-secondary d-flex align-items-center gap-3 shadow">
                        <FontAwesomeIcon icon={faFileArrowDown} style={{color: "#ffffff",}} />
                        <span>Exportar</span>
            </button>
        </CSVLink>;
    };

    for(let i = 0; i < arrayConvenios.length; i++){
        let failed = false

        if(!arrayYears.includes(arrayConvenios[i].ano))
            arrayYears.push(arrayConvenios[i].ano)
        if(!arraySituations.includes(arrayConvenios[i].situacao))
            arraySituations.push(arrayConvenios[i].situacao)

        for(let j = 0; j < arrayOp.length; j++){
            switch (j) {
                case 0:
                    if(failed == true)
                        break
                    if(arrayOp[j] == "")
                        break
                    if(arrayDatasFilter.includes(arrayConvenios[i])){
                        let index = arrayDatasFilter.indexOf(arrayConvenios[i])
                        if(arrayConvenios[i].orgao != arrayOp[j])
                            arrayDatasFilter.splice(index, 1)
                        break
                    } else {
                        if(arrayConvenios[i].orgao == arrayOp[j])
                            arrayDatasFilter.push(arrayConvenios[i])
                        else
                            failed = true
                        break
                    }
                case 1:
                    if(failed == true)
                        break
                    if(arrayOp[j] == "")
                        break;
                        if(arrayDatasFilter.includes(arrayConvenios[i])){
                            let index = arrayDatasFilter.indexOf(arrayConvenios[i])
                            if(arrayConvenios[i].ano != arrayOp[j])
                                arrayDatasFilter.splice(index, 1)
                            break
                        } else {
                            if(arrayConvenios[i].ano == arrayOp[j])
                                arrayDatasFilter.push(arrayConvenios[i])
                            else
                                failed = true
                            break
                        }
                case 2:
                    if(failed == true)
                        break
                    if(arrayOp[j] == "")
                        break
                        if(arrayDatasFilter.includes(arrayConvenios[i])){
                            let index = arrayDatasFilter.indexOf(arrayConvenios[i])
                            if(arrayConvenios[i].situacao != arrayOp[j])
                                arrayDatasFilter.splice(index, 1)
                            break
                        } else {
                            if(arrayConvenios[i].situacao == arrayOp[j])
                                arrayDatasFilter.push(arrayConvenios[i])
                            else
                                failed = true
                            break
                        }
            }
        }
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
                        <option value="Todos">Todos os ministérios</option>
                        {arrayOrgaos.map((orgao, index) => (
                            <option key={index} value={orgao}>{orgao}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value={optionAno} onChange={handleChangeAno}>
                        <option value="Todos">Todos os anos</option>
                        {arrayYears.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value={optionSituacao} onChange={handleChangeSituacao}>
                        <option value="Todos">Todos as situações</option>
                        {arraySituations.map((situation, index) => (
                            <option key={index} value={situation}>{situation}</option>
                        ))}
                    </select>
                </div>
                <div className="col col-1">
                    {exportToCSV(arrayConvenios)}
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col col-10 bg-white rounded-3 p-3 shadow">
                <Table
                    data={arrayConvenios}
                />
                </div>
            </div>
            
        </>
    )
}


export default SelectBottom