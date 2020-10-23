import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import SendReciveScreen from '../screens/SendReciveScreen';
import {NavigationActions} from "react-navigation";
import SendReciveAction from '../actions/sendReciveAction';
import balanceAction from "../actions/balabceAction";


export default compose(
  connect(
    state => ({
      loading: state.sendRecive.loading,
      sendReciveError: state.sendRecive.sendReciveError,
      sendReviceResult: state.sendRecive.sendReviceResult
    }),
    dispatch => ({
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      sendToken: bindActionCreators(SendReciveAction.ActionSendToken, dispatch),
      getBalance: bindActionCreators(balanceAction, dispatch)
    }),
  ),
)(SendReciveScreen);