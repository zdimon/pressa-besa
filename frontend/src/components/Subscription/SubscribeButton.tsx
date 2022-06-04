import React, { useState } from 'react';
import SubscribeDialog from './SubscribeDialog';
import { render } from "react-dom";
import Modal from "../Modal";
import { useTranslation } from 'react-i18next';

export default function SubscribeButton() {

  const [modalVisible, setModalVisible] = useState(false)
  const { t, i18n } = useTranslation();

  var tryOpenModal = function() {
    if( window.localStorage.getItem('token')){
      setModalVisible(true)
    }
    else {
      var el = document.getElementById('js-login-header-link');
      el.dispatchEvent(
        new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        })
      )
    }
  }

  // var showForm = function () {

  //   const dialogEl = document.getElementById("js-subscribe-dialog");
  //   console.log(dialogEl);
  //   if (dialogEl) render(<Modal />, dialogEl)

  //   /*
  //   const buttonEls = document.getElementsByClassName("js-subscribe-button");
  //   [].forEach.call(buttonEls, function (el) {
  //       render(<Modal
  //       title='Оформление абонемента' 
  //       template='sub'
  //       visible
  //       handleClose={() => console.log('handleClose')}
  //       handleConfirm={(result) => console.log('handleConfirm', result)} />, el )
  //   });
  //   */
  // }

  return (
    <>
      <div className="rd-nav-aside__btn">
        <a href="#" data-toggle="modal"
          onClick={() => tryOpenModal()}
          data-target="#subscribeModal" className="button button-primary">{t('btn_subscription')}</a>
        <Modal
          title={t('m_registration_abonement')}
          template='sub'
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
          handleConfirm={(result) => console.log('handleConfirm', result)} />
      </div>
    </>
  )
}