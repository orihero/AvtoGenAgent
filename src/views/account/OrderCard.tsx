import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {colors} from '../../constants/index';
import Text from '../../components/common/CustomText';
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
      <View style={styles.properties}>
        {properties.map((e, key) =>
          e.price ? null : <Property {...e} {...{key}} />,
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 40,
    paddingHorizontal: 30,
    paddingVertical: 15,
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
