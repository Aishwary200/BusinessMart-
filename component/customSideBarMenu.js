import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';

export default class CustomSideBarMenu extends Component {
    constructor() {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            name: '',
            image: '#',
            docId: ''
        }
    }
    fetchImage = (imageName) => {
        var storageRef = firebase.storage().ref().child("user_profiles" + imageName)
        storageRef.getDownloadURL().then((uri) => {
            this.setState({
                image: uri
            })
        })
            .catch((error) => {
                this.setState({
                    image: '#'
                })
            })
    }
    getUserProfile = () => {
        db.collection('users').where('email_id', '==', this.state.userId)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.setState({
                        name: doc.data().first_name + ' ' + doc.data().last_name
                    })
                })
            })
    }
    uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child('user_profiles/' + imageName);
        return ref.put(blob).then((response) => {
            this.fetchImage(imageName)
        })
    }
    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })
        if (!cancelled) {
            this.uploadImage(uri, this.state.userId)
        }
    }
    componentDidMount() {
        this.fetchImage(this.state.userId)
        this.getUserProfile()
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Avatar rounded source={{ uri: this.state.image }} size='medium' onPress={() => {
                        this.selectPicture();
                    }} containerStyle={styles.imageContainer} showEditButton
                    />
                    <Text style={{ fontWeight: '100', fontSize: 20, paddingTop: 10 }}>{this.state.name}</Text>
                </View>
                <View style={styles.drawerItemsContainer}>
                    <DrawerItems {...this.props} />
                </View>
                <View style={styles.logOutContainer}>
                    <TouchableOpacity style={styles.logOutButton}
                        onPress={() => {
                            this.props.navigation.navigate('SignUpLoginScreen')
                            firebase.auth().signOut()
                        }}>
                        <Text style={styles.logOutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerItemsContainer: {
        flex: 0.8
    },
    logOutContainer: {
        flex: 0.2,
        justifyContent: 'flex-end',
        paddingBottom: 30
    },
    logOutButton: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        padding: 10
    },
    logOutText: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})