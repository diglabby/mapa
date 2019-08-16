import React, { Component }  from 'react';
import T                     from "prop-types";

import Modal                 from'../Modal';
import IframeVeiwContainer   from './IframeVeiwContainer';
import IframeAdvancedOptions from './IframeAdvancedOptions'

import iframeBuilder         from '../../util/iframeBuilder';

class IframeWrapper extends React.Component {
  state = {
    isShow: false,
    iframe: '',
  }

  handleOpen = () => {
    const currentUrls = window.location.href;
    const currentIframe = iframeBuilder(currentUrls);
    this.props.putIframe(currentIframe);
    this.setState({ iframe: currentIframe, isShow: true })
  }
  handleClose = () => {
    this.setState({ isShow: false });
  }
  render() {
    const { isShow } = this.state;
    return (
      <div>
        <span onClick={this.handleOpen}>Iframe</span>
        {isShow ? (
          <Modal
          title='code'
          MainModalView={IframeVeiwContainer}
          Dropdown={IframeAdvancedOptions}
          buttonName='advanced options'
          isOpen={isShow}
          closeModal={this.handleClose}
        />
          ) : null}
      </div>
    )
  }  
};
  
IframeWrapper.propTypes = {
  title: T.string,
  buttonName: T.string,
  MainModalView: T.func,
  Dropdown: T.func,
  isOpen: T.bool,
};
  
export default IframeWrapper;