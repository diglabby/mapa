import React, { Component } from 'react';
import ReactModal           from 'react-modal';
import T                    from "prop-types";
import styled               from "styled-components";

const customStyles = {
  content : {
    display: 'flex',
    flexDirection: 'column',
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -20%)'
  }
};

class Modal extends React.Component {
  state = {
    isShow: false,
  }
  handleClick = () => {
    this.setState({isShow: !this.state.isShow})
  }
  render() {
    const { title, MainModalView, Dropdown, buttonName, isOpen, closeModal } = this.props;
    const { isShow } = this.state;
    return (
      <ReactModal
        isOpen={isOpen}
        style={customStyles}
        contentLabel={`Title-${title}`}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
      >
        <Close onClick={closeModal} />
        <Title>{title}</Title>
        <MainModalView />
        <OpenDropdown onClick={this.handleClick}>{buttonName}</OpenDropdown>
        {isShow ? (<Dropdown />) : null}
      </ReactModal>
    )
  }  
}
  
Modal.propTypes = {
  title: T.string,
  buttonName: T.string,
  MainModalView: T.func,
  Dropdown: T.func,
  isOpen: T.bool,
};

const Title = styled.h3`  
  font-family: "PT Sans",sans-serif;
  font-weight: 500;
  margin-top: 0;
  text-transform: capitalize;
  margin-block-end: 2px;
  text-align: center;
`

const OpenDropdown = styled.div`
  cursor: pointer;
  align-self: flex-end;
`

const Close = styled.div`
  width: 25px;
  height: 25px;
  left: 95%;
  position: relative;
  transform:rotate(45deg);
  &:before, &:after {
    content: "";
    position: absolute;
    z-index: -1;
    background: #d00;
  }
  &:before {
    left: 50%;
    width: 30%;
    margin-left: -15%;
    height: 100%;
  }
  &:after {
    top: 50%;
    height: 30%;
    margin-top: -15%;
    width: 100%;
  }

  &:hover{
    cursor: pointer;
  }
`
  
export default Modal;