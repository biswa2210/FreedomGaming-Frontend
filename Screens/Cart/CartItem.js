import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base';
const CartItem = (props) => {
    const data=props.item.item;
    return (
        <ListItem
            style={styles.listitem}
            key={Math.random()}
            avatar
            >
                            <Left>
                                <Thumbnail
                                    source={{
                                        uri: data.image ?
                                         data.image : 
                                         'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                                    }}
                                ></Thumbnail>
                            </Left>
                            <Body style={styles.body}>
                                    <Left>
                                        <Text>{data.name}</Text>
                                    </Left>
                                    <Right>
                                    <Text>RS:{data.price}</Text>
                                    </Right>
                            </Body>
                        </ListItem>
    );
}

const styles = StyleSheet.create({
    listitem : {
        alignItems : 'center',
        backgroundColor : 'white',
        justifyContent:'center'
    },
    body : {
        alignItems:'center',
        margin : 10,
        flexDirection: 'row'
    },
})

export default CartItem;