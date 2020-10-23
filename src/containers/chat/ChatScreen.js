import { connect } from 'react-redux';
import { compose, lifecycle, withState, } from 'recompose';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';

import ChatScreen from '../../screens/chat/ChatScreen';
import {
  loadMessagesList
} from '../../reducers/chat';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    dispatch => ({
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      loadMessagesList: () => dispatch(loadMessagesList()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadMessagesList();
    }
  }),
  withState('searchText', 'setSearchText', ''),
)(ChatScreen);
