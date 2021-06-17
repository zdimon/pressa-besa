import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import moment from 'moment'

const Subscription = (props) => {
  const {
    plan,
    setPlan,
    planPeriod = {},
    setPlanPeriod
  } = props

  const changePlan = currentPlan => () => {
    setPlan(currentPlan)
  }

  const setDays = ({ target: { value } }) => {
    setPlanPeriod({
      days: +value,
      dateTo: moment(new Date()).add(+value, 'days')
    })
  }

  const setEndDate = ({ target: { value } }) => {
    const startDate = moment(new Date(), 'YYYY-MM-DD')
    const endDate = moment(value, 'YYYY-MM-DD')
    setPlanPeriod({ days: endDate.diff(startDate, 'days') + 1, dateTo: value })
  }

  return (
    <>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          checked={plan === 'month'}
          onClick={changePlan('month')}
        />
        <label className='form-check-label'>
          Месяц
        </label>
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          checked={plan === 'week'}
          onClick={changePlan('week')}
        />
        <label className='form-check-label'>
          Неделя
        </label>
      </div>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='radio'
          checked={plan === 'period'}
          onClick={changePlan('period')}
        />
        <label className='form-check-label d-flex'>
          <InputGroup>
            <FormControl
              disabled={plan !== 'period'}
              value={planPeriod.days || 0}
              min='0'
              style={{ maxWidth: 100 }}
              type='number'
              onChange={setDays} />
            <InputGroup.Text>дней</InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <FormControl
              disabled={plan !== 'period'}
              value={moment(planPeriod.dateTo).format('YYYY-MM-DD')}
              type='date'
              onChange={setEndDate} />
          </InputGroup>
        </label>
      </div>
    </>
  )
}

export default Subscription
