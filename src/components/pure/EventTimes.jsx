import React         from "react";
import styled        from "styled-components";
import { translate } from "react-i18next";

const TimesWrapper = styled.div`
  margin-top: 7px;
`;

const getHumanDate = (date) => new Date(date*1000).toDateString();

const EventTimes = ({ start, end }) => {
  return (
    <TimesWrapper>
      <span>{
        getHumanDate(start)

        + (end ? (" - " + getHumanDate(end)) : "")
      }</span>
    </TimesWrapper>
  );
}

module.exports = translate('translation')(EventTimes)
