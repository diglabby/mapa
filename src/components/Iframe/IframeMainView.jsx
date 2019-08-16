import React, { Component } from "react";
import T                    from "prop-types";
import styled               from "styled-components";
import i18n   from "../../i18n";

const t = (key) => i18n.t("IframeMainView." + key)


class IframeMainView extends Component {
  copy = () => {
    const copyTextarea = document.querySelector('.iframeForCopy');
    copyTextarea.focus();
    copyTextarea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  };
  render() {
    const { iframe } = this.props;
    return (
      <Wrapper>
        <IframeContainer>
          <TextArea
            className='iframeForCopy'
            name='iframe'
            component='textarea'
            type='text'
            defaultValue={iframe.code}
          />
          <Button onClick={this.copy}>
            {t("buttonName")}
          </Button>
        </IframeContainer>
      </Wrapper>
    );
  };
}

IframeMainView.propTypes = {
  code : T.string,
};

const Wrapper = styled.div`
  width: 450px;
  height: 85px;
  margin-top: 20px;
`

const IframeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const TextArea = styled.textarea`
  flex-grow: 1;
  height: 60px;
  border: thin solid #ccc;
`
const Button = styled.button`
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
  line-height: 1.5;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  margin-left: 20px;
  font-size: 14px;
  border-radius: 4px;
  &:hover {
    color: #fff;
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`

export default IframeMainView;