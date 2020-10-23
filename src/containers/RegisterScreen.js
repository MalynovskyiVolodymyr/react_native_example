import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import {NavigationActions} from "react-navigation";
import AuthStateActions from '../actions/loginAction';
import RegisterScreen from '../screens/RegisterScreen';

export default compose(
  connect(
    state => {
      return {
        registerData: state.auth.registerData,
        loginError: state.auth.registerError,
        loading: state.auth.loading
      };
    },
    dispatch => ({
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    }),
  ),
)(RegisterScreen);