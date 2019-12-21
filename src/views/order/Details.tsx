import React, {useState, Fragment} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import UserInfo from '../../components/common/UserInfo';
import {colors} from '../../constants';
import {OrderProps} from '../account/OrderCard';
import Property from '../../components/common/Property';
import RoundButton from '../../components/common/RoundButton';
import strings from '../../locales/strings';
import Text from '../../components/common/CustomText';

export enum OrderStatus {
  INITIAL = 0,
  NOT_STARTED = 1,
  STARTED = 2,
  FINISHED = 3,
  REVIEWED = 4,
}

const Details = ({navigation}) => {
  let {
    properties,
    user,
    status: parentStatus,
  }: OrderProps = navigation.getParam('item');
  const [status, setStatus] = useState(
    parentStatus ? parentStatus : OrderStatus.INITIAL,
  );
  let proceed = () => {
    setStatus(status + 1);
  };
  let decline = () => {
    navigation.navigate('Account');
  };
  let renderButtons = () => {
    switch (status) {
      case OrderStatus.INITIAL:
        return (
          <Fragment>
            <RoundButton
              text={strings.decline}
              full
              flex
              backgroundColor={colors.extraGray}
              textColor={colors.darkGray}
              borderColor={colors.extraGray}
              onPress={decline}
            />
            <RoundButton
              text={strings.accept}
              fill
              full
              flex
              onPress={proceed}
              backgroundColor={colors.yellow}
            />
          </Fragment>
        );
      case OrderStatus.NOT_STARTED:
        return (
          <RoundButton
            text={strings.start}
            fill
            full
            flex
            onPress={proceed}
            backgroundColor={colors.yellow}
          />
        );
      case OrderStatus.STARTED:
        return (
          <RoundButton
            text={strings.finish}
            fill
            full
            flex
            onPress={proceed}
            backgroundColor={colors.yellow}
          />
        );
      case OrderStatus.FINISHED:
        return (
          <RoundButton
            text={strings.ready}
            fill
            full
            flex
            onPress={proceed}
            backgroundColor={colors.yellow}
          />
        );
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <UserInfo {...user} />
        {properties.map((e, i) => (
          <Property {...e} key={i} />
        ))}
      </View>
      {status === OrderStatus.FINISHED && (
        <View style={styles.finishedWrapper}>
          <Text style={styles.titleText}>{strings.clientReview}</Text>
          <View style={styles.commentWrapper}>
            <TextInput
              multiline
              numberOfLines={2}
              placeholder={strings.leaveComment}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsWrapper}>{renderButtons()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  finishedWrapper: {
    marginHorizontal: 30,
    borderTopWidth: 1,
    borderColor: colors.extraGray,
  },
  contentContainer: {
    padding: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.ultraLightGray,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    paddingVertical: 30,
  },
  commentWrapper: {
    borderRadius: 20,
    backgroundColor: colors.white,
    borderColor: colors.extraGray,
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
  },
  titleText: {
    fontSize: 18,
    color: colors.accent,
    fontWeight: '400',
    marginVertical: 6,
  },
});

export {Details};
