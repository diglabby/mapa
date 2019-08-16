import React from "react";
import T from "prop-types";
import styled from "styled-components";
import i18n from "../../i18n";
import { Formik, Form, Field } from 'formik';

import { validateHeightWidth, validateHashtag } from '../../util/validationForms';

const t = (key) => i18n.t("IframeMainView.advancedOptions." + key)


class IframeAdvancedOptions extends React.Component {
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
                  <Field name="width" validate={validateHeightWidth} />
                  {errors.width && touched.width && <div>{errors.width}</div>}
                </FieldWrapper>
              </FieldContainer>
              <FieldContainer>
                <LabelWrapper><label>{t("heigth")}</label></LabelWrapper>
                <FieldWrapper>
                  <Field name="height" validate={validateHeightWidth} />
                  {errors.height && touched.height && <div>{errors.height}</div>}
                </FieldWrapper>
              </FieldContainer>
              <FieldContainer>
                <LabelWrapper><label>{t("hashtag")}</label></LabelWrapper>
                <FieldWrapper>
                  <Field name="hashtag" validate={validateHashtag} />
                  {errors.hashtag && touched.hashtag && <div>{errors.hashtag}</div>}
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

const Container =styled.div`
  margin-top: 20px;
`

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

// const Field = styled(Field)`
//         width: 100%;
//         padding: 0.5em 0.6em;
//         display: inline-block;
//         border: 1px solid #ccc;
//         border-radius: 4px;
//         vertical-align: middle;
//         box-sizing: border-box;
//       `;

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
          background - image: linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));
      }
    `

export default IframeAdvancedOptions;