import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import { StyledModal as Modal } from './styled'
import PropTypes from 'prop-types'
import Subscription from './templates/Subscription'
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';

const templates = {
  sub: Subscription
}

const AppModal = (props) => {
  const {
    handleClose,
    handleConfirm,
    visible,
    title,
    confirmBtnText,
    cancelBtnText,
    children,
    template
  } = props

  const [message, setMessage] = React.useState('');
  const [open, setOpenSnackbar] = React.useState(false);

  const [plan, setPlan] = useState('month') // month, period, week
  const [planPeriod, setPlanPeriod] = useState({ days: 0, dateTo: new Date() }) // if period was choosen
  const [countDays, setCountDays] = useState(30);

  const onConfirm = () => {
    switch (template) {
      case 'sub':
        console.log(countDays);
        // handleConfirm({ plan, planPeriod: plan === 'period' && { ...planPeriod, dateTo: moment(planPeriod.dateTo).format('YYYY-MM-DD') } })
        //   const data = { plan, planPeriod: plan === 'period' && { ...planPeriod, dateTo: moment(planPeriod.dateTo).format('YYYY-MM-DD') } };
        setOpenSnackbar(true);
          const req = new Request();
          req.post('subscribe/abonement/add',{days: countDays})
          .then((payload) => {
             setMessage(payload.message);
             setTimeout(2000,()=> setOpenSnackbar(false))
          });
        

        break
      default:
        handleConfirm()
    }
    handleClose()
  }

  const ModalBody = templates[template]

  const commonProps = {
    plan,
    setPlan,
    planPeriod,
    setPlanPeriod,
    countDays,
    setCountDays
  }

  return (
    <>
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ModalBody ? <ModalBody {...props} {...commonProps} /> : children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          {cancelBtnText}
        </Button>
        <Button variant='primary' onClick={onConfirm}>
          {confirmBtnText}
        </Button>
      </Modal.Footer>
    </Modal>
    <Snackbar
        open={open}
        message={message}
        autoHideDuration={2000}
    />
    </>
  )
}

AppModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  template: PropTypes.oneOf(['sub'])
}

AppModal.defaultProps = {
  title: '',
  visible: false,
  handleClose: () => { },
  handleConfirm: () => { },
  confirmBtnText: 'ОК',
  cancelBtnText: 'Закрыть'
}

export default AppModal
