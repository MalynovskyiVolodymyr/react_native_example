import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import MessagesScreen from '../../screens/chat/messages/MessagesScreen';
import { loadMessages, sendMessage } from '../../reducers/chat';

export default compose(
  connect(
    state => ({
      messages: state.chat.messages,
    }),
    dispatch => ({
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      loadMessages: userId => dispatch(loadMessages(userId)),
      sendMessage: (userId, message) => dispatch(sendMessage(userId, message)),
    }),
  ),
)(MessagesScreen);
