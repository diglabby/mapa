import React, { Component }  from 'react';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faShareAlt }          from '@fortawesome/free-solid-svg-icons';
import styled                  from "styled-components";
import T                     from "prop-types";

import Modal                 from'../Modal';
import IframeVeiwContainer   from './IframeVeiwContainer';
import IframeAdvancedOptions from './IframeAdvancedOptions'

import iframeBuilder         from '../../util/iframeBuilder';

class IframeWrapper extends Component {
  state = {
    isShow: false,
  }

  handleOpen = () => {
    const currentUrl = window.location.href;
    const currentIframe = iframeBuilder(currentUrl);
    this.props.putIframe(currentIframe);
    this.setState({ isShow: true })
  }
  handleClose = () => {
    this.setState({ isShow: false });
  }
  render() {
    const { isShow } = this.state;
    return (
      <div>
        <IframeButton icon={faShareAlt} onClick={this.handleOpen} />
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

const IframeButton = styled(FontAwesomeIcon)`
  width: 30px !important;
  height: 30px;
  cursor: pointer;
`
  
export default IframeWrapper;