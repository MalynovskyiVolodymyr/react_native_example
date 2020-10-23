import { connect } from 'react-redux';
import { compose } from 'recompose';
import {NavigationActions} from "react-navigation";

import HeaderScreen from '../screens/HeaderScreen';
import {bindActionCreators} from "redux";
import balanceAction from '../actions/balabceAction';

export default compose(
  connect(
    state => {
      return {
        loading: state.balance.loading,
        currentBalance: state.balance.userBalance,
        error: state.balance.balanceError
      }
    },
    dispatch => ({
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      getBalance: bindActionCreators(balanceAction, dispatch)
    }),
  )
)(HeaderScreen);