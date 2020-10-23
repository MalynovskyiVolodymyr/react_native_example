/**
 * @flow
 * @providesModule RNSSegmentedControl
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

class RNSSegmentedControl extends Component {
  static defaultProps = {
    type: 'default',
    selectionColor: 'white',
  };

  render() {
    const segments = this.props.values.map(
      (value, index) => (
        <Segment
          type={this.props.type}
          key={value}
          value={value}
          isSelected={index === this.props.selectedIndex}
          selectionColor={this.props.selectionColor}
          onPress={() => this.props.onChange(index)}
        />
      ),
    );
    return (
      <View style={[styles.container, this.props.style]}>
        {segments}
      </View>
    );
  }
}

function Segment({ isSelected, onPress, selectionColor, value, type }) {
  let selectedButtonStyle;
  if (isSelected) {
    selectedButtonStyle = { borderColor: selectionColor };
  }
  let deselectedLabelStyle;
  if (!isSelected && Platform.OS === 'android') {
    deselectedLabelStyle = styles.deselectedLabel;
  }
  const title = value && value.toUpperCase();

  const accessibilityTraits = ['button'];
  if (isSelected) {
    accessibilityTraits.push('selected');
  }

  return (
    <TouchableOpacity
      accessibilityTraits={accessibilityTraits}
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, type === 'default' && styles.default,
        type === 'underline' && styles.underline, selectedButtonStyle]}
    >
      <Text style={[styles.label, deselectedLabelStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

Segment.propTypes = {
  value: PropTypes.string,
  isSelected: PropTypes.bool,
  onPress: PropTypes.func,
  selectionColor: PropTypes.string,
  type: PropTypes.string,
};

const HEIGHT = 32;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        paddingBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
  },
  button: {
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  default: {
    ...Platform.select({
      ios: {
        height: HEIGHT,
        paddingHorizontal: 20,
        borderRadius: HEIGHT / 2,
        borderWidth: 1,
      },
      android: {
        paddingBottom: 6,
        paddingHorizontal: 10,
        borderBottomWidth: 3,
        marginRight: 10,
      },
    }),

  },
  underline: {
    paddingBottom: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    marginRight: 10,
  },
  label: {
    letterSpacing: 1,
    fontSize: 12,
    color: 'white',
    opacity: 0.82,
  },
  deselectedLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default RNSSegmentedControl;