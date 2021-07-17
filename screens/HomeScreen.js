import React, { Component } from 'react'
import { View, Text } from 'react-native'
var lat
var lng
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: '',
            lng: ''
        }
    }
    getLocationPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND)
        this.setState({
            hasPermission: status === 'granted',
        }, () => {
            this.getLocation()
        })
    }
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);

        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    geoSuccess = (position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.setState({
            lat: lat,
            lng: lng
        })
    }
    geoError() {
        alert("Geocoder failed.");
    }
    componentDidMount() {
        this.getLocationPermission()
    }
    render() {
        return (
            <View>
                <Text>latitude: {this.state.lat}</Text>
                <Text>longitude: {this.state.lng}</Text>
            </View>
        )
    }
}