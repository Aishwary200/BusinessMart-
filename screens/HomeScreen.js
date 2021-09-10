import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import * as Location from 'expo-location'
var lat
var lng
var d
export default class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasPermission: null,
            lat: '',
            lng: ''
        }
    }
    getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        this.setState({
            hasPermission: status === 'granted',
        }, () => {
            this.getLocation()
        })
    }
    getLocation = () => {
        Location.getCurrentPositionAsync(this.geoSuccess, this.geoError);
    }
    geoSuccess = (position) => {
        lat = position.coords.latitude;
        lng = position.coords.longitude;
        this.setState({
            lat: lat,
            lng: lng
        })
    }
    geoError() {
        alert("Geocoder failed.");
    }
    // Converts numeric degrees to radians
    toRad(Value) {
        return Value * Math.PI / 180;
    }
    calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = R * c;
    }
    componentDidMount() {
        var locationlat = "nearby location lat"
        var locationlng = "nearby location lat"
        this.getLocationPermission()
        this.calcCrow(lat, lng, 500, 500)
    }
    render() {
        if (d < 10) {
            return (
                <View>
                    <Text>{this.state.lat}</Text>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Text>{this.state.lng}</Text>
                </View>
            )
        }

    }
}