import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/core";
import {View,StyleSheet,ActivityIndicator,FlatList,ScrollView,Dimensions} from "react-native";
import { Container, Header, Icon, Item, Input,Text } from "native-base";
import Banner  from "../../Shared/Banner";
import SearchedProduct from "./SearchedProducts";
import ProductList from './ProductList';
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
var { height } = Dimensions.get('window')
const ProductContainer = (props) => {
  const [products,setProducts] = useState([]);
  const [productsFiltered,setProductsFiltered] = useState([]);
  const [focus,setFocus] = useState([]);
  const [productCtg,SetproductCatg] = useState([]);
  const [active,setActive] =  useState();
  const [catagories,setCategories] = useState([]);
  const [initialState,setInitialstate] = useState([]);
  const [loading,setLoading]=useState(true);
  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
    setActive(-1);
    //Products Backend Connection Established
    axios.get(`${baseURL}products`).then((res)=>{
      setProducts(res.data);
      setProductsFiltered(res.data);
      SetproductCatg(res.data);
      setInitialstate(res.data);
      setLoading(false);
    }).catch((err)=>{
      console.log('Api Call Error');
    })
    //Categories Backend Connection Established
    axios.get(`${baseURL}categories`).then((res)=>{
      setCategories(res.data);
    }).catch((err)=>{
      console.log('Api Call Error');
    })
    return () => {
      setProducts([])
      setProductsFiltered([])
      setFocus();
      setCategories([]);
      setActive();
      setInitialstate([]);
    }
  },
      [],
    )
  ));

    

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
   
   
  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [SetproductCatg(initialState), setActive(true)]
        : [
            SetproductCatg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
    {
    loading==false? (<Container>
    <Header searchBar rounded style={{backgroundColor : "#03bafc"}}>
      <Item>
        <Icon name="ios-search"></Icon>
        <Input placeholder="Search in Freedom Gamming"
               onFocus = {openList} 
               onChangeText = {(text)=> searchProduct(text)}
               ></Input>
               {focus==true ? (<Icon onPress={onBlur}  name = 'ios-close'></Icon> ):null}
      </Item>
    </Header>
    {focus==true ? (
        <SearchedProduct
          navigation = {props.navigation}
          productsFiltered={productsFiltered}
        ></SearchedProduct>
    )
    :(
      <ScrollView>
          <View>
      <View>
        <Banner></Banner>
      </View>
      <View>
        <CategoryFilter
        catagories = {catagories}
        catagoryFilter = {changeCtg}
        productsCtg= {productCtg}
        active = {active}
        setActive ={setActive}
        ></CategoryFilter>
      </View>
      {productCtg.length > 0 ? (
     <View style={styles.listContainer}>
         {productCtg.map((item) => {
             return(
                 <ProductList
                    navigation ={props.navigation}
                     key={item._id}
                     item={item}
                 />
             )
         })}
     </View>
     ) : (
         <View style={[styles.center, { height: height / 2}]}>
             <Text>No products found</Text>
         </View>
     )}

      </View>
      </ScrollView>
      
    )}

  </Container>):(
        // Loading
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
        <ActivityIndicator size="large" color="red" />
      </Container>
  )
    }
    </>
   
     
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  }
});
export default ProductContainer;