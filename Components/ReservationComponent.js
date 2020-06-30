import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Switch, ScrollView, Button, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';

class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            "Confirm Details",
            `Number of Guests : ${this.state.guests}\n Somking : ${this.state.smoking ? "Yes" : "No"}\n Date and Time : ${this.state.date}\n`,
            [
                {
                    text : 'Cancel',
                    onPress : () => this.resetForm()
                },
                {
                    text : 'Ok',
                    onPress : () => this.resetForm()
                }
            ],
            {cancelable : false}
        )

        
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });
    }

    render() {
        return (
            <Animatable.View animation = "zoomInUp" style = {{flex : 1, marginBottom : 300}} >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColor={{true : "#512DA8"}}
                            onValueChange={(value) => this.setState({ smoking: value })}>
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                    {/* <Modal
                        animationType={'slide'}
                        transparent = {false}
                        visible = {this.state.showModal}
                        onDismiss = {() => {this.toggleModal; this.resetForm}}
                        onRequestClose = {() => {this.toggleModal; this.resetForm}}
                    >
                        <View style = {styles.modal}>
                            <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button 
                                onPress = {() =>{this.toggleModal()}}
                                color="red"
                                title="Edit" 
                            />
                            <Button 
                                onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                color="#512DA8"
                                title="Close" 
                            />
                        </View>
                    </Modal> */}
            </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 1
    },
    formItem: {
        flex: 1
    },
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
});



export default Reservation;