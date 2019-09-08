import { connect } from 'react-redux';

import IframeMainView from './IframeMainView';

const mapStateToProps = ({ iframe }) => ({
    iframe
});


export default connect(mapStateToProps, null)(IframeMainView);
