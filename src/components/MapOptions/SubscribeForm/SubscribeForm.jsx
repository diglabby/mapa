import React, { useState } from "react"
import ReactModal from 'react-modal';
import styled from "styled-components"

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

const SubscribeForm = ({ data, close }) => {

  const { i, t, g } = data

  const [email, setMail] = useState('')
  const [checked, setChecked] = useState('')

  const onSetMail = (e) => setMail(e.target.value)
  const cancelChecked = () => setChecked('')

  const onSubscribe = () => {
    if (!email && !checked) alert('Please write your mail and choose subscribe')
    else if (!email) alert('Please write your mail')
    else if (!checked) alert('Please choose subscribe')
    else {
      let data = { email: email, type: checked }
      if (checked === 'G') {
        let dataG = {
          latNE: g._northEast.lat, lngNE: g._northEast.lng,
          latSW: g._southWest.lat, lngSW: g._southWest.lng
        }
        data.data = dataG
      } else if (checked === 'I') {
        if (i) {
          let dataI = { id: i }
          data.data = dataI
        } else {
          alert('Please choose initiative for subscribe')
          return
        }
      } else if (checked === 'TG') {
        if (t) {
          let dataTG = {
            tag: t,
            latNE: g._northEast.lat, lngNE: g._northEast.lng,
            latSW: g._southWest.lat, lngSW: g._southWest.lng
          }
          data.data = dataTG
        } else {
          alert('Please enter tag into left search panel for subscribe')
          return
        }

      }
      setMail('')
      setChecked('')
      alert('Email: '+data.email+', Type: '+data.type+', Data: '+JSON.stringify(data.data))
    }
  }

  return (
    <ReactModal
      isOpen={true}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div>
        <ButtonsRadioContainer>
          <Label >
            Initiative
            <InputRadio
              type='radio' value="I" checked={'I' === checked}
              onChange={() => setChecked('I')}
            />
          </Label>
          <Label >
            Geo
            <InputRadio
              type='radio' value="G" checked={'G' === checked}
              onChange={() => setChecked('G')}
            />
          </Label>
          <Label >
            TagsGeo
            <InputRadio
              type='radio' value="TG" checked={'TG' === checked}
              onChange={() => setChecked('TG')}
            />
          </Label>
        </ButtonsRadioContainer>
        <InputEmail type='email' value={email} placeholder='Email' onChange={onSetMail} />
        <ButtonsContainer>
          <Button type="button" onClick={onSubscribe}>Subscribe</Button>
          <Button onClick={cancelChecked} >Cancel</Button>
          <Button onClick={close} >Close</Button>
        </ButtonsContainer>
      </div>
    </ReactModal>
  )
}

const ButtonsRadioContainer = styled.div`
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`

const InputRadio = styled.input`
  cursor: pointer;
  margin-left: 4px;
  vertical-align: middle;
`

const Label = styled.label`
  text-align: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.80);
`

const InputEmail = styled.input`
  width: 300px;
  height: auto;
  padding-left: 4px;
  margin-top: 20px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.80);
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
const ButtonsContainer = styled.div`
  height: auto;
  display: grid;
  padding-top: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
`

const Button = styled.button`
  width: 90px;
  height: auto;
  color: rgba(0, 0, 0, 0.80);
  background-color: rgb(232, 232, 232);
  font-size: 16px;
  line-height: 24px;
  border: none;
  border-radius: 4px;
  vertical-align: bottom;
  outline: none;
  &:hover {
    background-color: rgba(232, 232, 232, 0.6);
  }
  &:focus {
    background-color: rgb(232, 232, 232);
  }
`

export default SubscribeForm