import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {colors} from '../../constants/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';

const YellowButton = ({type, action, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialIcons name={type} size={25} />
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
