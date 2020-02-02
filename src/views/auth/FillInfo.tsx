import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {commonStyles, colors} from '../../constants';
import RoundInput from '../../components/common/RoundInput';
import strings from '../../locales/strings';
import RoundButton from '../../components/common/RoundButton';
import request from '../../api/requests';
import {connect} from 'react-redux';
import {userLoaded, userLoggedIn} from '../../redux/actions';

const FillInfo = ({navigation, dispatch}) => {
  useEffect(() => {
  
  }, []);

  let proceed = () => {
    let stringName = name.firstName + ' ' + name.lastName;
    let credentials = {
      name: stringName,
    };
    request.user
      .updateUser(credentials)
      .then(res => {
        dispatch(userLoggedIn(res.data.data));
      })
      .catch(err => {
        console.warn(err.response);
      });

    navigation.navigate('Account');
  };

  let [name, setName] = useState({
    firstName: '',
    lastName: '',
  });

  return (
    <View style={[styles.container]}>
      <View>
        <RoundInput
          placeholder={strings.name}
          setData={text => {
            setName({...name, firstName: text});
          }}
        />
        <RoundInput
          placeholder={strings.surname}
          setData={text => {
            setName({...name, lastName: text});
          }}
        />
      </View>
      <View style={styles.row}>
        <RoundButton
          full
          onPress={() => {
            navigation.navigate('Account');
          }}
          fill
          flex
          backgroundColor={colors.ultraLightGray}
          borderColor={colors.lightGray}
          text={strings.skip}
        />
        <RoundButton
          flex
          onPress={proceed}
          full
          fill
          textColor={colors.white}
          backgroundColor={colors.accent}
          text={strings.next}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: colors.ultraLightGray,
    flex: 1,
    paddingVertical: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default connect(null, null)(FillInfo);
