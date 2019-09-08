import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IframeWrapper from './IframeWrapper';
import Actions from '../../Actions/client';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    putIframe: Actions.onSetIframe,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(IframeWrapper);
