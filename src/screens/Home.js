import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }

    componentDidMount(){
        db.collection('posts').onSnapshot(
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
                <Text>Posts:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Post postData={item.data} id={item.id.toString()}/>}
                />
            </View>
        )
    }
}

export default Home