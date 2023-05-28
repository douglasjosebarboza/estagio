import Select from "../../components/selects/Select"
import Table from "../../components/table/table"
import Data from "../../data/data_convenios.json"

const Main = () => {
    return (
        <div className="container-main">
            <section>
                <Select 
                    data={Data}
                />
            </section>
            {/* <section>
                <Table
                    data={Data.Convenios}
                />
            </section> */}
        </div>
    )
}
export default Main