import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Switch, YellowBox} from 'react-native';
import {colors} from '../../constants';
import strings from '../../locales/strings';
import Avatar from '../../components/common/Avatar';
import Text from '../../components/common/CustomText';
import OrderCard, {OrderProps} from './OrderCard';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import NewOrder from './NewOrder';
import request from '../../api/requests';
import YellowButton from '../../components/common/YellowButton';
import RoundButton from '../../components/common/RoundButton';
import {connect} from 'react-redux';
import {userLoggedOut} from '../../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

interface AccountProps {
  navigation: any;
}
export let demoOrder: OrderProps = {
  properties: [
    {
      title: 'Дата посещения',
      rightText: '16:35',
      description: '03.12.2019',
    },
    {
      title: 'Тип автомобиля',
      icon: 'light',
      description: 'Легковой',
    },
    {
      title: 'Тип услуги',
      description: 'Бесконтактная мойка кузова автомобиля, коврики пороги',
    },
    {title: 'Цена умлуги', price: '40 000 сум'},
  ],
};

// request.profile
//   .showProfile()
//   .then(res => {
//     setAccountDetails(res.data);
//     console.warn(accountDetails);
//   })
//   .catch(err => {
//     console.warn(err);
//   });

const AccountScreen = ({navigation, dispatch, user}: AccountProps) => {
  const [isActive, setisActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  let [accountDetails, setAccountDetails] = useState({});

  useEffect(() => {
    // request.profile
    //   .showProfile()
    //   .then(res => {
    //     setAccountDetails(res.data.data);
    //   })
    //   .catch(err => {
    //     console.warn('error in showprofile');
    //     console.warn(err.response);
    //   });
  }, []);

  let accept = () => {
    setIsOpen(false);
    navigation.navigate('Details', {item: demoOrder});
  };
  let decline = () => {
    setIsOpen(false);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.avatarWrapper}>
            <YellowButton
              primaryType={'menu'}
              onPress={() => {
                navigation.toggleDrawer();
              }}
              // type={'history'}
              // onPress={() => navigation.navigate('History')}
            />
            <Avatar imageURL={user.avatar} />
            <View style={{width: 60}} />
            {/* <YellowButton type={'add'} onPress={() => setIsOpen(!isOpen)} /> */}
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.nameText}>{user.name}</Text>
            <Text style={styles.legalName}>
              {!!accountDetails && accountDetails.title}
            </Text>
            <Text style={styles.address}>
              {!!accountDetails && accountDetails.company_address}
            </Text>
          </View>
          <View style={styles.sideRow}>
            <Text style={styles.active}>{strings.active}</Text>
            <Switch
              onValueChange={val => setisActive(val)}
              style={styles.switch}
              value={isActive}
              trackColor={{true: colors.yellow, false: colors.accent}}
            />
          </View>
          {/*  */}
          <Text style={styles.ordersText}>{strings.orders}</Text>
        </View>
      </View>
      <OrderCard {...demoOrder} />
      {/* <View style={styles.ordersWrapper}></View> */}
      {isOpen && (
        <Modal isOpen={isOpen}>
          <NewOrder {...demoOrder} {...{accept, decline}} />
        </Modal>
      )}
      {/* <Header menuPress={() => navigation.navigate('History')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.ultraLightGray,
    // paddingTop: 60,
  },
  modalContent: {
    padding: 15,
  },
  avatarWrapper: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  // ordersWrapper: {
  //   flex: 1,
  // },
  ordersText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  infoWrapper: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 20,
    marginTop: 10,
  },
  sideRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: colors.extraGray,
  },
  container: {
    padding: 15,
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.ultraLightGray,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  nameText: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: 10,
    textAlign: 'center',
  },
  legalName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.accent,
    textAlign: 'center',
  },
  address: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.darkGray,
    textAlign: 'center',
  },
  active: {
    fontSize: 13,
    color: colors.accent,
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

// const mapStateToProps = ({user}) => ({user});

const mapStateToProps = ({user}) => {
  return {user};
};
// const mapDispatchToProps = dispatch => ({});

let Account = connect(mapStateToProps, null)(AccountScreen);
export {Account};
