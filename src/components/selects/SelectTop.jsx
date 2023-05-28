import { useState } from 'react';
import Value from "../values/Value"
import Chart from "../charts/Chart"

const SelectTop = (props) => {
  let arrayOrgaos = props.data.Orgaos
  let arrayConvenios = props.data.Convenios
  let arrayConveniosFilter = arrayConvenios
  let totalValorGlobal = 0
  let totalValorRepasse = 0
  let totalValorContrapartida = 0
  let totalValorRendimentos = 0
  let totalValorGlobalFormat = 0
  let totalValorRepasseFormat = 0
  let totalValorContrapartidaFormat = 0
  let totalValorRendimentosFormat = 0

  const [optionSelect, setOptionSelect] = useState('Todos')
  const handleChange = (event) => {
    setOptionSelect(event.target.value);
  }

  if(optionSelect != "Todos")
    arrayConveniosFilter = arrayConvenios.filter((convenio) => convenio.orgao == optionSelect)

  for(let i = 0; i < arrayConveniosFilter.length; i++){
    let valorAtualGlobal = parseInt(arrayConveniosFilter[i].valor_global.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualRepasse = parseInt(arrayConveniosFilter[i].valor_repasse.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualContra = parseInt(arrayConveniosFilter[i].valor_contrapartida.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualRendimentos = parseInt(arrayConveniosFilter[i].valor_redimentos.replace("R$", "").replace(",", ".").replace(".", ""))
    totalValorGlobal += valorAtualGlobal
    totalValorRepasse += valorAtualRepasse
    totalValorContrapartida += valorAtualContra
    totalValorRendimentos += valorAtualRendimentos
  }

  totalValorGlobalFormat = totalValorGlobal.toLocaleString("pt-BR")
  totalValorRepasseFormat = totalValorRepasse.toLocaleString("pt-BR")
  totalValorContrapartidaFormat = totalValorContrapartida.toLocaleString("pt-BR")
  totalValorRendimentosFormat = totalValorRendimentos.toLocaleString("pt-BR")

   return (
    <>
      <div className="row">
        <div className="col col-8">
          <div className="row d-flex justify-content-center">
            <div className="col col-6 ps-4">
              <select className='form-select' value={optionSelect} onChange={handleChange}>
                  <option value="Todos">Todos</option>
                  {arrayOrgaos.map((orgao, index) => (
                    <option key={index} value={orgao}>{orgao}</option>
                  ))}
              </select>
            </div>
            <div className="col col-4">
              <select className='form-select' value={optionSelect} onChange={handleChange}>
                  <option value="Todos">Todos</option>
                  <option value="Teste">Teste</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex gap-3 justify-content-center">
        <div className="col col-7 d-flex flex-column gap-5 justify-content-around rounded-3 p-3 bg-white shadow">
          <Chart
            data = {arrayConveniosFilter}
            title = "Série histórica de Valores de Convênios"
            type = {1}
          />
        </div>
        <div className="col col-3 gap-3 d-flex flex-column">
          <div className="row rounded-3 p-2 bg-white shadow">
            <Value
                orgao={optionSelect}
                title="Valor Global"
                value={totalValorGlobalFormat}
            />
          </div>
          <div className="row rounded-3 p-2 bg-white shadow">
            <Value
                orgao={optionSelect}
                title="Valor Repasse"
                value={totalValorRepasseFormat}
            />
          </div>
          <div className="row rounded-3 p-2 bg-white shadow">
            <Value
                orgao={optionSelect}
                title="Valor contrapartida"
                value={totalValorContrapartidaFormat}
            />
          </div>
          <div className="row rounded-3 p-2 bg-white shadow">
            <Value
                orgao={optionSelect}
                title="Valor Rendimentos"
                value={totalValorRendimentosFormat}
            />
          </div>
      </div>
      </div>
      <div className="row d-flex gap-3 justify-content-center">
        <div className="col col-7 d-flex flex-column gap-5 justify-content-around rounded-3 p-3 bg-white shadow">
          <Chart
            data = {arrayConveniosFilter}
            title = "Série histórica de Números de Convênios"
            type = {2}
          />
        </div>
        <div className="col col-3 d-flex gap-5 flex-column justify-content-around align-items-center rounded-3 bg-white shadow">
          <Chart
            data = {arrayConveniosFilter}
            type = {3}
          />
        </div>
      </div>
    </>
  )
}

export default SelectTop