import React, { useState } from 'react';
import { render } from "react-dom";


export default function BuyButton() {

    const doBuy = () => {

    }
  
  return (
    <>
        <a 
        href="#" 
        onClick={doBuy}
        className="button button-primary button-sm">Купить</a>
    </>
  )
}