import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'

import Table from "../table/table"

const SelectBottom = (props) => {
    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="row ps-5">
                    <div className="col">
                        <h2 className="ms-5 ps-5">Listagem de Convênios</h2>
                    </div>
                </div>
                <div className="col col-3">
                    <select className='form-select' value="{optionSelect}" onChange="{handleChange}">
                        <option value="Todos">Todos</option>
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value="{optionSelect}" onChange="{handleChange}">
                        <option value="Todos">Todos</option>
                    </select>
                </div>
                <div className="col col-3">
                    <select className='form-select' value="{optionSelect}" onChange="{handleChange}">
                        <option value="Todos">Todos</option>
                    </select>
                </div>
                <div className="col col-1">
                    <button type="button" class="btn btn-secondary d-flex align-items-center gap-3 shadow">
                        <FontAwesomeIcon icon={faFileArrowDown} style={{color: "#ffffff",}} />
                        <span>Exportar</span>
                    </button>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col col-10 bg-white rounded-3 p-3 shadow">
                <Table
                    data={props.data.Convenios}
                />
                </div>
            </div>
            
        </>
    )
}


export default SelectBottom