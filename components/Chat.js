import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userID } = route.params;

  //adds new messages to db when sent
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  let unsubMessages;
  useEffect(() => {
    //sets screen title to name
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      //unregister current onSnapshot() listener to avoid having multiple listeners
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      //gets messages from db
      const getMessages = query(
        collection(db, "messages"),
        orderBy("createdAt", "desc")
      );

      //updates db with new messages and displays them
      unsubMessages = onSnapshot(getMessages, (docs) => {
        let newMessages = [];

        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    //stops listening for new data
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  //adds messages to client cache
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        "all_messages",
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  //loads data from client cache instead of db
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("all_messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  //changes to color of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#4f3070",
          },
          left: {
            backgroundColor: "#eed7fc",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/* {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
