import React from 'react';
import {Card, Header} from 'react-native-elements'
import { Text, View } from 'react-native';

const Contact = () => {
    return(
        <View>
            <Card title = 'Contact Information' titleStyle={{textAlign :'center'}}>
                <Text>
                    121, Clear Water Bay Road
                </Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Email:confusion@food.net</Text>
                <Text>Fax: +852 8765 4321</Text>
            </Card>
        </View>
    );
}

export default Contact;