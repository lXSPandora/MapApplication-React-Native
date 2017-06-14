/*
Luiz Fernando Sousa Camargo - 13/06/2017
MapView for the application
@flow
*/
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Image,
  View,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps'; //importing the maps lib

// Data used on the application
const data = [
  {
    name: 'Pier 39',
    owner: 'State of San Francisco',
    description: 'Pier 39 is a shopping center and popular tourist attraction built on a pier in San Francisco, California. At Pier 39, there are shops, restaurants, a video arcade, street performances and etc...',
    visit: 'Open to the public',
    address: 'Beach Street & The Embarcadero, San Francisco, CA 94133, United States',
    image: require('./img/pier.png'),
    latlng: {
      latitude: 37.808676,
      longitude: -122.409825,
    },
  },
  {
    name: 'Golden Gate',
    owner: 'State of San Francisco',
    description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate strait, the one-mile-wide, one-point-seven-mile-long channel between San Francisco Bay and the Pacific Ocean.',
    visit: 'Open to the public',
    address: 'Golden Gate Bridge, San Francisco, CA, USA',
    image: require('./img/goldengate.png'),
    latlng: {
      latitude: 37.8199328,
      longitude: -122.4804438,
    },
  },
  {
    name: 'Alcatraz',
    owner: 'State of San Francisco',
    description: 'Alcatraz Island is located in San Francisco Bay, 1.25 miles (2.01 km) offshore from San Francisco, California, United States. The small island was developed with facilities for a lighthouse, a military fortification, a military prison (1868), and a federal prison from 1934 until 1963.',
    visit: 'Open to the public',
    address: 'San Francisco, CA 94133, USA',
    image: require('./img/alcatraz.png'),
    latlng: {
      latitude: 37.8269775,
      longitude: -122.4229555,
    },
  },
  {
    name: 'Facebook HQ',
    owner: 'Facebook Inc.',
    description: 'The new Facebook headquarters looks like a cross between high-art, 21st century corporate thinking and a child`s candy-fueled daydream.',
    visit: 'Only at events',
    address: '1 Hacker Way, Menlo Park, CA 94025, USA',
    image: require('./img/facebook.png'),
    latlng: {
      latitude: 37.4843857,
      longitude: -122.1476721,
    },
  },
  {
    name: 'Google Campus',
    owner: 'Google Inc.',
    description: 'The Google Campus is one of the most famous technology campus in the world because of he minimalistic construction. Its a nice place to meet and see how the people at google works and know more things about the google company',
    visit: 'Open to the public',
    address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
    image: require('./img/google.png'),
    latlng: {
      latitude: 37.4201197,
      longitude: -122.0883069,
    },
  },
  {
    name: 'Apple Campus',
    owner: 'Apple Inc.',
    description: 'The Apple Campus is the corporate headquarters of Apple Inc., located at Cupertino, California, United States. Its design resembles that of a university, with the buildings arranged around green spaces, similar to a suburban business park.',
    visit: 'Open to the public',
    address: '19111 Pruneridge Ave, Cupertino, CA 95014, USA',
    image: require('./img/apple.png'),
    latlng: {
      latitude: 37.3402493,
      longitude: -122.0397761,
    },
  },
];

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
      }
    }
  }

  watchID: ?number = null;

  componentDidMount = () => {
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
