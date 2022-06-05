import * as React from 'react';
import Modal from '@material-ui/core/Modal'; 
import { useTranslation } from 'react-i18next';

export default function SubscribeDialog() {

  const { t, i18n } = useTranslation();

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
                <h5 className="modal-title" id="git-oper">{t('m_registration_abonement')}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"  onClick={handleClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    
                <form>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period1" value="option1" checked />
                    <label className="form-check-label" for="period1">
                    {t('m_month')}
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period2" value="option1" checked />
                    <label className="form-check-label" >
                    {t('m_week')}
                    </label>
                    </div>
                    <div className="form-check">
                    <input className="form-check-input" type="radio" name="period" id="period3" value="option1" checked />
                    <label className="form-check-label" for="period3">
                    {t('m_period')}
                    </label>
                    
                    </div>

                    <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value="10" id="days" /> 
                        <label className="form-check-label" for="days">
                        {t('m_days')}
                        </label>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" data-provide="datepicker" />
                    </div>
                    </div>
                    
                </form>

                
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">{t('m_subscribe')}</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>{t('m_close')}</button>
                </div>
            </div>
            </div>
        </div>       
      </>
    )
}





