const Modal = (props) => {
    return (
      <>
        {props.showModal && (
          <div className="modal modal-lg show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Convenio</h5>
                  <button type="button" className="btn-close" onClick={props.handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col">
                        <h6>Número</h6>
                        <p>{props.data.numero_convenio}</p>
                    </div>
                    <div className="col">
                        <h6>Categorias</h6>
                        <p>{props.data.categorias}</p>
                    </div>
                  </div>
                  <div className="row">
                    <h6>Orgão</h6>
                    <p>{props.data.orgao}</p>
                  </div>
                  <div className="row">
                    <h6>Descrição</h6>
                    <p>{props.data.descricao}</p>
                  </div>
                  <div className="row">
                    <h6>Características de interesse</h6>
                    <p>{props.data.caract_interesses}</p>
                  </div>
                  <div className="row">
                    <h6>Problema a ser Resolvido</h6>
                    <p>{props.data.problema_resolvido}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.handleCloseModal}>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
  
  export default Modal;