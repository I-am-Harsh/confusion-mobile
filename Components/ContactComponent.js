import React from 'react';
import { Card, Button, Icon } from 'react-native-elements'
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import * as MailComposer from 'expo-mail-composer';



const Contact = () => {
    sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    return (
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title='Contact Information' titleStyle={{ textAlign: 'center' }}>
                <Text>
                    121, Clear Water Bay Road
                </Text>
                <Text>Clear Water Bay, Kowloon</Text>
                <Text>HONG KONG</Text>
                <Text>Tel: +852 1234 5678</Text>
                <Text>Email:confusion@food.net</Text>
                <Text>Fax: +852 8765 4321</Text>
                <Button
                    title="Send Email"
                    buttonStyle={{ backgroundColor: "#512DA8" }}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={this.sendMail}
                />
            </Card>
        </Animatable.View>
    );
}

export default Contact;