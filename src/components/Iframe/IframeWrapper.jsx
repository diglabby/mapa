import React, { Component }  from 'react';
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faShareAlt }          from '@fortawesome/free-solid-svg-icons';
import styled                  from "styled-components";
import T                     from "prop-types";

import Modal                 from'../Modal';
import IframeVeiwContainer   from './IframeVeiwContainer';
import IframeAdvancedOptions from './IframeAdvancedOptions'

import iframeBuilder         from '../../util/iframeBuilder';
import i18n from "../../i18n";

const t = (key) => i18n.t("IframeMainView." + key)

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
            title={t('title')}
            MainModalView={IframeVeiwContainer}
            Dropdown={IframeAdvancedOptions}
            buttonName={t('advanced')}
            isOpen={isShow}
            closeModal={this.handleClose}
          />
        ) : null}
      </div>
    )
  }  
}
  
IframeWrapper.propTypes = {
  title: T.string,
  buttonName: T.string,
  MainModalView: T.func,
  Dropdown: T.func,
  isOpen: T.bool,
};

const IframeButton = styled(FontAwesomeIcon)`
  width: 28px !important;
  height: 28px;
  cursor: pointer;
  background: #fff;
  color: black;
  cursor: pointer;

  `
  
export default IframeWrapper;