import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import {NavigationActions} from "react-navigation";
import AuthStateActions from '../actions/loginAction';
import AuthScreen from '../screens/AuthScreen';

export default compose(
  connect(
    state => {
      return {
        loginData: state.auth.loginData,
        loginError: state.auth.loginError,
        loading: state.auth.loading
      };
    },
    dispatch => ({
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    }),
  ),
)(AuthScreen);
