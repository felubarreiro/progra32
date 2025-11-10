import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home"
import NuevoPost from "../screens/NuevoPost"
import Profile from "../screens/Profile"
import Comentarios from "../screens/Comentarios"
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


function StackMenu(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{tabBarIcon: ()=><Entypo name="home" size={24} color="black" />, headerShown: false}}/>
            <Stack.Screen name="Comentarios" component={Comentarios}/>
        </Stack.Navigator>
    )
}


export default StackMenu