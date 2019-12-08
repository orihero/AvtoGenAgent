import React from 'react';
import {View, Text as RnText, StyleSheet} from 'react-native';

const Text = ({style, children, ...rest}) => {
  let baseStyle = styles.medium;
  if (style) {
    baseStyle =
      style.fontWeght === 'bold'
        ? styles.bold
        : style.fontWeight === '100'
        ? styles.light
        : style.fontWeight === '900'
        ? styles.black
        : styles.medium;
  }
  return <RnText style={[baseStyle, style]}>{children}</RnText>;
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'Lato-Bold',
  },
  light: {
    fontFamily: 'Lato-Light',
  },
  medium: {
    fontFamily: 'Lato-Regular',
  },
  black: {
    fontFamily: 'Lato-Black',
  },
});

export default Text;
