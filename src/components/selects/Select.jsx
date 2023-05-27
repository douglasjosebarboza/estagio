import { useState } from 'react';
import Value from "../values/Value"
import Chart from "../charts/Chart"

const Select = (props) => {
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
    <div>
      <select value={optionSelect} onChange={handleChange}>
        <option value="Todos">Todos</option>
        {arrayOrgaos.map((orgao, index) => (
          <option key={index} value={orgao}>{orgao}</option>
        ))}
      </select>
      <p>Valor selecionado: {optionSelect}</p>
      <div>
        <Chart 
          data = {arrayConveniosFilter}
          title = "Série histórica de Valores de Convênios"
        />
        <div>
            <Value
              orgao={optionSelect}
              title="Valor Global"
              value={totalValorGlobalFormat}
            />
            <Value
              orgao={optionSelect}
              title="Valor Repasse"
              value={totalValorRepasseFormat}
            />
            <Value
              orgao={optionSelect}
              title="Valor contrapartida"
              value={totalValorContrapartidaFormat}
            />
            <Value
              orgao={optionSelect}
              title="Valor Rendimentos"
              value={totalValorRendimentosFormat}
            />
        </div>
      </div>
    </div>
  )
}

export default Select