import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {colors} from '../../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Icons} from '../../constants/icons';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

const YellowButton = ({primaryType, type, action, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container]}>
        {primaryType ? (
          <Icons name={primaryType} size={14} />
        ) : (
          <SimpleLineIcons name={type} size={18} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default YellowButton;
