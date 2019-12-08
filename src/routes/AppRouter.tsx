import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Account, Details} from '../views';
import Header from '../components/Header';
import InnerHeader from '../components/InnerHeader';
import strings from '../locales/strings';

let AccountStack = createStackNavigator(
  {
    Account,
    Details: {
      screen: Details,
      navigationOptions: {
        header: props => <InnerHeader {...props} back={"Account"} title={strings.orderDetails} />,
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppRouter = createAppContainer(AccountStack);

export default AppRouter;
