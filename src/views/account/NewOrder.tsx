import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Property, { PropertyProps } from '../../components/common/Property';
import { colors } from '../../constants';
import RoundButton from '../../components/common/RoundButton';
import strings from '../../locales/strings';
import Counter from '../../components/common/Counter';
import { properties } from '../../components/OrderPill'

interface NewOrderProps {
  properties: PropertyProps[];
  accept: Function;
  decline: Function;
}

const NewOrder = ({ accept, decline, ...item }: NewOrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderText}>{strings.order}</Text>
        <Counter />
      </View>
      <Property
        title={properties[0].title}
        description={typeof item.created_at === 'string' && item.created_at.slice(0, 10)}
        rightText={typeof item.created_at === 'string' && item.created_at.slice(11)}
      />
      <Property
        title={properties[1].title}
        icon={
          !!item && item.car_type && item.car_type.icon
            ? item.car_type.icon
            : properties[1].icon
        }
        description={
          item.car_type
            ? item.car_type.title
            : properties[1].description
        }
      />
      <Property title={strings.typeOfService} description={item.booking_services && item.booking_services.reduce((prev, current) => { return prev + current.service.title + '\n\n' }, "")} />
      <Property
        title={properties[3].title}
        price={
          !!item && item.total_cost ? item.total_cost : properties[3].price
        }
      />
      <View style={styles.row}>
        <RoundButton
          text={strings.decline}
          full
          flex
          textColor={colors.darkGray}
          borderColor={colors.extraGray}
          backgroundColor={colors.extraGray}
          onPress={() => decline(item)}
        />
        <RoundButton
          text={strings.details}
          fill
          full
          flex
          onPress={accept}
          backgroundColor={colors.yellow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: 'bold',
  },
  counter: {},
  container: {
    borderRadius: 25,
    backgroundColor: colors.white,
    padding: 15,
  },
  row: {
    paddingTop: 20,
    flexDirection: 'row',
  },
});

export default NewOrder;
