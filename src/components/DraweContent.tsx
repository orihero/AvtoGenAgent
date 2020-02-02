import React from 'react';
import {View, Text, StyleSheet, YellowBox} from 'react-native';
import Avatar from './common/Avatar';
import {connect} from 'react-redux';
import {colors} from '../constants/colors';
import {FlatList} from 'react-native-gesture-handler';
import YellowButton from './common/YellowButton';
import {userLoggedOut} from '../redux/actions/action';
import DrawerItem from '../components/DrawerItem';

const DraweContent = ({navigation, dispatch, user}) => {
  const menuList = [
    {
      id: 1,
      type: 'clock',
      name: 'History',
      to: 'History',
    },
    {
      id: 2,
      type: 'plus',
      name: 'Add',
      to: '',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {user.name}
          </Text>
        </View>
        <View style={styles.avatarWrapper}>
          <Avatar imageURL={user.avatar} size={100} notEdit />
        </View>
      </View>
      <View style={styles.bottom}>
        <FlatList
          data={menuList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return <DrawerItem item={item} />;
          }}
        />
        <View style={styles.buttonWrapper}>
          <YellowButton
            type={'power'}
            onPress={() => {
              dispatch(userLoggedOut());
              navigation.navigate('Login');
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: colors.yellow,
    paddingVertical: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 100,
    elevation: 10,
  },
  nameWrapper: {
    width: 110,
    marginLeft: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarWrapper: {},
  bottom: {
    flex: 1,
    paddingVertical: 30,
  },
  buttonWrapper: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

let mapStateToProps = ({user}) => {
  return {user};
};

export default connect(mapStateToProps, null)(DraweContent);
