/*
Luiz Fernando Sousa Camargo - 13/06/2017
MapView for the application
@flow
*/
import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps'; //importing the maps lib
import { Toast } from 'native-base'; //getting some components from the native-base lib
import data from './data/data.js';
var login;


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0,
      },
    }
  }

  watchID: ?number = null;

  componentDidMount = () => {
    AsyncStorage.getItem("username").then((value) => {
      this.setState({"username": value});
    }).done();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // getting the user`s current coords
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        console.log(lat);
        console.log(long);
        this.setState({initialPosition: initialRegion }); //changing the initialPosition state
        this.setState({markerPosition: initialRegion }); //changing the markerPosition state
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
      this.setState({initialPosition: lastRegion});
      this.setState({markerPosition: lastRegion});
    });
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  static navigationOptions = {
    title: 'Places2Meet',
    headerTintColor: '#FFFFFF',
    headerLeft: null,
    headerStyle: {
        backgroundColor: '#4286f4',
    }
  };
  render(props) {
    const {navigate} = this.props.navigation;
    return (
      //Zooming into user location
      <MapView
        style={styles.map}
        region={this.state.initialPosition}>

        <MapView.Marker // setting user marker on the map view
          title={this.state.username}
          coordinate={this.state.markerPosition}>
          <View style={styles.radius}>
            <View style={styles.marker}>
            </View>
          </View>
        </MapView.Marker>

      {data.map((places, i) =>( //setting up all the markers
        <MapView.Marker
          key={i}
          coordinate={places.latlng}
          title={places.name}
          description={places.address}
          onPress={() => navigate('Details', { // on click the marker pass to another view + params
            name: places.name,
            description: places.description,
            address: places.address,
            visit: places.visit,
            how: places.how,
            image: places.image,
            icon: places.icon,
            owner: places.owner
          })}
        />
      ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
