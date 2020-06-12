import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {Card} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}
const RenderItem = (props) => {
    const item = props.item;
    if(props.isLoading){
        return(
            <Loading/>
        );   
    }
    else if(props.errMess){        
        return(
            <View style={{alignContent : 'center'}}>
                <Text>
                    {props.errMess}
                </Text>
            </View>
        );
    }
    else{
        if (item != null) {
            return(
                <Card
                    featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: window.location.hostname+":9000/" + item.image}}>
                    <Text
                        style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(
                <View>
                    <Text>
                        There is nothing to show at the moment.
                    </Text>
                </View>
            );
        }
    }
}



class Home extends Component {
    render(){
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} />
            </ScrollView>
        );
    }
}


export default connect(mapStateToProps)(Home);