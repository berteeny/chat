# Chat

Chat is a native mobile app for sharing messages, including photos and geolocation, developed with React Native. The app can be used on iOS and Android mobile operating systems.



## Development Setup
Chat was created and is tested using [Expo.](https://expo.dev/) **As of the date of this writing, Expo requires Node v 16 to run. To install this version, run 
``` 
nvm install 16.19.0
nvm use 16.19.0
nvm alias default 16.19.0
```

To install Expo for development, run 
```
npm install -g expo-cli
```
Expo will also require an online [account,](https://expo.dev/signup) and optionally, there is a mobile app that can be downloaded for testing on a personal device rather than a simulator/emulator.

To run the Expo CLI, in terminal run
```
expo login
``` 
and follow the prompts.

To run this project locally, clone this repository onto your local environment and, after Emulator/Simulator setup (below), run 
```
npx expo start
```

To create a **new** Expo project, navigate to location where projects are kept and run
```
npx create-expo-app <app-name> --template
```
If template options are offered here, select ```Blank```.

Once all downloads are complete, navigate to newly created project folder and begin development.

### Simulator / Emulator Setup
In addition to being able to run the app on a personal mobile device (below), the app can be run on local Desktop environment using an Android Emulator or an iOS Simulator. 

To use an Android Emulator, download [Android Studio](https://developer.android.com/studio) and follow the prompts to create an account. See Android Studio docs for more in depth setup options.

When ready to emulate an Android native device, open Android Studio and navigate to ```Tools``` > ```Device Manager``` in the app's toolbar. Here, many different Android devices can be selected for testing.

To use an iOS Simulator (on Mac) download [XCode](https://developer.apple.com/xcode/) and follow the prompts to create an account. See XCode docs for more in depth setup options.

When ready to simulate an iOS native device, navigate to project directory in terminal and run 
```
open -a Simulator.app
```


## Testing
To test the app, in terminal run 
```
npx expo start
```

Options for devices to test app with will be displayed. To run the app on a personal mobile device, open the Expo app on mobile device and scan the QR code with the QR code button (Android) or with the built-in QR code scanner in the camera app (iOS).

To run on an Android Emulator with Android Studio, in terminal press ```a```

To run on an iPhone Simulator with XCode, in terminal press ```i```

** Note that for the above commands to work, the Emulator/Simulator must already be running. See above **Simulator / Emulator Setup** section for more on this process.  

To stop running the server, press ```ctrl``` + ```c```

## Data Store with Google Firebase
Chat utilizes [Google Firebase](https://firebase.google.com/) for data storage, which includes all messages and photos sent into the chat. This will require a Google account. See docs for setup instructions. 

## Dependancies
```
   "@react-native-async-storage/async-storage": "1.23.1",
   "@react-native-community/netinfo": "11.3.1",
   "@react-navigation/native": "^6.1.18",
   "@react-navigation/native-stack": "^6.11.0",
   "dotenv": "^16.4.5",
   "expo": "~51.0.28",
   "expo-image-picker": "~15.0.7",
   "expo-location": "~17.0.1",
   "expo-status-bar": "~1.12.1",
   "firebase": "^10.3.1",
   "react": "18.2.0",
   "react-native": "0.74.5",
   "react-native-dotenv": "^3.4.11",
   "react-native-gifted-chat": "^2.4.0",
   "react-native-maps": "1.14.0",
   "react-native-safe-area-context": "4.10.5",
   "react-native-screens": "3.31.1"
```

### Dev dependancies
```
"@babel/core": "^7.20.0"
```
## Components
### Start
The ```Start``` component is the initial landing page of the app, where users will enter their name and be able to choose a background color for their chat screen.
### Chat
The ```Chat``` component is where the messaging functions are carried out. Users can send messages into the chatroom; including photos from their device's gallery, photos from their device's camera, and their device's geolocation.
### CustomActions
The ```CustomActions``` component allows the users to open and collapse the Action sheet that provides the extra functionality for sending photos and geolocation. 


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


