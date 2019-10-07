import React, { useState } from "react"
import styled from "styled-components";

const IframeOptions = ({ applyWidth, applyHeight }) => {

  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  const onWidth = (e) => setWidth(e.target.value)
  const onHeight = (e) => setHeight(e.target.value)

  const onApply = () => {
    width && applyWidth(width)
    height && applyHeight(height)
  }

  return (
    <OptionsContainer>
      <Options onChange={onWidth} value={width} placeholder='Width' />
      <Options onChange={onHeight} value={height} placeholder='Height' />
      <Button onClick={onApply} >Apply</Button>
    </OptionsContainer>
  )
}

const OptionsContainer = styled.div`
height: auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 40px; 
padding-top: 20px;
justify-items: center;
`

const Options = styled.input`
  width: 100px;
  height: auto;
  padding-left: 4px;
  font-size: 18px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  outline: none;
  &:hover {
    border: 1px solid rgb(102,102,102);
  }
  &:focus {
    border: 1px solid rgb(102,102,102);
  }
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

export default IframeOptions