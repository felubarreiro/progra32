import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config";


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }
   
    login(email, pass) {
  if (!email.includes("@")) {
    this.setState({ error: "Email mal formateado" });
    return;
  }

  if (pass.length < 6) {
    this.setState({ error: "La password debe tener una longitud mínima de 6 caracteres" });
    return;
  }

  auth.signInWithEmailAndPassword(email, pass)
    .then(response => {
      this.setState({ loggedIn: true});

      this.props.navigation.navigate("HomeMenu");
    })
    .catch(error => {
      this.setState({ error: "Credenciales inválidas" });
    });
}

    render(){
        return(
            <View style={styles.conteiner}>
            <Text style={styles.title}>Ingresar</Text>
            <Text style={styles.subtitle}>Email</Text>
            <TextInput style={styles.form} keyboardType="email-address" onChangeText={text=>this.setState({email:text})} value={this.state.email}/>
            <Text style={styles.subtitle}>Password</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({password:text})} value={this.state.password} secureTextEntry={true}/>
                <Text>{this.state.error}</Text>
            <Pressable style={styles.boton2} onPress={()=>this.login(this.state.email,this.state.password)}> 
                <Text>Logearme</Text>
            </Pressable>
            <Pressable style={styles.boton2} onPress={()=>this.props.navigation.navigate('Register')}>
            <Text>No tengo cuenta</Text>
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
    marginTop: 10
  },

  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});


export default Login