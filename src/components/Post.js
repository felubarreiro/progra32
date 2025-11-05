import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
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

    addComment(postId) {
        if (this.state.comment.length < 1) {
          this.setState({ error: "No puedes enviar un comentario vacío" });
          return;
        }
        if(auth.currentUser){
        db.collection("posts")
          .doc(postId)
          .collection("comments")
          .add({
            email: auth.currentUser.email,
            text: this.state.comment,
            createdAt: Date.now(),
          })
          .then(response => {
                    this.setState({posted: true})
                    this.props.navigation.navigate('Home')
            })
          .catch(error => {
                    this.setState({error: 'Fallo al crear el comentario'})
                })
                 } else {
                this.setState({error: 'Debes estar logueado para crear un post'})
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

    render(){
        return(
            <View style={styles.conteiner}>
                <Text style={styles.title}>{this.props.postData.email}</Text>
                <Text style={styles.message}>{this.props.postData.message}</Text>
                <Text style={styles.subtitle}>Comentar</Text>
                                <TextInput style={styles.input} keyboardType="default" onChangeText={text=>this.setState({comment:text})} value={this.state.comment}/>
                                <Text style={styles.error}>{this.state.error}</Text>
                                <Pressable style={styles.boton2} onPress={()=>this.this.addComment(item.id)}> 
                                <Text>Enviar comentario</Text>
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
                {auth.currentUser && auth.currentUser.email === this.props.postData.email ? 
                <Pressable style={styles.botonD} onPress={()=>this.onDelete()}>
                    <Text style={styles.deleteText}>Borrar post</Text>
                </Pressable> : ''}
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