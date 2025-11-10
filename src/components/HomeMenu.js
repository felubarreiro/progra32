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


function HomeStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{tabBarIcon: ()=><Entypo name="home" size={24} color="black" />, headerShown: false}}/>
            <Stack.Screen name="Comentarios" component={Comentarios}/>
        </Stack.Navigator>
    )
}

class HomeMenu extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Tab.Navigator>
                <Tab.Screen name="HomeTab" component={HomeStack} options={{tabBarIcon: ()=><Entypo name="home" size={24} color="black" />, headerShown: false}}/>
                <Tab.Screen name="NuevoPost" component={NuevoPost} options={{tabBarIcon:()=> <AntDesign name="plus-square" size={24} color="black" />,headerShown: false  }}/>
                <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ()=> <MaterialIcons name="account-circle" size={24} color="black" />,headerShown: false}}/>
            </Tab.Navigator>
        )
    }
}

export default HomeMenu