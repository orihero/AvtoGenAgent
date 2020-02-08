import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import logo from '../../assets/images/logo-light.png';
import {colors} from '../../constants';
import strings from '../../locales/strings';
import {userLoaded} from '../../redux/actions';

const Loader = ({navigation, userLoaded}) => {
  let bootstrap = async () => {
    let data = await AsyncStorage.getItem('@user');
    // console.warn(data);
    if (!data) {
      navigation.navigate('Login');
      return;
    }
    let userData = JSON.parse(data);
    if (!userData || !userData.token) {
      navigation.navigate('Login');
      return;
    }
    let {settings} = userData;
    if (!settings) {
      navigation.navigate('Login');
      return;
    }
    userLoaded(userData);
    console.warn(userData.token);
    if (!!userData.name) {
      navigation.navigate('Account');
    } else {
      navigation.navigate('FillInfo');
    }
    //set language
    // strings.setLanguage(settings.language);
    // userLoaded(userData);
    // navigation.navigate('Account');
  };
  useEffect(() => {
    bootstrap();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.accent,
  },
  logo: {
    width: 200,
    height: 200 / 1.19,
  },
});

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  userLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
