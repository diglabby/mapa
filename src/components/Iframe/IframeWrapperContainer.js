import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IframeWrapper from './IframeWrapper';
import Actions from '../../Actions/client';

const mapStateToProps = ({ iframe }) => ({
    iframe
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    putIframe: Actions.onSetIframe,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(IframeWrapper);
