// import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import react components
import { StyleSheet } from "react-native";

//import firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAtU04b0Yo3lg788RGr196nyv2PRKdgXC8",
    authDomain: "chat-913fe.firebaseapp.com",
    projectId: "chat-913fe",
    storageBucket: "chat-913fe.appspot.com",
    messagingSenderId: "231824433072",
    appId: "1:231824433072:web:d8face5b06b6077d028075",
  };

  //initialize firebase
  const app = initializeApp(firebaseConfig);

  //initialize firestore + make a reference to service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
