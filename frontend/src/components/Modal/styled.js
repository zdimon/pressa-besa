import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

export const StyledModal = styled(Modal)`
  .modal {
    &-title {
      text-transform: uppercase;
    }
  }
  .form-check {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
