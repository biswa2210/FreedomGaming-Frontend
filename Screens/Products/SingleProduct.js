import React, {useState,useEffect} from 'react';
import { Image,View,StyleSheet,Button,Text,ScrollView } from 'react-native';
import { Left,Right,Container,H1 } from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../ReduxDev/Actions/cartActionsForDD';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import Toast from 'react-native-toast-message';
import { SliderBox } from "react-native-image-slider-box";
const SingleProduct = (props) => {
    const [item,setItem] = useState(props.route.params.item);
    const [availability,setAvailability] =useState('');
    const [availabilityText, setAvailabilityText] = useState("");
    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])
    return (
        <Container style={styles.container}>
        <ScrollView style={{ marginBottom: 80, padding: 5 }}>
            <View>
            <SliderBox
                 images={item.images}
                 sliderBoxHeight={300}
                 ImageComponent={Image}
                 ImageComponentStyle={{width: '100%',resizeMode:"contain"}}
                 onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                 dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                imageLoadingColor="#2196F3"
                autoplay
                circleLoop
            />
            </View>
            <View style={styles.contentContainer}>
                <H1 style={styles.contentHeader}>{item.name}</H1>
                <Text style={styles.contentText}>{item.brand}</Text>
            </View>
            <View style={styles.availabilityContainer}>
                <View style={styles.availability}>
                    <Text style={{ marginRight: 10 }}>
                        Availability: {availabilityText}
                    </Text>
                    <Text>{availability}</Text>
                </View>
                <Text>{item.description}</Text>
            </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
            <Left>
                <Text style={styles.price}>RS: {item.price}</Text>
            </Left>
            <Right>
            <EasyButton 
   primary
   medium
   onPress={() => {props.addItemToCart(item.id),
    Toast.show({
    topOffset: 60,
    type: "success",
    text1: `${item.name} added to Cart`,
    text2: "Go to your cart to complete order"
   })
   }}
>
<Text style={{ color: 'white'}}>Add</Text>
</EasyButton>
            </Right>
        </View>
    </Container>
    );
}
const mapDispatchToPatch = (dispatch) => {
    return {
        addItemToCart : (product) => dispatch(actions.addtocartfordd({quantity : 1,product}))
    }
}
 const styles=StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
 });

 export default connect(null,mapDispatchToPatch )(SingleProduct);