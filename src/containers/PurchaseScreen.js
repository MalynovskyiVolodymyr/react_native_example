import { connect } from 'react-redux';
import { compose } from 'recompose';
import {NavigationActions} from "react-navigation";

import PurchaseScreen from '../screens/PurchaseScreen';
import balanceAction from "../actions/balabceAction";
import {bindActionCreators} from "redux";

export default compose(
  connect(
    state => ({
      loading: state.balance.loading,
      currentBalance: state.balance.userBalance,
      error: state.balance.balanceError
    }),
    dispatch => ({
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      getBalance: bindActionCreators(balanceAction, dispatch)
    }),
  ),
)(PurchaseScreen);
