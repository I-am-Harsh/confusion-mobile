import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';


// header options
const headerOptions = {
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff"
    }
}

// menu
const MenuNavigator = createStackNavigator();
const MenuNavigatorScreen = () => {
    return (
        <MenuNavigator.Navigator
            initialRouteName = 'Menu'
            screenOptions = {headerOptions}
        >
            <MenuNavigator.Screen
                name = "Menu"
                component = {Menu}
                options={
                    ({ navigation }) => ({ 
                        headerLeft : <Icon name = 'menu' 
                                size = {24} 
                                color='White' 
                                onPress = { () => navigation.toggleDrawer()} 
                            />
                    })
                }
                />
            <MenuNavigator.Screen
                name = "Dishdetail"
                component = {Dishdetail}
                options = {{ headerTitle: "Dish Detail" }}
            />
        </MenuNavigator.Navigator>
    );
};

// Home
const HomeNavigator = createStackNavigator();
const HomeNavigatorScreen = () => {
    return (
        <HomeNavigator.Navigator
            screenOptions={headerOptions}
        >
            {/* this is the screen header name */}
            {/* compoenent call */}
            <MenuNavigator.Screen
                name = "Home"
                component = {Home}
            />
        </HomeNavigator.Navigator>
    );
}

// about stack
const AboutNavigator = createStackNavigator();
const AboutNavigatorScreen  = () => {
    return(
        <AboutNavigator.Navigator
            screenOptions = {headerOptions}
        >
            <AboutNavigator.Screen
                name = 'About'
                component = {About}
            />
        </AboutNavigator.Navigator>
    );
}

// Contact us

const ContactNavigator = createStackNavigator();

const ContactNavigatorScreen  = () => {
    return(
        <ContactNavigator.Navigator 
            screenOptions = {headerOptions}
        >
            <ContactNavigator.Screen
                name = 'Contact Us'
                component = {Contact}
            />
        </ContactNavigator.Navigator>
    );
}

// drawer
// whole navigation
const MainNavigator = createDrawerNavigator();
const MainNavigatorScreen = () => {
    return (
        <MainNavigator.Navigator
            initialRouteName = 'Menu'
            drawerStyle = {{
                backgroundColor: '#D1C4E9'
            }}
        >
            <MainNavigator.Screen name='Home' component={HomeNavigatorScreen} />
            <MainNavigator.Screen name='Menu' component={MenuNavigatorScreen} />
            <MainNavigator.Screen name='About Us' component={AboutNavigatorScreen} />
            <MainNavigator.Screen name='Contact Us' component={ContactNavigatorScreen} />
        </MainNavigator.Navigator>
    );
}

class Main extends Component {

    render() {
        return (
            <NavigationContainer>
                <MainNavigatorScreen />
            </NavigationContainer>
        );
    }
}

export default Main;