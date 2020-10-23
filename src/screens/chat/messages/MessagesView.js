import React from 'react';
import PropTypes from 'prop-types';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';

import {
  View,
  Text,
  Platform,
} from 'react-native';

import CustomActions from './CustomActions';
import CustomView from './CustomView';
import { NavBar } from '../../../components';

class MessagesView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: HeaderProps => (
      <NavBar
        hasHistory
        navigateBack={() => navigation.goBack()}
        headerProps={HeaderProps}
        title={`Chat with ${navigation.state.params.userName}`}
      />
    ),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.number,
          lastMessage: PropTypes.string,
          online: PropTypes.bool,
          time: PropTypes.strign,
          userAvatar: PropTypes.string,
          userName: PropTypes.string,
        }),
      }),
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      userParams: props.navigation.state.params,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    this._isMounted = true;
    const messages = require('./data/messages.js').map((message) => {
      if (message.user.id !== 1) {
        message.user.avatar = this.state.userParams.userAvatar;
        message.user.name = this.state.userParams.userName;
      }
      return message;
    });
    this.setState(() => {
      return {
        messages,
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        const messages = require('./data/old_messages.js').map((message) => {
          if (message.user.id !== 1) {
            message.user.avatar = this.state.userParams.userAvatar;
            message.user.name = this.state.userParams.userName;
          }
          return message;
        });

        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, messages),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: `${this.state.userParams.userName} is typing...`
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Use our starter kit then!');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: this.state.userParams.userName,
            avatar: this.state.userParams.userAvatar,
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    // if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    // }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = {
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
};

export default MessagesView;
