// import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//import react components
import { Alert } from "react-native";
import { useEffect } from "react";

//import firestore
import { initializeApp } from "firebase/app";
import {
  disableNetwork,
  enableNetwork,
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import netInfo
import { useNetInfo } from "@react-native-community/netinfo";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const apiKeyHidden = `${process.env.REACT_APP_DB_API_KEY}`;

  const firebaseConfig = {
    apiKey: apiKeyHidden,
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

  //initialize storage handler
  const storage = getStorage(app);

  //state that represents connectivity status
  const connectionStatus = useNetInfo();

  //listens for changes in connection status, will alert if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost.");

      //disables firebase db reconnection attempts
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      //re-enables firebase db reconnection attempts
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
