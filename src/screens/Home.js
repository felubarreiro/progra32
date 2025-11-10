import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import Post from "../components/Post";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { db , auth } from '../firebase/config'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            docs => {
                const postsList = []
                docs.forEach(doc => {
                    postsList.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                this.setState({
                    posts: postsList,
                })
                console.log(postsList);
            }
        )
    }
    render(){
        return(
            <View>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Post postData={item.data} id={item.id.toString()} navigation={this.props.navigation} />
                }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginTop: 7,
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7,
        marginTop: 7,
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginTop: 9,
    },
    conteiner:{
        padding:10
    },
    input:{
        borderColor: 'grey',
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5,
        marginTop:7,
    },
    error:{
        color:'red'
    }
  
  });

export default Home