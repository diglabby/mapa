import React, { useState, useRef } from "react"
import ReactModal from 'react-modal'
import styled from "styled-components"
import IframeOptions from "./IframeOptions"

const modalStyle = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #E6E6E6',
    top: '50%',
    left: '60%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
}

const IframeForm = ({ data, close }) => {

  const [options, setOptions] = useState(false)
  const [width, setWidth] = useState('50%')
  const [height, setHeight] = useState('50%')
  const textAreaRef = useRef(null)

  const startIframe = '<iframe title="Mapa" src="https://mapa.falanster.by/map.html'
  const left = '&left=hide" '
  const txtWidth = 'width="' + width
  const txtHeight = '" height="' + height
  const endIframe = '" ></iframe>'
  const href = '<a href="https://mapa.falanster.by/" target="_blank">The map</a>'

  const code = startIframe + data + left + txtWidth + txtHeight + endIframe + href

  const openOptions = () => setOptions(true)

  const onCopy = (e) => {
    e.currentTarget.focus()
    textAreaRef.current.select()
    document.execCommand('copy')
  }

  return (
    <ReactModal
      isOpen={true}
      style={modalStyle}
      ariaHideApp={false}
    >
      <form >
        <TextIframe ref={textAreaRef} readOnly value={code} />
        {options ? (<IframeOptions applyWidth={setWidth} applyHeight={setHeight} />) : null}
        <ButtonsContainer>
          <Button type="button" onClick={onCopy}>Copy</Button>
          <Button onClick={openOptions} >Options</Button>
          <Button onClick={close} >Close</Button>
        </ButtonsContainer>
      </form>
    </ReactModal>
  )
}

const TextIframe = styled.textarea`
  width: 460px;
  height: 40px;
  padding-left: 8px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.80);
  background-color: #E6E6E6;
  border: none;
  border-radius: 4px;
  outline: none;
`

const ButtonsContainer = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px; 
  padding-top: 20px;
  justify-items: center;
`

const Button = styled.button`
  width: 100px;
  height: auto;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.80);
  background-color: #E6E6E6;
  border: none;
  border-radius: 4px;
  outline: none;
  &:hover {
    background-color: rgba(232, 232, 232, 0.6)
  }
  &:focus {
    background-color: #E4E4E4;
  } 
`

export default IframeForm