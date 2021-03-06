import React, { useState } from 'react';
import SubscribeDialog from './SubscribeDialog';
import { render } from "react-dom";
import Modal from "../Modal";

export default function SubscribeButton() {

  const [modalVisible, setModalVisible] = useState(false)

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
          onClick={() => setModalVisible(true)}
          data-target="#subscribeModal" className="button button-primary">Подписка 8 руб/сутки</a>
        <Modal
          title='Оформление абонемента'
          template='sub'
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
          handleConfirm={(result) => console.log('handleConfirm', result)} />
      </div>
    </>
  )
}