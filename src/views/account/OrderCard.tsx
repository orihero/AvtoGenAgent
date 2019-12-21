import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {colors} from '../../constants/index';
import Property, {PropertyProps} from '../../components/common/Property';
import UserInfo from '../../components/common/UserInfo';
import {OrderStatus} from '../order';

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
const OrderCard = ({user, properties}: OrderProps) => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.indicator} />
      </View>
      <UserInfo {...user} />
      <ScrollView
        style={styles.properties}
        showsVerticalScrollIndicator={false}>
        {properties.map((e, key) =>
          e.price ? null : <Property {...e} {...{key}} />,
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginVertical: 7.5,
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

export default OrderCard;
