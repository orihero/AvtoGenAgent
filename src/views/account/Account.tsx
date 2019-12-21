import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Switch} from 'react-native';
import {colors} from '../../constants';
import strings from '../../locales/strings';
import Avatar from '../../components/common/Avatar';
import Text from '../../components/common/CustomText';
import OrderCard, {OrderProps} from './OrderCard';
import Modal from '../../components/Modal';
import Header from '../../components/Header';
import NewOrder from './NewOrder';

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
  user: null,
};

const Account = ({navigation}: AccountProps) => {
  const [isActive, setisActive] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 5000);
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
          <View style={styles.infoWrapper}>
            <Avatar />
            <Text style={styles.nameText}>Scarlett Johansson</Text>
            <Text style={styles.legalName}>AVTOritet Car-Wash</Text>
            <Text style={styles.address}>ул. Лабзак, 12/1, Tashkent</Text>
          </View>
        </View>
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
      <Text style={styles.ordersText}>{strings.orders}</Text>
      <View style={styles.ordersWrapper}>
        <OrderCard {...demoOrder} />
      </View>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <NewOrder {...demoOrder} {...{accept, decline}} />
        </Modal>
      )}
      <Header menuPress={() => navigation.navigate('History')} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: colors.ultraLightGray, paddingTop: 60},
  modalContent: {
    padding: 15,
  },
  ordersWrapper: {flex: 1},
  ordersText: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  infoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
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
    paddingHorizontal: 30,
    backgroundColor: colors.ultraLightGray,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nameText: {
    fontSize: 20,
    color: colors.accent,
    marginBottom: 15,
  },
  legalName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.accent,
  },
  address: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.darkGray,
  },
  active: {
    fontSize: 13,
    color: colors.accent,
  },
  switch: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}],
  },
});

export {Account};
