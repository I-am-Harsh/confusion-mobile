import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import {ListItem} from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {deleteFavorite} from '../redux/ActionCreator';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    render() {

        const { navigate } = this.props.navigation;
        
        const renderMenuItem = ({item, index}) => {
            const rightButton = [
                {
                    text: 'Delete', 
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                            [
                                { 
                                    text: 'Cancel', 
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            { cancelable: false }
                        );
                        
                    }
                }
            ]
            return (
                
                    <Swipeout right = {rightButton} autoClose>
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => navigate('DishDetail', { dishId: item.id })}
                            leftAvatar={{ source: {uri: baseUrl + item.image}}}
                        />
                    </Swipeout>
            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>            
                    <Text>Error : {this.props.dishes.errMess}</Text>
                </View>            
            );
        }
        else {
            if(this.props.favorites.length){
                return (
                    <Animatable.View animation="fadeInRightBig" duration={2000}>                
                        <FlatList 
                            data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                            renderItem={renderMenuItem}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Animatable.View>
                );
            }
            else{
                return(
                    <View style = {{margin : 30,alignItems : 'center'}}>
                        <Text style = {{fontSize : 20, fontWeight : 'bold'}}>
                            Please go to menu to add favorites.
                        </Text>
                    </View>
                );
            }
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Favorites);