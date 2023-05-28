import SelectTop from "../../components/selects/SelectTop"
import SelectBottom from "../../components/selects/SelectBottom"
import Data from "../../data/data_convenios.json"
import "./main.css"

const Main = () => {
    return (
        <div className="container-fluid d-flex flex-column gap-3 bg">
            <>
                <SelectTop
                    data={Data}
                />
            </>
            <>
                <SelectBottom
                    data={Data}
                />
            </>
        </div>
    )
}
export default Main