import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icons} from '../../constants/index';
import {colors} from '../../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {withNavigation} from 'react-navigation';

const Avatar = ({navigation, imageURL, size, fileUpload, notEdit}) => {
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.image,
          {
            width: size ? size : 140,
            height: size ? size : 140,
          },
        ]}
        source={{uri: imageURL}}
      />
      {!notEdit && (
        <View
          style={[
            styles.pen,
            {
              width: size ? (size / 140) * 50 : 50,
              height: size ? (size / 140) * 50 : 50,
            },
          ]}>
          {fileUpload ? (
            <SimpleLineIcons name={'camera'} size={18} />
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('FillInfo');
              }}>
              <Icons name={'pen'} color={colors.accent} size={18} />
            </TouchableWithoutFeedback>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
  },
  pen: {
    backgroundColor: colors.extraGray,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: 40}, {translateY: -40}],
    marginBottom: -40,
  },
});

export default withNavigation(Avatar);
