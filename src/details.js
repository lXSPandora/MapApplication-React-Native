/*
Luiz Fernando Sousa Camargo - 13/06/2017
Details View for the Places on the map
@flow
*/
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Text,
  Right,
  Left,
  Body,
} from 'native-base';

export default class Details extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Details',
    headerTintColor: '#FFFFFF',
    headerStyle: {
      backgroundColor: '#4286f4',
    },
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Left>
                <Icon name="map" />
                <Body>
                  <Text>
                    {params.name}
                  </Text>
                  <Text note>
                    {params.address}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {params.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Image style={styles.image} source={params.image} />
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="person" style={{ color: 'black' }} />
                <Body>
                  <Text>Owner:</Text>
                  <Text style={{ fontSize: 14 }}>
                    {params.owner}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="paper" style={{ color: 'black' }} />
                <Body>
                  <Text>Able to visit:</Text>
                  <Text style={{ fontSize: 14 }}>
                    {params.visit}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 340,
    height: 200,
  },
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
