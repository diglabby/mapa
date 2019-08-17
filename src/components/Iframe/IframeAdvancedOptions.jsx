import React, { Component } from "react";
import T from "prop-types";
import styled, { css } from "styled-components";
import i18n from "../../i18n";
import { Formik, Form, Field } from 'formik';

import { validateHeightWidth, validateHashtag } from '../../util/validationForms';

const t = (key) => i18n.t("IframeMainView.advancedOptions." + key)


class IframeAdvancedOptions extends Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            height: '',
            width: '',
            hashtag: '',
          }}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FieldContainer>
                <LabelWrapper><label>{t("width")}</label></LabelWrapper>
                <FieldWrapper>
                  <Input name="width" validate={validateHeightWidth} />
                  {errors.width && touched.width && <Error>{errors.width}</Error>}
                </FieldWrapper>
              </FieldContainer>
              <FieldContainer>
                <LabelWrapper><label>{t("heigth")}</label></LabelWrapper>
                <FieldWrapper>
                  <Input name="height" validate={validateHeightWidth} />
                  {errors.height && touched.height && <Error>{errors.height}</Error>}
                </FieldWrapper>
              </FieldContainer>
              <FieldContainer>
                <LabelWrapper><label>{t("hashtag")}</label></LabelWrapper>
                <FieldWrapper>
                  <Input name="hashtag" validate={validateHashtag} />
                  {errors.hashtag && touched.hashtag && <Error>{errors.hashtag}</Error>}
                </FieldWrapper>
              </FieldContainer>
              <ButtonContainer>
                <Button type='submit'>{t("getCode")}</Button>
              </ButtonContainer>
            </Form>
          )}
        </Formik>

      </div>
    );
  }
}

IframeAdvancedOptions.propTypes = {
  code: T.string,
};

const Container = styled.div`
  margin-top: 20px;
`

const Error = styled.div`
    color: #f44;
    font-size: 0.9em;
    padding-top: 0.2em;
`

const FieldContainer = styled.div`
        display: flex;
        align-items: center;
        padding: 0.5em 0.6em;
        border-radius: 3px;
        box-sizing: border-box;
        margin-left: -30%;
      `

const LabelWrapper = styled.div`
        width: 33.3%;
        text-align: end;
        padding-right: 10px;
        text-transform: capitalize;
        color: #777777;
      `

const FieldWrapper = styled.div`
        width: 66.6%;
        heigth: 100%;
      `

const commonCss = css`
      width: 100%;
       padding: 0.5em 0;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
      vertical-align: middle;
      box-sizing: border-box;   
`


const Input = styled(Field)`
      ${commonCss}
      
`

const ButtonContainer = styled.div`
        margin: 0 30px;
      `

const Button = styled.button`
        font-size: 28px;
        width: 80%;
        height: 50px;
        background-color: #1890ff;
        outline: none;
        border: 1px solid transparent;
        border-color: #1890ff;
        margin-top: 15px;
        margin-left: 13%;
        color: #fff;
        cursor: pointer;
        text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
        border-radius: 4px;
      
  &:hover {
          background - image: linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));
      }
    `

export default IframeAdvancedOptions;