import React, { Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import db from '../config'
import firebase from 'firebase'
var gstCheck = false

export default class sellerSignUp extends Component {
    constructor() {
        super()
        this.state = {
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            companyName: '',
            confirmPassword: '',
            GST: ''
        }
    }
    userSignUp = (emailId, password, confirmPassword, gst) => {
        var reggst = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
        if (password !== confirmPassword) {
            return Alert.alert("Password and Confirm password does not match check the password")
        }
        else if (!reggst.test(gst) && reggst != '') {
            alert('GST Identification Number is not valid. It should be in this "11AAAAA1111Z1A1" format');
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    this.props.navigation.navigate('HomeScreen')
                    db.collection('users').add({
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        contact_number: this.state.contact,
                        address: this.state.address,
                        companyName: this.state.companyName,
                        gst: this.state.GST
                    })
                })
                .catch(function (error) {
                    var errorCode = error.code
                    var errorMessage = error.message
                    return Alert.alert(errorMessage)
                })
        }
    }
    render() {
        return (
            <View style={styles.modalContainer}>
                <ScrollView style={{ width: '100%' }}>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                        <Text style={styles.modalTitle}>Registration</Text>
                        <TextInput style={styles.formTextInput} placeholder="First name"
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Last name"
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Address"
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    address: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="abc@example.com"
                            keyboardType='email-address'
                            onChangeText={(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Comapny Name"
                            onChangeText={(text) => {
                                this.setState({
                                    companyName: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="GST Number"
                            maxLength={15}
                            onChangeText={(text) => {
                                this.setState({
                                    GST: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Enter password"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                        <TextInput style={styles.formTextInput} placeholder="Confirm password"
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState({
                                    confirmPassword: text
                                })
                            }}
                        />
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.registerButton}
                                onPress={() => this.userSignUp(
                                    this.state.emailId, this.state.password, this.state.confirmPassword, this.state.GST
                                )}>
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity style={styles.cancelButton}
                                onPress={() =>
                                    this.props.navigation.navigate('WelcomeScreen')
                                }>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8BE85', alignItems: 'center', justifyContent: 'center' },
    profileContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', },
    title: {
        fontSize: 65, fontWeight: '300', paddingBottom: 30, color: '#ff3d00'
    },
    loginBox: {
        width: 300, height: 40, borderBottomWidth: 1.5, borderColor: '#ff8a65', fontSize: 20, margin: 10, paddingLeft: 10
    },
    KeyboardAvoidingView: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    modalTitle: {
        justifyContent: 'center', alignSelf: 'center', fontSize: 30, color: '#ff5722', margin: 50
    },
    modalContainer: {
        flex: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
        backgroundColor: "#ffff", marginRight: 30, marginLeft: 30, marginTop: 80, marginBottom: 80,
    },
    formTextInput: {
        width: "75%", height: 35, alignSelf: 'center', borderColor: '#ffab91',
        borderRadius: 10, borderWidth: 1, marginTop: 20, padding: 10
    },
    registerButton: {
        width: 200, height: 40, alignItems: 'center', justifyContent: 'center',
        borderRadius: 10, marginTop: 30
    },
    registerButtonText: { fontSize: 15, fontWeight: 'bold' },
    cancelButton: { width: 200, height: 30, justifyContent: 'center', alignItems: 'center', marginTop: 20, },
    button: {
        width: 300,
        height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 25,
        backgroundColor: "#ff9800",
        shadowOffset: { width: 0, height: 8, },
        shadowOpacity: 0.30,
        shadowRadius: 10.32, elevation: 16,
        marginTop: 20
    },
    buttonText: { color: '#ffff', fontWeight: '200', fontSize: 20, marginTop: -20 }
})