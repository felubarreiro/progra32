import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";
import { TextInput } from "react-native";

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    onLike(){
        if(auth.currentUser){
            db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(response => {
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    onUnlike(){
        if(auth.currentUser){
            db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(response => {
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
    onDelete(){
        db.collection('posts').doc(this.props.id).delete()
        .then(response => {
        })
        .catch(error => {
            console.log(error)
        })
    }

    Ircomentarios() {
    if (auth.currentUser) {
      this.props.navigation.navigate("Comentarios", {
        postId: this.props.id,
      });
    } else {
      alert("Debes estar logueado para comentar");
    }
  }

    

    render(){
        return(
            <View style={styles.conteiner}>
                <Text style={styles.title}>{this.props.postData.email}</Text>
                <Text style={styles.message}>{this.props.postData.message}</Text>
                <Pressable style={styles.commentextb} onPress={() => this.Ircomentarios()}>
                <Text style={styles.commentText}>Comentar</Text>
                </Pressable>
                <Text style={styles.likes}>Likes: {this.props.postData.likes ? this.props.postData.likes.length : 0}</Text>
                {auth.currentUser ? ( this.props.postData.likes.includes(auth.currentUser.email) ?
                        <Pressable style={styles.boton2} onPress={()=>this.onUnlike()}>
                            <Text>Quitar like</Text>
                        </Pressable>
                        :
                        <Pressable style={styles.boton} onPress={()=>this.onLike()}>
                            <Text>Like</Text>
                        </Pressable>
                        ) : (<Text style={styles.noAuth}>Debes estar logueado para dar like</Text>)}
                {auth.currentUser && auth.currentUser.email === this.props.postData.email ? (
                <Pressable style={styles.botonD} onPress={()=>this.onDelete()}>
                    <Text style={styles.deleteText}>Borrar post</Text>
                </Pressable>) : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    commentextb: {
        backgroundColor: "#1DA1F2",
        borderRadius: 6,
        padding: 10,
        alignItems: "center",
        marginBottom: 10,
    },
    commentText: {
        color: "#fff",
        fontWeight: "bold",
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5
    },
    message:{
        fontSize:16,
        marginBottom:10
    },
    likes:{
        fontSize:14,
        marginBottom:5,
        color:'gray'
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    botonD:{
        backgroundColor:"#FF8A75",
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    deleteText:{
        color:'white',
        fontWeight:'bold'
    },
    noAuth:{
        fontSize:12,
        color:'red',
        textAlign:'center',
        marginTop:5
    },
    conteiner:{
        padding:10
    }
});

export default Post