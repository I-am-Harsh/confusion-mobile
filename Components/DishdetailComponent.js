import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, AirbnbRating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite, postComment, deleteFavorite } from '../redux/ActionCreator';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    deleteFavorite : (dishId) => dispatch(deleteFavorite(dishId))
});



const style = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 50
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

function RenderDish(props) {
    const dish = props.dish;

    const toggleFav = () => {
        console.log("Fav called", props.fav);
        if(props.fav){
            props.removeFav();
        }
        else{
            props.markFav();
        }
    }

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return "add";
        else if(dx < 100){
            return "remove";
        }
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            const dragType = recognizeDrag(gestureState)
            if (dragType === 'add')
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => toggleFav()},
                    ],
                    { cancelable: false }
                );
            else if(dragType === 'remove'){
                console.log("Remove fav : ", props.fav);
                if(props.fav){
                    Alert.alert(
                        'Remove Favorite',
                        'Are you sure you wish to remove ' + dish.name + ' from favorite?',
                        [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => toggleFav()},
                        ],
                        { cancelable: false }
                    );
                }
                else{
                    Alert.alert(
                        'Not a  Favorite',
                        'Dish ' + dish.name + ' is not added to favourites',
                        [
                            {text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                        ],
                        { cancelable: false }
                    );
                }
            }
            return true;
        }
    })


    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View style={
                        {
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }>
                        <Icon
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => toggleFav()}
                        />
                        <Icon
                            reverse
                            name='comment'
                            type='material'
                            color='#512DA8'
                            onPress = {() => props.toggleModal()}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return (<View></View>);
    }
}


const RenderComment = (props) => {
    const comments = props.comments

    const renderCommentItem = ({ item, index }) => {
        return (
            <ScrollView key={index} style={{ margin: 10, flexGrow : 1 }} >
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {item.rating}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {'---' + item.author}{' '}{item.date}
                </Text>
            </ScrollView>
        );
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000} style={{flexGrow : 1 }}>
            <Card title='Comments'>
                <FlatList data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    style = {{flexGrow : 1}}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            showModal : false,
            author : String,
            rating : 5,
            comment : String
        }
    }

    componentDidMount(){
        const dishId = this.props.route.params.dishId;
        if(this.props.favorites.indexOf(dishId) >=0){
            this.setState({
                favorite : true
            })
        }
    }

    toggleModal = () => {
        this.setState({
            showModal : !this.state.showModal
        })
    }

    toggleFav = () => {
        this.setState({
            favorite: !this.state.favorite
        })
    }

    submitComment = (dishId) => {
        console.log('posted');
        console.log(dishId);
        console.log(this.state.comment);
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
    }

    markFav = () => {
        console.log("markFav called");
        const dishId = this.props.route.params.dishId;
        this.props.postFavorite(dishId);
        this.toggleFav();
    }

    removeFav = () => {
        console.log("removing fav");
        const dishId = this.props.route.params.dishId;
        this.props.deleteFavorite(dishId);
        this.toggleFav();
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <View>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    markFav={this.markFav}
                    favorite={this.state.favorite}
                    toggleModal = {this.toggleModal}
                    removeFav = {this.removeFav}
                    fav = {this.state.favorite}
                />
                <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent = {false}
                    visible = {this.state.showModal}
                    onRequestClose = {() => this.toggleModal()}
                >
                    <View style = {{marginTop : 45, marginLeft : 10}}>
                        <Text style = {{textAlign:'center', fontSize : 25}}>
                            Please rate the dish and post your comment
                        </Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible","Meh", "OK", "Good","Amazing"]}
                            size={40}
                            onFinishRating = {(rating) => this.setState({rating : rating})}
                            defaultRating = {5}
                        />
                        <Text style={{marginTop : 15, marginBottom : 20, fontSize : 20}}>
                            Please type your comment below
                        </Text>
                        <Input placeholder = 'Your name' 
                            onChangeText = {(text) => this.setState({author : text})}
                        />
                        <Input placeholder = 'Your comment' 
                            onChangeText = {(text) => this.setState({comment : text})}
                        />
                        <View style = {{flexDirection : 'row' ,justifyContent: "center"}}>
                            <Button 
                                onPress = {() => this.submitComment(dishId)}
                                color = "#512DA8"
                                title = "Post"
                            />
                            <Button 
                                onPress = {() => this.toggleModal()}
                                color = "red"
                                title = "Close" 
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);