import React,{useContext,useState,useEffect} from 'react';
import {Dimensions,StyleSheet,Button,TouchableOpacity, Touchable, RecyclerViewBackedScrollView} from 'react-native';
import {
    Container,
    Text,
    Left,
    Right,
    H1,
    ListItem,
    Thumbnail,
    Body,
    View,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AuthGlobal from "../../ContextApi/Store/AuthGlobal";
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import * as actions from '../../ReduxDev/Actions/cartActionsForDD';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import Header from '../../Shared/Header';
import CartItem from './CartItem';
import cartItems from '../../ReduxDev/ReducersForDD/cartItem';
import { Fragment } from 'react';
var {height,width} =Dimensions.get('window');
const Cart = (props) => {


    const context = useContext(AuthGlobal);

  // Add this
  const [productUpdate, setProductUpdate] = useState()
  const [totalPrice, setTotalPrice] = useState()
  useEffect(() => {
    getProducts()
    return () => {
      setProductUpdate()
      setTotalPrice()
    }
  }, [props])



  
    const getProducts = () => {
      var products = [];
      props.cartItems.forEach(cart => {
        axios.get(`${baseURL}products/${cart.product}`).then(data => {
          products.push(data.data)
          setProductUpdate(products)
          var total = 0;
          products.forEach(product => {
            const price = (total += product.price)
              setTotalPrice(price)
          });
        })
        .catch(e => {
          console.log(e)
        })
      })
    }
    return (
      <Fragment>
          <Header></Header>
        {productUpdate ? (
          <Container>
            <H1 style={{ alignSelf: "center" }}>Cart</H1>
            <SwipeListView
              data={productUpdate}
              renderItem={(data) => (
               <CartItem item={data} />
              )}
              renderHiddenItem={(data) => (
                <View style={styles.hiddenContainer}>
                  <TouchableOpacity 
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(data.item)}
                  >
                    <Icon name="trash" color={"white"} size={30} />
                  </TouchableOpacity>
                </View>
              )}
              disableRightSwipe={true}
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            />
            <View style={styles.bottomContainer}>
              <Left>
                  <Text style={styles.price}>RS: {totalPrice}</Text>
              </Left>
              <Right>
                  <EasyButton
                    danger
                    medium
                    onPress={() => props.clearCart()}
                  >
                    <Text style={{ color: 'white' }}>Clear</Text>
                  </EasyButton>
              </Right>
              <Right>
                {context.stateUser.isAuthenticated ? (
                  <EasyButton
                    primary
                    medium
                    onPress={() => props.navigation.navigate('Checkout')}
                  >
                  <Text style={{ color: 'white' }}>Checkout</Text>
                  </EasyButton>
                ) : (
                  <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate('Login')}
                  >
                  <Text style={{ color: 'white' }}>Login</Text>
                  </EasyButton>
                )}
                  
              </Right>
            </View>
          </Container>
        ) : (
          <Container style={styles.emptyContainer}>
            <Text>Looks like your cart is empty</Text>
            <Text>Add products to your cart to get started</Text>
          </Container>
        )}
     
      </Fragment>
     
    );
}
const mapToStateProps = (state) =>{
    const {cartItems } = state;
    return {
        cartItems : cartItems
};
}
const mapDispatchToProps = (dispatch) => {
    return {
      clearCart: () => dispatch(actions.clearcartfordd()),
      removeFromCart: (item) => dispatch(actions.removefromcartfordd(item))
    };
}
const styles = StyleSheet.create({
    emptyContainer: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
      },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
      }
  });
export default connect(mapToStateProps,mapDispatchToProps)(Cart);