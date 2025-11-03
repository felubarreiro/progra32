import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config";


class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:''
        }
    }
  
    register(email,pass){
        auth.createUserWithEmailAndPassword(email,pass)
        .then(response=>{this.setState({registered:true});
        this.props.navigation.navigate('Login');
    })
    .catch(error=> {this.setState({error: "fallo en el registro"})})

    }
    
    render(){
    return(
        <View style={styles.conteiner}>
            <Text style={styles.title}>Registro</Text>
            <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}> 
                <Text>Ya tengo cuenta</Text>
            </Pressable>
            <Text style={styles.subtitle}>Email</Text>
            <TextInput style={styles.form} keyboardType="email-address" onChangeText={text=>this.setState({email:text})} value={this.state.email}/>
            <Text style={styles.subtitle}>Username</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({userName:text})} value={this.state.userName}/>
            <Text style={styles.subtitle}>Password</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({password:text})} value={this.state.password} secureTextEntry={true}/>
            <Pressable style={styles.boton2} onPress={()=>this.register(this.state.email,this.state.password)}> 
                <Text>Registrarme</Text>
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
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
    },
    boton2:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    conteiner:{
        padding:10
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5
    }
  
  });

export default Register