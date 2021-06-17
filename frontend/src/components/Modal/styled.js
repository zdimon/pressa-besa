import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

export const StyledModal = styled(Modal)`
  z-index: 9999;
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
