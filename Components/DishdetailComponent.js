import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { postFavourites } from '../redux/ActionCreator';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favourites : state.favourites
    }
  }

function RenderDish(props) {

    const dish = props.dish;
    if (dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>    
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}

const RenderComment = (props) => {
    const comments = props.comments

    const renderCommentItem = ({item, index}) => {
        return(
            <View key = {index} style ={{margin : 10}}>
                <Text style={{fontSize : 14}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize : 12}}>
                    {item.rating}
                </Text>
                <Text style={{fontSize : 12}}>
                    {'---' + item.author}{' '}{item.date}
                </Text>
            </View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList data = { comments }
                renderItem = { renderCommentItem }
                keyExtractor = {item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favourite={this.state.favourites.some(el => el === dishId)}
                    onPress={() => this.markFavourite(dishId)} 
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps)(DishDetail);