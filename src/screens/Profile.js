import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { auth } from "../firebase/config";
import { FlatList } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Profile extends Component{
  constructor(props){
    super(props),
    this.state={
      UserEmail: "",
      UserName: "",
      UserPost: [],
    }
  }
  componentDidMount(){
    let user = auth.currentUser
    if(user){
      this.setState({
        UserEmail: auth.currentUser.email,
      })
    }
    db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        docs.forEach((doc) =>
          this.setState({
            UserName: doc.data().userName,
          })
        )     
      })
    db.collection("posts")
      .where("email", "==", auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      this.setState({ UserPost: posts }); 
    })
  }

  render(){
    return(
      <View style={styles.conteiner}> 
        <Text style={styles.username}>{this.state.UserName}</Text>
        <Text style={styles.email}>{this.state.UserEmail}</Text>
        <Text style={styles.subtitle}>Últimos posteos:</Text>
        <FlatList
          data={this.state.UserPost}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <Post postData={item.data} id={item.id.toString()} navigation={this.props.navigation} showDelete={true}/>}
        />
        <Pressable style={styles.boton} onPress={()=>auth.signOut()}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </Pressable>
      </View>
    )
  }
} 
const styles = StyleSheet.create({
  conteiner: {
    padding: 10,
  },
  username: {
    fontSize: 30,
    fontWeight: "600",
  },
  email: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },
  boton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    margin: 10,
    borderColor:'black',
    borderWidth:1
  },
  logoutText: {
    color: "#FF0000",
    fontWeight: "600",
  },
});

export default Profile