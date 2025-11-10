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
    };
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
        <Text style={styles.title}>Comentarios</Text>

        <FlatList
          data={this.state.comments}
          keyExtractor={(item) => item.id.toString()}
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
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