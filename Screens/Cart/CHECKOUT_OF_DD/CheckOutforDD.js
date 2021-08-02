import React,{useEffect,useState,useContext} from 'react';
import {View,Button } from 'react-native';
import { Item } from 'native-base';
import { Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
var {height,width} =Dimensions.get('window')
import AuthGlobal from '../../../ContextApi/Store/AuthGlobal';
const countries = require("../../../assets/countries.json");

const CheckOutForDD = (props) => {
    const context = useContext(AuthGlobal)
    const [orderItems,setOrderItems] = useState();
    const [address,setAddress] = useState();
    const [address2,setAddress2] = useState();
    const [city,setCity] = useState();
    const [zip,setZip] = useState();
    const [country,setCountry] = useState();
    const [phone,setPhone] = useState();
    const [ user, setUser ] = useState();
    useEffect(() => {
        setOrderItems(props.cartItems)

        if(context.stateUser.isAuthenticated) {
            setUser(context.stateUser.user.userId)
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }

        return () => {
            setOrderItems();
        }
    }, [])

    const checkOut = () => {
       
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user: user,
            zip,
        }
        props.navigation.navigate("Payment", {order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title={"Shipping Address"}>
                <Input
                placeholder={"Phone"}
                name={"phone"}
                value={phone}
                keyboardType={"numeric"}
                onChangeText={(text)=>setPhone(text)}
                />
                <Input
                placeholder={"Shipping Address 1"}
                name = {"ShippingAddress1"}
                value={address}
                onChangeText={(text)=>setAddress(text)}
                />
                <Input
                placeholder = {"Shipping Address 2"}
                name = {"ShippingAddress2"}
                value = {address2}
                onChangeText = {(text)=>setAddress2(text)}
                />
                <Input 
                placeholder = {"City"}
                name = {"city"}
                value={city}
                onChangeText={(text)=>setCity(text)}
                />
                  <Input 
                placeholder = {"Zip Code"}
                name = {"zip"}
                value={zip}
                keyboardType={"numeric"}
                onChangeText={(text)=>setZip(text)}
                />
            
                <Picker
                 mode="dropdown" 
                 selectedValue={country}
                style={{ height: 50, width: width*0.8 ,alignSelf:'center'}}
                  onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
      >
            {countries.map((c) => {
                            return <Picker.Item 
                                    key={c.code} 
                                    label={c.name}
                                    value={c.name}
                                    />
                        })}
      </Picker>
    

    

                   <View style={{ width:'80%', alignItems: "center" }}>
                       <Button title="Confirm" onPress={() => checkOut()}></Button>
                   </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}
const mapStateToProps = (state) => {
    const {cartItems} = state;
    return {
        cartItems : cartItems
    }
}
export default connect(mapStateToProps)(CheckOutForDD)