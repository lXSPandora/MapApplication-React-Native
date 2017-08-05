/*
 * Luiz Fernando Sousa Camargo - 13/06/2017
 * A Start View for the application
 * changes:
 * 14 july of 2017 - has been added the AsyncStorage
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  AlertIOS,
  AsyncStorage,
} from 'react-native';
import {
  Button,
  Input,
  Item,
  Grid,
  Col,
  Content,
  Text,
  Label,
  Container,
  Toast,
} from 'native-base';
import * as firebase from 'firebase';
import App from './app';

const config = {
  apiKey: 'AIzaSyBI_38RKLTZ2B6aF3AWtuK-gafbM6CZsHM',
  authDomain: 'places2meet-9e002.firebaseapp.com',
  databaseURL: 'places2meet-9e002.firebaseio.com',
  storageBucket: 'gs://places2meet-9e002.appspot.com/',
};
var firebaseApp = firebase.initializeApp(config);

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.itemsRef = firebaseApp.database().ref();
  }
  static navigationOptions = {
    header: null,
  };

  componentWillMount = () => {
    AsyncStorage.getItem('login')
      .then(value => {
        login = value;
      })
      .done();
  };

  render() {
    let insert_user = username => {
      if (username === '') {
        Toast.show({
          supportedOrientations: ['portrait', 'landscape'],
          text: 'Please fill the username field to continue',
          position: 'bottom',
          buttonText: 'Okay',
        });
      } else {
        const postData = {
          username: username,
          latlng: {
            lat: '',
            long: '',
          },
        };
        try {
          // GET a Key for a new post
          let newPostKey = this.itemsRef.child('users').push().key;
          //Write the new post's data simultaneosly in the users list
          let updates = {};
          updates['/users/' + newPostKey] = postData; //posting the data to the firebase server
          AsyncStorage.setItem('login', username);
          this.props.navigation.navigate('App');
          return this.itemsRef.update(updates);
          Toast.show({
            supportedOrientations: ['portrait', 'landscape'],
            text: `Usuario inserido com sucesso`,
            position: 'bottom',
            buttonText: 'Dismiss',
          });
        } catch (e) {
          Toast.show({
            supportedOrientations: ['portrait', 'landscape'],
            text: `Oops! Ocorreu um erro durante o processamento de sua solicitação ${'\n'}Descricao do erro: ${e.message}`,
            position: 'bottom',
            buttonText: 'Okay',
          });
        }
      }
    };
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Grid style={{ alignItems: 'center' }}>
            <Col style={{ padding: 20, alignItems: 'center' }}>
              <Text
                style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center' }}
              >
                Welcome To Places2Meet{'\n'}
              </Text>
              <Text
                style={{ color: '#FFFFFF', fontSize: 16, textAlign: 'center' }}
              >
                Here's a SimpleApp to see all users location, and the people
                that are online{'\n'}
              </Text>
              <Item floatingLabel>
                <Label style={{ color: '#FFFFFF' }}>Username</Label>
                <Input
                  style={{ color: '#FFFFFF' }}
                  onChangeText={username => this.setState({ username })}
                />
              </Item>
              <Text>
                {'\n'}
              </Text>
              <Button
                block
                rounded
                primary
                onPress={() => insert_user(this.state.username)}
              >
                <Text>Lets do this!!</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4286f4',
  },
  formWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 10,
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
});
