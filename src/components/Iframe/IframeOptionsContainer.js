import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IframeAdvancedOptions from './IframeAdvancedOptions';
import Actions from '../../Actions/client';

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    putIframe: Actions.onSetIframe,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(IframeAdvancedOptions);
