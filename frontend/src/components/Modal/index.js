import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import { StyledModal as Modal } from './styled'
import PropTypes from 'prop-types'
import Subscription from './templates/Subscription'

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

  const [plan, setPlan] = useState('month') // month, period, week
  const [planPeriod, setPlanPeriod] = useState({ days: 0, dateTo: new Date() }) // if period was choosen

  const onConfirm = () => {
    switch (template) {
      case 'sub':
        handleConfirm({ plan, planPeriod: plan === 'period' && { ...planPeriod, dateTo: moment(planPeriod.dateTo).format('YYYY-MM-DD') } })
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
    setPlanPeriod
  }

  return (
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
