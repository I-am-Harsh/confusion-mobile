import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Card} from 'react-native-elements';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import { DISHES } from '../shared/dishes';


const RenderItem = (props) => {
    const item = props.item;
    
    if (item != null) {
        return(
            <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={require('./images/uthappizza.png')}>
                <Text
                    style={{margin: 10}}>
                    {item.description}</Text>
            </Card>
        );
    }
    else {
        return(<View></View>);
    }
}



class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES,
            leaders : LEADERS,
            comments : COMMENTS,
            promotions : PROMOTIONS
        }
    }
    render(){
        return(
            <ScrollView>
                <RenderItem item = {this.state.dishes.filter(dish => dish.featured === true)[0]}/>
                <RenderItem item = {this.state.promotions.filter(promo => promo.featured === true)[0]}/>
                <RenderItem item = {this.state.leaders.filter(leaders => leaders.featured === true)[0]}/>
            </ScrollView>
        );
    }
}


export default Home;