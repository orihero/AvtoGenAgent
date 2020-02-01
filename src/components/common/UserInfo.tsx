import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';
import {colors} from '../../constants';
import {UserProps} from '../../views/account/OrderCard';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const UserInfo = ({
  image = 'https://i7.pngguru.com/preview/393/995/701/aspria-fitness-computer-icons-user-clip-art-my-account-icon-thumbnail.jpg',
  name = 'Николай Соболев',
  phone = '8 99 000 11 25',
  toggleCard,
  cardVisibility,
}: UserProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        toggleCard(!cardVisibility);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.contact}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <View style={styles.controller}>
          <SimpleLineIcons
            name="arrow-down"
            size={15}
            style={{
              transform: [{rotate: cardVisibility ? '0deg' : '180deg'}],
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 50,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  contact: {
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
  },
  phone: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '100',
  },
  controller: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default UserInfo;
