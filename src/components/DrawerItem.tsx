import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import YellowButton from './common/YellowButton';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation';
import {colors} from '../constants/colors';

const DrawerItem = ({item, navigation}) => {
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate(item.to);
        }}>
        <View style={styles.container}>
          <SimpleLineIcons
            name={item.type}
            // color={colors.lightGray}
            size={20}
          />
          <Text style={styles.menuName}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    marginLeft: 40,
    alignItems: 'center',
    borderBottomColor: colors.yellow,
    borderBottomWidth: 0.5,
  },
  menuName: {
    fontSize: 17,
    marginLeft: 30,
  },
});

export default withNavigation(DrawerItem);
