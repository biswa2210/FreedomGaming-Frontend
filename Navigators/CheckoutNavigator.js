import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Screens
import Checkout from '../Screens/Cart/CHECKOUT_OF_DD/CheckOutforDD';
import Confirm from '../Screens/Cart/CHECKOUT_OF_DD/Confirm';
import Payment from '../Screens/Cart/CHECKOUT_OF_DD/PaymentForDD';
const Tab = createMaterialTopTabNavigator();

function MyTabs(){
        return (
                <Tab.Navigator>
                    <Tab.Screen name="Shipping" component={Checkout}></Tab.Screen>
                    <Tab.Screen name="Payment" component={Payment}></Tab.Screen>
                    <Tab.Screen name="Confirm" component={Confirm}></Tab.Screen>
                </Tab.Navigator>
        );
}
export default function CheckoutNavigator() {
    return <MyTabs/>;
}