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
            <Text style={styles.subtitle}>Email</Text>
            <TextInput style={styles.form} keyboardType="email-address" onChangeText={text=>this.setState({email:text})} value={this.state.email}/>
            <Text style={styles.subtitle}>Username</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({userName:text})} value={this.state.userName}/>
            <Text style={styles.subtitle}>Password</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({password:text})} value={this.state.password} secureTextEntry={true}/>
            <Pressable style={styles.boton2} onPress={()=>this.register(this.state.email,this.state.password)}> 
                <Text>Registrarme</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Login')}> 
                <Text>Ya tengo cuenta</Text>
            </Pressable>
        </View>
    )
    }
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: '#F5F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    paddingTop: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#14171A',
    marginBottom: 25,
  },

  subtitle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
    color: '#657786',
    marginBottom: 5,
  },

  form: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E8ED',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  boton2: {
    width: '100%',
    backgroundColor: '#1DA1F2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  boton: {
    width: '100%',
    backgroundColor: '#1DA1F2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});



export default Register