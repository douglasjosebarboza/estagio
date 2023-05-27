import Select from "../../components/selects/Select"
import Data from "../../data/data_convenios.json"

const Main = () => {
    return (
        <div className="main-container">
            <section>
                <Select 
                    date={Data}
                />
            </section>
        </div>
    )
}
export default Main