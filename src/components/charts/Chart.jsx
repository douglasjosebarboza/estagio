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
    let yearsCurrent = 0

    for(let i = 0;  i < props.data.length; i++){
        yearsCurrent = props.data[i].ano
        if(!arrayYears.includes(yearsCurrent))
            arrayYears.push(yearsCurrent)
    }
    arrayYears.sort((a,b) => a - b)
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
                data: [8,6,7,5,8],
                borderColor: "rgb(0, 100, 132)",
                backgroundColor: "rgba(0, 100, 132, 0.5)",
            },
            {
                label: "Repasses",
                data: [5,5,7,8,9,5],
                borderColor: "rgb(255, 100, 0)",
                backgroundColor: "rgba(255, 100, 0, 0.5)",
            },
            {
                label: "Contrapartida",
                data: [5,5,7,8,9,5],
                borderColor: "rgb(75, 0, 0)",
                backgroundColor: "rgba(75, 0, 0, 0.5)",
            },
            {
                label: "Rendimentos",
                data: [5,5,7,8,9,5],
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