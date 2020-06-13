import React, { Component } from 'react';
import {Card, ListItem, Header} from 'react-native-elements'
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
}

const History = (props) => {
    return(
        <View>
            <Card title='Our History'>
                <Text>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                    With its unique brand of world fusion cuisine that can be found nowhere else, 
                    it enjoys patronage from the A-list clientele in Hong Kong.  
                    Featuring four of the best three-star Michelin chefs in the world, 
                    you never know what will arrive on your plate the next time you visit us.
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, 
                    Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                </Text>
            </Card>
            <Card title='Corporate Leadership'>
                {
                    props.leaders.leaders.map((leader, index) => {
                        return(
                            <ListItem 
                                key = {index}
                                leftAvatar={{source: {uri: baseUrl + leader.image}}}
                                title = {leader.name}
                            />
                        );
                    })
                }
            </Card>
        </View>
    );
}

class About extends Component{
    render(){
        if(this.props.leaders.isLoading){
            return(
                <Loading/>
            );
        }
        else if(this.props.leaders.errMess){
            return(
                <View>
                    <Text>
                        {this.props.leaders.errMess}
                    </Text>
                </View>
            );
        }
        else{
            console.log(this.props.leaders);
            return(
                <History leaders = {this.props.leaders}/>
            );
        }
    }
}

export default connect(mapStateToProps)(About);