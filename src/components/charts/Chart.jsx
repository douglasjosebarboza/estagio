import { Line, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, } from "chart.js"
import "./chart.css"

ChartJS.register(
    ArcElement,
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
    let objNumbersConvenios = {

    }

    for(let i = 0;  i < props.data.length; i++){
        yearCurrent = props.data[i].ano
        if(!arrayYears.includes(yearCurrent)){
            objValues.Global[yearCurrent] = 0
            objValues.Repasse[yearCurrent] = 0
            objValues.Contrapartida[yearCurrent] = 0
            objValues.Rendimentos[yearCurrent] = 0

            objNumbersConvenios[yearCurrent] = 0

            arrayYears.push(yearCurrent)
        }
        objValues.Global[yearCurrent] += parseInt(props.data[i].valor_global.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Repasse[yearCurrent] += parseInt(props.data[i].valor_repasse.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Contrapartida[yearCurrent] += parseInt(props.data[i].valor_contrapartida.replace("R$", "").replace(",", ".").replace(".", ""))
        objValues.Rendimentos[yearCurrent] += parseInt(props.data[i].valor_redimentos.replace("R$", "").replace(",", ".").replace(".", ""))
        objNumbersConvenios[yearCurrent] += 1
    }
    arrayYears.sort((a,b) => a - b)

    const labels = arrayYears;

    const optionsValues = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    }

    const optionsNumbers = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    }

    const optionsArea = {
        responsive: true,
        cutout: 100,
        aspectRatio: 2
    }
    
    const dataValues = {
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

    const dataNumbers = {
        labels,
        datasets: [
            {
                data: Object.entries(objNumbersConvenios).map(([key, value]) => value),
                borderColor: "rgb(0, 100, 132)",
                backgroundColor: "rgba(0, 100, 132, 0.5)",
            }
        ],
    }

    const dataArea = {
        datasets: [
          {
            label: "Número de convênios",
            data: [objNumbersConvenios[arrayYears[arrayYears.length - 1]]],
            backgroundColor: ["rgba(0, 100, 132, 0.5)"],
            borderWidth: 0,
          },
        ],
    }

    switch (props.type) {
        case 1:
            return (
                <section className="container-card-graph-line-1">
                    <h2>{props.title}</h2>
                    <Line options={optionsValues} data={dataValues}></Line>
                </section>
            )
        case 2:
            return (
                <section className="container-card-graph-line-2">
                    <h2>{props.title}</h2>
                    <Line options={optionsNumbers} data={dataNumbers}></Line>
                </section>
            )

        case 3:
            return (
                <section className="container-card-graph-circle">
                    <h2>Total de convênios em {arrayYears[arrayYears.length - 1]}</h2>
                    <Doughnut data={dataArea} options={optionsArea}></Doughnut>
                </section>
            )
    }
}

export default Chart