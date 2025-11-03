import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

class Profile extends Component{
    constructor(props){
        super(props)
    }
    render(){
    return(
        <View style={styles.conteiner}> 
            <Text style={styles.title}>Mi Perfil</Text>
            <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}>
            <Text>Ir al log in</Text>
            </Pressable>
        </View>
    )
    }
}
const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
    },
    conteiner:{
        padding:10
    }
  
  });

export default Profile