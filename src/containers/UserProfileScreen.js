import { connect } from 'react-redux';
import { compose } from 'recompose';
import {bindActionCreators} from "redux";
import { NavigationActions } from 'react-navigation';

import UserProfileScreen from '../screens/UserProfileScreen';
import * as AuthStateActions from '../reducers/auth';

export default compose(
  connect(
    state => ({

    }),
    dispatch => ({
      authStateActions: bindActionCreators(AuthStateActions, dispatch),
      navigationActions: bindActionCreators(NavigationActions, dispatch)
    }),
  ),
)(UserProfileScreen);