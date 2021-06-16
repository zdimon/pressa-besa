import * as React from 'react';
import Modal from '@material-ui/core/Modal'; 

export default function SubscribeDialog() {

  const [show, setShow] = React.useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    var submitForm = function() {
        console.log('submition');
    }
  
    return (
      <>
        <div className="modal" style={show ? {}: {display: "none"}}  id="subscribeModal" tabindex="-1" role="dialog">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="git-oper">Оформление абонемента</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    
                <form>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period1" value="option1" checked />
                    <label className="form-check-label" for="period1">
                        Месяц
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period2" value="option1" checked />
                    <label className="form-check-label" >
                        Неделя
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period3" value="option1" checked />
                    <label className="form-check-label" for="period3">
                        Период
                    </label>
                    
                    </div>

                    <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value="10" id="days" /> 
                        <label className="form-check-label" for="days">
                        дней
                        </label>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" data-provide="datepicker" />
                    </div>
                    </div>
                    
                </form>

                
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Подписаться</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Закрыть</button>
                </div>
            </div>
            </div>
        </div>       
      </>
    )
}





