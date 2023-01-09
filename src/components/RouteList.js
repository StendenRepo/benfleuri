import React from 'react';
import Styles from '../styles/Popup.module.css';

const Popup = (props) => {
  return (
    <div className={Styles.popupbox}>
      <div className={Styles.box}>
        <span
          className={Styles.closeIcon}
          onClick={props.handleClose}
        >
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};
export default Popup;
