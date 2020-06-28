import React, { Component } from 'react';
import { View, Platform, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import FavComponent from './FavouriteComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreator';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
};
  
const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
});



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

// menu icon
const MenuIcon = (props) => {
    return(
        <Icon 
            name='menu' 
            size={24}
            color='white'
            onPress={() =>
                props.navigation.toggleDrawer()}
        />
    );
}

// menu
const MenuNavigator = createStackNavigator();
const MenuNavigatorScreen = () => {
    return (
        <MenuNavigator.Navigator
            initialRouteName = "Menu"
            screenOptions = {headerOptions}
        >
            <MenuNavigator.Screen
                name = "Menu"
                component = {Menu}
                options={
                    ({ navigation }) => ({ 
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
                />
            <MenuNavigator.Screen
                name = "DishDetail"
                component = {DishDetail}
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
                options={
                    ({ navigation }) => ({ 
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
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
                options={
                    ({ navigation }) => ({ 
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
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
                options={
                    ({ navigation }) => ({ 
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
            />
        </ContactNavigator.Navigator>
    );
}

const ReservationNavigator = createStackNavigator();
const ReservationNavigatorScreen = () => {
    return(
        <ReservationNavigator.Navigator
            screenOptions = {headerOptions}
        >
            <ReservationNavigator.Screen
                name = 'Reserve a Table'
                component = {Reservation}
                options = {
                    ({navigation}) => ({
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
            />
        </ReservationNavigator.Navigator>
    );
}

const FavoriteNavigator = createStackNavigator();
const FavoriteNavigatorScreen = () => {
    return(
        <FavoriteNavigator.Navigator
            screenOptions = {headerOptions}
        >
            <FavoriteNavigator.Screen
                name = 'Favourites'
                component = {FavComponent}
                options = {
                    ({navigation}) => ({
                        headerLeft : () => <MenuIcon navigation = {navigation}/>
                    })
                }
            />
            <FavoriteNavigator.Screen
                name = "DishDetail"
                component = {DishDetail}
                options = {{ headerTitle: "Dish Detail" }}
            />
        </FavoriteNavigator.Navigator>
    );
}

// drawer
// whole navigation
const MainNavigator = createDrawerNavigator();
function MainNavigatorScreen() {
    return(
        <MainNavigator.Navigator 
            initialRouteName = 'Menu'
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
            drawerContent={props => <CustomDrawerContentComponent {...props}/>}
        >
            <MainNavigator.Screen 
                name="Home"       
                component={HomeNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name = "Menu"       
                component={MenuNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='list'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="Reserve a Table"
                component={ReservationNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name="Favourites"
                component={FavoriteNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='home'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}
            />
            <MainNavigator.Screen 
                name="Contact Us" 
                component={ContactNavigatorScreen}
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='address-card'
                            type='font-awesome'
                            size={21}
                            color={tintColor}
                        />
                    )
                }}                
            />
            <MainNavigator.Screen 
                name="About Us"   
                component={AboutNavigatorScreen} 
                options={{
                    drawerIcon: ({tintColor}) => (
                        <Icon
                            name='info-circle'
                            type='font-awesome'
                            size={24}
                            color={tintColor}
                        />
                    )
                }}                
            />
        </MainNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
                <Image 
                    source={require('./images/logo.png')}
                    style={styles.drawerImage}
                />
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.drawerHeaderText}>
                    Ristorante Con Fusion
                </Text>
            </View>
        </View>
        <DrawerItemList {...props}/>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return (
            <NavigationContainer>
                <MainNavigatorScreen />
            </NavigationContainer>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);