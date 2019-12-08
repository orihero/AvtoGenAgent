import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Property, {PropertyProps} from '../../components/common/Property';
import {colors} from '../../constants';
import RoundButton from '../../components/common/RoundButton';
import strings from '../../locales/strings';
import Counter from '../../components/common/Counter';

interface NewOrderProps {
  properties: PropertyProps[];
  accept: Function;
  decline: Function;
}

const NewOrder = ({properties, accept, decline}: NewOrderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderText}>{strings.order}</Text>
        <Counter />
      </View>
      {properties.map(e => {
        return <Property {...e} />;
      })}
      <View style={styles.row}>
        <RoundButton
          text={strings.decline}
          full
          flex
          textColor={colors.darkGray}
          borderColor={colors.extraGray}
          onPress={decline}
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
