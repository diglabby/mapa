import React, { Component } from "react";
import T                    from "prop-types";
import styled               from "styled-components";
import { Field }            from "redux-form";
import i18n                 from "../../i18n";

const t = (key) => i18n.t("IframeMainView.advancedOptions." + key)


class IframeAdvancedOptions extends Component {
  render() {
    return (
      <div>
        <form>
          <FieldContainer>
            <LabelWrapper><label>{t("width")}</label></LabelWrapper>
            <FieldWrapper>
              <FieldElement name='width' component='input' type='text' />
            </FieldWrapper>
          </FieldContainer>
          <FieldContainer>
            <LabelWrapper><label>{t("heigth")}</label></LabelWrapper>
            <FieldWrapper>
              <FieldElement name='heigth' component='input' type='text' />
            </FieldWrapper>
          </FieldContainer>
          <FieldContainer>
            <LabelWrapper><label>{t("hashtag")}</label></LabelWrapper>
            <FieldWrapper>
              <FieldElement name='hashtag' component='input' type='text' />
            </FieldWrapper>
          </FieldContainer>
          <ButtonContainer>
            <Button type='submit'>{t("getCode")}</Button>
          </ButtonContainer>
        </form>
      </div>
    );
  };
}

IframeAdvancedOptions.propTypes = {
  code : T.string,
};

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`

const LabelWrapper = styled.div`
  width: 33.3%;
  text-align: end;
  padding-right: 10px;
  text-transform: capitalize;
`

const FieldWrapper = styled.div`
  width: 66.6%;
`

const FieldElement = styled(Field)`
  width: 100%;
  padding: 0.5em 0.6em;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  vertical-align: middle;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  margin: 0 30px;
`

const Button = styled.button`
  font-size: 36px;
  width: 100%;
  height: 50px;
  background-color: rgb(0, 120, 231);
  outline: none;
  border: none;
  margin-top: 15px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));
  }
`

export default IframeAdvancedOptions;