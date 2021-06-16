import * as React from 'react';
import SubscribeDialog from './SubscribeDialog';
import { render } from "react-dom";

export default function SubscribeButton() {

    var showForm = function() {
        
        const dialogEl = document.getElementById("js-subscribe-dialog");
        console.log(dialogEl);
        if(dialogEl) render(<SubscribeDialog />, dialogEl)
    }
  
    return (
      <>
        <div className="rd-nav-aside__btn">
            <a href="#" data-toggle="modal" 
            onClick={showForm}
            data-target="#subscribeModal" class="button button-primary">Подписка 8 руб/сутки</a>
        </div>
      </>
    )
}