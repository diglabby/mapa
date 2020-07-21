import React, { useState } from "react"
import ReactModal from 'react-modal';
import styled from "styled-components"
import i18n from "../../../i18n";

const modalStyle = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '440px',
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

  const onSubscribe = () => {
    if (!email && !checked) alert(i18n.t("subscribeForm.alerts.noMail&notChecked"))
    else if (!email) alert(i18n.t("subscribeForm.alerts.noMail"))
    else if (!checked) alert(i18n.t("subscribeForm.alerts.notChecked"))
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
          alert(i18n.t("subscribeForm.alerts.initiativeNotChosen"))
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
          alert(i18n.t("subscribeForm.alerts.noTags"))
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
          <ButtonRadio>
            <Label >
              {i18n.t("subscribeForm.initiative.title")}
              <InputRadio
                type='radio' value="I" checked={'I' === checked}
                onChange={() => setChecked('I')}
              />
            </Label>
            <ButtonRadioDescription>
              {i18n.t("subscribeForm.initiative.description")}
            </ButtonRadioDescription>
          </ButtonRadio>
          <ButtonRadio>
            <Label >
              {i18n.t("subscribeForm.geo.title")}
              <InputRadio
                type='radio' value="G" checked={'G' === checked}
                onChange={() => setChecked('G')}
              />
            </Label>
            <ButtonRadioDescription>
              {i18n.t("subscribeForm.geo.description")}
            </ButtonRadioDescription>
          </ButtonRadio>
          <ButtonRadio>
            <Label >
              {i18n.t("subscribeForm.tagGeo.title")}
              <InputRadio
                type='radio' value="TG" checked={'TG' === checked}
                onChange={() => setChecked('TG')}
              />
            </Label>
            <ButtonRadioDescription>
              {i18n.t("subscribeForm.tagGeo.description")}
            </ButtonRadioDescription>
          </ButtonRadio>
        </ButtonsRadioContainer>

        <InputEmail type='email' value={email} placeholder='Email' onChange={onSetMail} />
        <ButtonsContainer>
          <Button type="button" onClick={onSubscribe}>{i18n.t("subscribeForm.subscribeButton")}</Button>
          <Button onClick={close}>{i18n.t("subscribeForm.closeButton")}</Button>
        </ButtonsContainer>
      </div>
    </ReactModal>
  )
}

const ButtonsRadioContainer = styled.div`
  height: auto;
  justify-items: center;
  padding-bottom: 10px;
`

const ButtonRadio = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  padding-bottom: 4%;
`

const InputRadio = styled.input`
  cursor: pointer;
  margin-left: 10px;
  vertical-align: middle;
`

const Label = styled.label`
  text-align: center;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.80);
`

const ButtonRadioDescription = styled.div`
  padding-left: 10px;
`

const InputEmail = styled.input`
  width: 100%;
  height: auto;
  padding-left: 4px;
  margin: auto;
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
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`

const Button = styled.button`
  width: 100px;
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