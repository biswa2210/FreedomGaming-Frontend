import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Orders from "../Screens/Admin/Orders";
import Products from "../Screens/Admin/Products";
import ProductForm from "../Screens/Admin/ProductForm";
import Categories from "../Screens/Admin/Categories";


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
            name = "Products"
            component={Products}
            options={{
                title:"All Grocery Products",
                headerTitleAlign: 'center'
            }}
            >
            </Stack.Screen>
            <Stack.Screen name="Categories" component={Categories}  options={{
                title:"Add Category",
                headerTitleAlign: 'center',
            }}></Stack.Screen>
            <Stack.Screen name="Orders" component={Orders}  options={{
                title:"Show all orders",
                headerTitleAlign: 'center',
            }}></Stack.Screen>
            <Stack.Screen name="ProductForm" component={ProductForm}  options={{
                title:"Add Product",
                headerTitleAlign: 'center',
            }}></Stack.Screen>
        </Stack.Navigator>
    );
}
export default function AdminNavigator() {
    return <MyStack></MyStack>
}