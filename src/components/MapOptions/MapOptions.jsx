import React, { useState } from 'react'
import styled from "styled-components"
import mapOptions from './icons/mapOptions.png'
import SubscribeForm from './SubscribeForm/SubscribeForm'
import IframeForm from './IframeForm/IframeForm'

const MapOptions = ({ iframeUrl, subscribe }) => {
  
  const [menu, setMenu] = useState(false)
  const [option, setOption] = useState(false)
  
  const openMenu = () => setMenu(true)
  const closeMenu = () => setMenu(false)
  const closeOptionModal = () => {
    setOption(false)
    closeMenu()
  }

  const MenuOptionsContainer = () => {
    const optionsNames = ['Iframe', 'Subscribe']
    return optionsNames.map(n => <MenuOptions key={n} onClick={() => setOption(n)}>{n}</MenuOptions>)
  }

  const OptionModal = () => (
    option === 'Iframe' ?
      <IframeForm data={iframeUrl} close={closeOptionModal} /> :
      <SubscribeForm data={subscribe} close={closeOptionModal} />
  )

  return (
    <ButtonMapOptionsContainer>
      {menu ?
        <MenuOptionsContainer /> :
        <ButtonMapOptions onClick={openMenu}><Img src={mapOptions}/></ButtonMapOptions>}
      {option ? OptionModal() : null}
    </ButtonMapOptionsContainer>
  )
}

const ButtonMapOptionsContainer = styled.div`
    right: 10px;
    top: 50%;
    position: absolute;
    z-index: 1;
    div:hover {
      color: rgb(26,26,26);
      box-shadow: 0 1px 3px 0.2px #000;
    }
  `

const ButtonMapOptions = styled.div`
  outline: none;
  cursor: pointer;
  font-size: 12pt;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: rgb(102,102,102);
  background: #fff;
  width: 36px;
  height: 36px;
  line-height: 46px;
  border-radius: 50%;
  border: none;
  box-shadow: 0 1px 3px 0.2px rgba(0,0,0,0.5);
`

const MenuOptions = styled.div`
  height: 24px;
  width: 100px;
  line-height: 24px;
  margin-bottom: 4px;
  cursor: pointer;
  font-size: 12pt;
  font-weight: 500;
  text-align: center;
  color: rgb(102,102,102);
  background: #fff;
  border-radius: 0.2em;
  border: none;
  box-shadow: 0 1px 3px 0.2px rgba(0,0,0,0.5);
`

const Img = styled.img`
  height: 20px;
  width: 20px;
`

export default MapOptions