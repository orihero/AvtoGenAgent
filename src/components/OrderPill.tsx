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

let {width, height} = Dimensions.get('window');

const OrderPill = ({user, properties, collapsed}: OrderProps) => {
  let [cardOn, setCardOn] = useState(false);

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
      {/* <View style={{alignItems: 'center'}}>
        <View style={styles.indicator} />
      </View> */}
      <UserInfo {...user} toggleCard={setCardOn} cardVisibility={cardOn} />
      <ScrollView
        style={styles.properties}
        showsVerticalScrollIndicator={false}>
        {properties &&
          properties.map((e, key) =>
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
