import React, { Component }    from "react";
import T                       from "prop-types";
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome';
import { faPlusSquare }        from '@fortawesome/free-solid-svg-icons';
import IframeWrapperContainer  from'./Iframe/IframeWrapperContainer';
import styled                  from "styled-components";

class IframeMainView extends Component {
  state = {
    isShow: false
  }

  handleClick = () => {
    this.setState({ isShow: !this.state.isShow })
  }
  render() {
    const { isShow } = this.state;
    return (
      <Wrapper>
        <OpenOptions icon={faPlusSquare} onClick={this.handleClick} />
        {isShow ? (
          <IframeWrapperContainer />
        ) : null}
      </Wrapper>
    );
  };
}

IframeMainView.propTypes = {
  code : T.string,
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  top: 50%;
  right: 10px;
`

const OpenOptions = styled(FontAwesomeIcon)`
  width: 30px !important;
  height: 30px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export default IframeMainView;