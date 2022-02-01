import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import DDSTORE from './ReduxDev/StoreOfDD';
import Toast from 'react-native-toast-message';

//Context Api
import Auth from './ContextApi/Store/Auth';


//End - Screens----------------------------------------------------------------------->DailyDeals
//Start - Navigations----------------------------------------------------------------->DailyDeals
import Main from './Navigators/Main';
//End - Navigations------------------------------------------------------------------->DailyDeals
LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Auth>
      <Provider store={DDSTORE}>
        <NavigationContainer>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
   
  );
}
