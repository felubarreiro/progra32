import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";
import { TextInput } from "react-native";


class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      error: "",
      post:[]
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;
    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data();
          this.setState({ comments: data.comments, post:data });
        })
  }




  addComment() {
    const postId = this.props.route.params.postId
    db.collection("posts")
      .doc(postId)
      .update({
      comments: firebase.firestore.FieldValue.arrayUnion({ email: auth.currentUser.email, text: this.state.comment,}),
    }).then(() => {this.props.navigation.navigate("HomeMenu")})
  .catch((error) => {
    this.setState({ error: "Error al agregar comentario" });
  });}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.conteinerP}>
            <Text style={styles.userEmail}>{this.state.post.email}</Text>
            <Text style={styles.message}>{this.state.post.message}</Text>
            <Text style={styles.likes}>{this.state.post.likes ? this.state.post.likes.length : 0} likes</Text>
        </View>
        <Text style={styles.title}>Comentarios</Text>
        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.email + 1}
          renderItem={({ item }) => (
            <View style={styles.commentBox}>
              <Text style={styles.commentUser}>{item.email}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />

        <TextInput
        style={styles.input} placeholder="Escribi un comentario" value={this.state.comment} onChangeText={(text) => this.setState({ comment: text })}/>
        <Pressable style={styles.button} onPress={() => this.addComment()}>
        <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
    padding: 15,
  },
  conteinerP: {
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom:20
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  likes: {
  fontSize: 14,
  color: '#000',
  },
  message: {
  fontSize: 18,
  marginBottom: 12,
  color: '#000',
  },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  commentUser: { color: "#1DA1F2", fontWeight: "bold" },
  commentText: { color: "#14171A" },
  input: {
    borderColor: "#E1E8ED",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  error: { color: "#E0245E", marginTop: 10 },
});

export default Comentarios;