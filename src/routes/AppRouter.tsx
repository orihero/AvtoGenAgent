import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Account, Details, History, Loader, Login, FillInfo} from '../views';
import InnerHeader from '../components/InnerHeader';
import strings from '../locales/strings';

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

// const AppRouter = createAppContainer(AccountStack);

const AppRouter = createSwitchNavigator({
  Loader,
  Login,
  FillInfo,
  AccountStack,
});

const AppContainer = createAppContainer(AppRouter);

export default AppContainer;
