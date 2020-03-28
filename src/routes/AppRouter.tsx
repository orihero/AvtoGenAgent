import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Account, Details, History, Loader, Login, FillInfo} from '../views';
import InnerHeader from '../components/InnerHeader';
import DrawerContent from '../components/DrawerContent';
import strings from '../locales/strings';
import {createDrawerNavigator} from 'react-navigation-drawer';

const {width: deviceWidth} = Dimensions.get('window');

let AccountStack = createStackNavigator(
  {
    Account,
    Details: {
      screen: Details,
      navigationOptions: {
        header: props => (
          <InnerHeader
            {...props}
            back={'Account'}
            title={strings.orderDetails}
          />
        ),
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        header: props => (
          <InnerHeader {...props} back={'Account'} title={strings.myOrders} />
        ),
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

let FillInfoStack = createStackNavigator({
  FillInfo: {
    screen: FillInfo,
    navigationOptions: {
      header: props => <InnerHeader {...props} title={strings.editPage} />,
    },
  },
});

const DrawerNavigator = createDrawerNavigator(
  {
    AccountStack,
  },
  {
    drawerType: 'slide',
    drawerWidth: deviceWidth * 0.75,
    contentComponent: DrawerContent,
  },
);
// const AppRouter = createAppContainer(AccountStack);

const AppRouter = createSwitchNavigator({
  Loader,
  Login,
  FillInfoStack,
  DrawerNavigator,
});

const AppContainer = createAppContainer(AppRouter);

export default AppContainer;
