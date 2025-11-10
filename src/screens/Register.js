import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth , db } from "../firebase/config";


class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName:'',
            password:'',
             error1: "",
             error2: "",
             error3: "",
             errorE:"",
             errorP:""
        }
    }
    register(email,pass, user){
      email = this.state.email
      pass = this.state.password
      user = this.state.userName
      if (email.length < 1) {
        this.setState({ error1: "Este campo es obligatorio" });
        return;
      }else{
        this.setState({error1:''})
      }
    
      if (pass.length < 1) {
        this.setState({ error2: "Este campo es obligatorio" });
        return;
      }else{
        this.setState({error2:''})
      }
      if (user.length < 1) {
        this.setState({ error3: "Este campo es obligatorio" });
        return;
      }else{
        this.setState({error3:''})
      }
        auth.createUserWithEmailAndPassword(email,pass)
        .then(response=>{this.setState({registered:true})
              db.collection('users').add({
                  email: auth.currentUser.email,
                  userName: user,
                  createdAt: Date.now(),
              })
            .then(res => console.log(res))
            .catch(error => console.log(error))
            this.props.navigation.navigate('Login')
    })
    .catch(error=> {
      console.log(error);
      if (error.message.includes('badly formatted')) {
        this.setState({errorE:'El email esta mal formateado'})
      }else{
        this.setState({errorE:''})
      }
      if (error.message.includes('least 6 characters')) {
        this.setState({errorP:'La contraseña debe tener al menos 6 caracteres'})
      }else{
        this.setState({errorP:''})
      }
    })

      console.log(this.state.errorE);
      
    }
    
    render(){
    return(
        <View style={styles.conteiner}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.subtitle}>Email</Text>
            <TextInput style={styles.form} keyboardType="email-address" onChangeText={text=>this.setState({email:text})} value={this.state.email}/>
                 {this.state.errorE == '' ? (
          <Text style={styles.error}>{this.state.error1}</Text>
        ) : <Text style={styles.error}>{this.state.errorE}</Text>}

            <Text style={styles.subtitle}>Username</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({userName:text})} value={this.state.userName}/>
                 {this.state.error2 ? (
          <Text style={styles.error}>{this.state.error2}</Text>
        ) : null}

            <Text style={styles.subtitle}>Password</Text>
            <TextInput style={styles.form} keyboardType="default" onChangeText={text=>this.setState({password:text})} value={this.state.password} secureTextEntry={true}/>
                 {this.state.errorP ? (
          <Text style={styles.error}>{this.state.errorP}</Text>
        ) : <Text style={styles.error}>{this.state.error3}</Text>}
            <Pressable style={styles.boton2} onPress={()=>this.register()}> 
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
  },
  error: {
  color: '#E0245E',
  marginBottom: 10,
  textAlign: 'center',
  fontSize: 14,
},
});



export default Register