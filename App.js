import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Comentarios from './src/screens/Comment';
import HomeMenu from "./src/components/HomeMenu";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NuevoPost from './src/screens/NuevoPost';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown:false}}/>
        <Stack.Screen name='NuevoPost' component={NuevoPost} options={{headerShown:false}}/>
        <Stack.Screen name="Comentarios" component={Comentarios} options={{headerShown:false}}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});