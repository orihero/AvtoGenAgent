import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Icons} from '../../constants/index';
import {colors} from '../../constants/colors';

const Avatar = ({imageURL}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: imageURL}} />
      <View style={styles.pen}>
        <Icons name={'pen'} color={colors.accent} size={18} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 140, height: 140, borderRadius: 100},
  pen: {
    backgroundColor: colors.extraGray,
    borderRadius: 40,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: 40}, {translateY: -40}],
    marginBottom: -40,
  },
});

export default Avatar;
