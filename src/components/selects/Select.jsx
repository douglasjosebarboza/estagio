import { useState } from 'react';
import Value from "../../components/values/Value"

const Select = (props) => {
  let arrayOrgaos = props.date.Orgaos
  let arrayConvenios = props.date.Convenios
  let arrayConveniosFilter = arrayConvenios
  let totalValorGlobal = 0
  let totalValorRepasse = 0
  let totalValorContrapartida = 0
  let totalValorRendimentos = 0

  const [optionSelect, setOptionSelect] = useState('Todos')
  const handleChange = (event) => {
    setOptionSelect(event.target.value);
  }

  if(optionSelect != "Todos")
    arrayConveniosFilter = arrayConvenios.filter((convenio) => convenio.orgao == optionSelect)

  for(let i = 0; i < arrayConveniosFilter.length; i++){
    let valorAtualGlobal = parseFloat(arrayConveniosFilter[i].valor_global.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualRepasse = parseFloat(arrayConveniosFilter[i].valor_repasse.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualContra = parseFloat(arrayConveniosFilter[i].valor_contrapartida.replace("R$", "").replace(",", ".").replace(".", ""))
    let valorAtualRendimentos = parseFloat(arrayConveniosFilter[i].valor_redimentos.replace("R$", "").replace(",", ".").replace(".", ""))
    totalValorGlobal += valorAtualGlobal
    totalValorRepasse += valorAtualRepasse
    totalValorContrapartida += valorAtualContra
    totalValorRendimentos += valorAtualRendimentos
  }

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
        <p></p>
        <h1>GRÁFICOS</h1>
        <div>
            <Value
              date = {props.date}
              orgao={optionSelect}
              title="Valor Global"
              value={totalValorGlobal}
            />
            <Value
              date = {props.date}
              orgao={optionSelect}
              title="Valor Repasse"
              value={totalValorRepasse}
            />
            <Value
              date = {props.date}
              orgao={optionSelect}
              title="Valor contrapartida"
              value={totalValorContrapartida}
            />
            <Value
              date = {props.date}
              orgao={optionSelect}
              title="Valor Rendimentos"
              value={totalValorRendimentos}
            />
        </div>
    </div>
    </div>
  )
}

export default Select