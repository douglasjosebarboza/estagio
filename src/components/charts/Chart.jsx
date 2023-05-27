import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, } from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  )
  
const Chart = (props) => {
    let arrayYears = []
    let yearCurrent = 0
    let objValues = {
        "Global":{},
        "Repasse":{},
        "Contrapartida":{},
        "Rendimentos":{}
    }

    for(let i = 0;  i < props.data.length; i++){
        yearCurrent = props.data[i].ano
        if(!arrayYears.includes(yearCurrent)){
            objValues.Global[yearCurrent] = 0
            objValues.Repasse[yearCurrent] = 0
            objValues.Contrapartida[yearCurrent] = 0
            objValues.Rendimentos[yearCurrent] = 0

            arrayYears.push(yearCurrent)
        }
        objValues.Global[yearCurrent] += parseInt(props.data[i].valor_global.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Repasse[yearCurrent] += parseInt(props.data[i].valor_repasse.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Contrapartida[yearCurrent] += parseInt(props.data[i].valor_contrapartida.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Rendimentos[yearCurrent] += parseInt(props.data[i].valor_redimentos.replace("R$", "").replace(",", ".").replace(".", ""))
    }
    arrayYears.sort((a,b) => a - b)

    console.log(objValues)
    const labels = arrayYears;

    const options = {
        responsive: false,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    }
    
    const data = {
        labels,
        datasets: [
            {
                label: "Global",
                data: Object.entries(objValues.Global).map(([key, value]) => value),
                borderColor: "rgb(0, 100, 132)",
                backgroundColor: "rgba(0, 100, 132, 0.5)",
            },
            {
                label: "Repasses",
                data: Object.entries(objValues.Repasse).map(([key, value]) => value),
                borderColor: "rgb(255, 100, 0)",
                backgroundColor: "rgba(255, 100, 0, 0.5)",
            },
            {
                label: "Contrapartida",
                data: Object.entries(objValues.Contrapartida).map(([key, value]) => value),
                borderColor: "rgb(75, 0, 0)",
                backgroundColor: "rgba(75, 0, 0, 0.5)",
            },
            {
                label: "Rendimentos",
                data: Object.entries(objValues.Rendimentos).map(([key, value]) => value),
                borderColor: "rgb(0, 110, 25)",
                backgroundColor: "rgba(0, 110, 25, 0.5)",
            },
        ],
    }

    return (
        <section>
            <h2>{props.title}</h2>
            <Line options={options} data={data}></Line>
        </section>
)}

export default Chart