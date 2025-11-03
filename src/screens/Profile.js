import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config";

class Profile extends Component{
    constructor(props){
        super(props),
        this.state={
            UserEmail: "",
            UserName: "",
        }
    }
    componentDidMount(){
        let user = auth.currentUser
        if(user){
            this.setState({
                UserEmail: auth.currentUser.email,
                userName: user.displayName ,
            })
        }
    }
    render(){
        return(
            <View style={styles.conteiner}> 
                <Text style={styles.title}>Mi Perfil</Text>
                <Text style={styles.username}>{this.state.UserName}</Text>
                <Text style={styles.email}>{this.state.UserEmail}</Text>
                <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}>
                <Text>Cerrar sesion</Text>
                </Pressable>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "orange",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Profile