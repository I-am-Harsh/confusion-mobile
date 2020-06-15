import React, { Component, useState } from 'react';
import { Text, View, ScrollView, FlatList, StyleSheet, Modal, Button  } from 'react-native';
import { Card, Icon, AirbnbRating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { postFavorite, postComment, deleteFavorite } from '../redux/ActionCreator';
import { baseUrl } from '../shared/baseUrl';

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
        if(props.fav){
            props.removeFav();
        }
        else{
            props.markFav();
        }
    }


    if (dish != null) {
        return (
            <View>
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
            </View>
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
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {item.rating}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {'---' + item.author}{' '}{item.date}
                </Text>
            </View>
        );
    }

    return (
        <Card title='Comments'>
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
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
        console.log(this.props.favorites);
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
        const dishId = this.props.route.params.dishId;
        this.props.postFavorite(dishId);
        this.toggleFav();
    }

    removeFav = () => {
        const dishId = this.props.route.params.dishId;
        this.props.deleteFavorite(dishId);
        this.toggleFav();
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return (
            <ScrollView>
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
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);