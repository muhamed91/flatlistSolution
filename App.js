import * as React from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default class App extends React.Component {
 
  state = {
    isLoading:true,
    data: []
  }

  fetchData = async () => {
    const response = await fetch('https://literaturaislame.com/wp-json/wp/v2/posts');

    const posts = await response.json();

    this.setState({
      isLoading: true,
      data: posts
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  

  render() {


      return (
        <View style={styles.container}>
          <Text>Hallo</Text>
          <FlatList
            data={this.state.data}
            renderItem={({item})=> <Text>{item.content.rendered.replace(/<\/?[^>]+(>|$)/g, "")}</Text>}
          />
        </View>
      );

  }
}

const styles = StyleSheet.create({
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
