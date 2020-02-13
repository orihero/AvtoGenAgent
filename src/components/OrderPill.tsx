import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';

import {colors} from '../constants/index';
import Property, {PropertyProps} from '../components/common/Property';
import UserInfo from '../components/common/UserInfo';
import {OrderStatus} from '../views/order';

export interface UserProps {
  name: string;
  phone: string;
  image: string;
}
export interface OrderProps {
  user: UserProps;
  properties: PropertyProps[];
  status?: OrderStatus;
}

const properties = [
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
];

let {width, height} = Dimensions.get('window');

const OrderPill = ({item, collapsed}: OrderProps) => {
  let [cardOn, setCardOn] = useState(false);
  console.warn(item);
  useEffect(() => {
    setCardOn(collapsed);
  }, [collapsed]);

  return (
    <View
      style={[
        styles.container,
        {
          height: cardOn ? 100 : null,
        },
      ]}>
      <UserInfo
        user={item.user}
        toggleCard={setCardOn}
        cardVisibility={cardOn}
      />
      <ScrollView
        style={styles.properties}
        showsVerticalScrollIndicator={false}>
        <Property
          title={properties[0].title}
          description={item.created_at.slice(0, 10)}
          rightText={item.created_at.slice(11)}
        />
        <Property
          title={properties[1].title}
          icon={
            !!item && item.car_type && item.car_type.icon
              ? item.car_type.icon
              : properties[1].icon
          }gi
          description={
            item.car_type
              ? item.car_type.description
              : properties[1].description
          }
        />
        <Property
          title={properties[2].title}
          description={properties[2].description}
        />
        <Property
          title={properties[3].title}
          price={
            !!item && item.total_price ? item.total_price : properties[3].price
          }
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.ultraLightGray,
    borderWidth: 2,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginVertical: 7.5,
    // height: 111,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: colors.ultrLightBlue,
    marginTop: 10,
  },
  properties: {},
});

export default OrderPill;
