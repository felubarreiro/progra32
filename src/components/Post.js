import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";
import { TextInput } from "react-native"; 
import Ionicons from "@expo/vector-icons/Ionicons";

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
                <Text style={styles.userEmail}>{this.props.postData.email}</Text>
                <Text style={styles.message}>{this.props.postData.message}</Text>
                <View style={styles.footer}>
                    <Pressable style={styles.likeContainer} onPress={() => this.props.postData.likes.includes(auth.currentUser.email) ? this.onUnlike() : this.onLike()}>
                        {this.props.postData.likes.includes(auth.currentUser.email) ? (
                            <Ionicons name="heart" size={20} color="red" style={styles.heartIcon} />
                        ) : (
                            <Ionicons name="heart-outline" size={20} color="black" style={styles.heartIcon} />
                        )}
                        <Text style={styles.likes}>{this.props.postData.likes ? this.props.postData.likes.length : 0} likes</Text>
                    </Pressable>
                    <Pressable style={styles.commentButton} onPress={() => this.Ircomentarios()}>
                        <Text style={styles.commentText}>Comentar</Text>
                    </Pressable>
                </View>  
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        padding: 15,
        
        marginHorizontal: 10,
        marginTop: 40,
    },
    userEmail: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    message: {
        fontSize: 18,
        marginBottom: 12,
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heartIcon: {
        marginRight: 5,
    },
    likes: {
        fontSize: 14,
        color: '#000',
    },
    commentButton: {
        backgroundColor: '#ADD8E6',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#000',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    commentText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButton: {
        backgroundColor: "#FF8A75",
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Post