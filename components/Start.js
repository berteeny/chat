import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { LogBox } from "react-native";

//ignores warning message not needed
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Start = ({ navigation }) => {
  //  colors = ["#542344", "#BFD1E5", "#EBF5EE", "#D8BFAA", "#808080"];
  const auth = getAuth();
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name,
          backgroundColor: backgroundColor,
        });
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/birdsbg.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {/* App title */}
        <Text style={styles.chat}>Chat</Text>

        {/* page content container */}
        <View style={styles.box}>
          {/* user inputs name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            accessibilityLabel="input"
            accessibilityHint="Displays your name on the top of the chat screen"
          />

          {/* choose colors container */}
          <View style={styles.chooseColorsContainer}>
            <Text>Choose your background color</Text>
            <View style={styles.colorsContainer}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color button"
                accessibilityHint="Lets you choose this background color"
                accessibilityRole="button"
                style={[styles.colorButton, { backgroundColor: "#542344" }]}
                onPress={() => setBackgroundColor("#542344")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color button"
                accessibilityHint="Lets you choose this background color"
                accessibilityRole="button"
                style={[styles.colorButton, { backgroundColor: "#BFD1E5" }]}
                onPress={() => setBackgroundColor("#BFD1E5")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color button"
                accessibilityHint="Lets you choose this background color"
                accessibilityRole="button"
                style={[styles.colorButton, { backgroundColor: "#EBF5EE" }]}
                onPress={() => setBackgroundColor("#EBF5EE")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color button"
                accessibilityHint="Lets you choose this background color"
                accessibilityRole="button"
                style={[styles.colorButton, { backgroundColor: "#D8BFAA" }]}
                onPress={() => setBackgroundColor("#D8BFAA")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Background color button"
                accessibilityHint="Lets you choose this background color"
                accessibilityRole="button"
                style={[styles.colorButton, { backgroundColor: "#808080" }]}
                onPress={() => setBackgroundColor("#808080")}
              ></TouchableOpacity>
            </View>
          </View>

          {/* navigation to chatroom */}
          <View style={styles.chatButton}>
            <Button
              title="Enter the chatroom"
              accessibilityLabel="Tap to enter the chatroom"
              color="#542344"
              onPress={signInUser}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    width: "88%",
    height: "95%",
    alignItems: "center",
  },

  chat: {
    fontSize: 35,
    fontWeight: "900",
    color: "#542344",
    marginTop: 25,
    marginBottom: 10,
  },

  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  image: {
    flex: 1,
    justfiyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  chooseColorsContainer: {
    width: "88",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 10,
    borderRadius: 10,
  },

  colorsContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    padding: 2,
  },

  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },

  chatButton: {
    marginTop: 300,
    borderRadius: 10,
    padding: 5,
  },
});

export default Start;
