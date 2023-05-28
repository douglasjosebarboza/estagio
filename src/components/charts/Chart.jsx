import { Line, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, } from "chart.js"

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
    let objNumbersConvenios = {}
    let lastYear = 0
    let qtdConvenios = 0

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
    lastYear = arrayYears[arrayYears.length - 1]

    for(let i = 0; i < props.data.length; i++){
        yearCurrent = props.data[i].ano
        if(yearCurrent == lastYear)
            qtdConvenios++
    }

    const labels = arrayYears;

    const optionsValues = {
        scales: {
            x: {
                display: true
            },
            y: {
                display: false
            }
        },
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    }

    const optionsNumbers = {
        scales: {
            x: {
                display: true
            },
            y: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    }

    const optionsArea = {
        responsive: false,
        cutout: 60,
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
            backgroundColor: ["rgb(0, 100, 132)"],
            borderWidth: 0,
          },
        ],
    }

    switch (props.type) {
        case 1:
            return (
                <>
                    <h2>{props.title}</h2>
                    <Line height={100} options={optionsValues} data={dataValues}></Line>
                </>
            )
        case 2:
            return (
                <>
                    <h2>{props.title}</h2>
                    <Line height={75} options={optionsNumbers} data={dataNumbers}></Line>
                </>
            )

        case 3:
            return (
                <>
                    <h2>Total de convênios em {lastYear}</h2>
                    <div style={{ position: 'relative' }}>
                        <Doughnut data={dataArea} options={optionsArea}></Doughnut>
                        <div
                        style={{
                            position: 'absolute',
                            top: '55%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center'
                        }}
                        >
                        {qtdConvenios}
                        </div>
                    </div>
                    
                </>
            )
    }
}

export default Chart