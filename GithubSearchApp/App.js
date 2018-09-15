import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      items: [],
      page: 0,
    };
  }
  fetchRepositories() {
    const newPage = this.state.page + 1;
    const url = `https://api.github.com/search/repositories?q=react&page=${newPage}`
    console.log(newPage)
    fetch(url)
    .then(response => response.json())
    .then(({items}) => {
        this.setState({ items: [...this.state.items, ...items], page: newPage})
      }
    )
  }
  render() {
    console.log(this.state.items)
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({item, index}) => <Text style={styles.text}>{item.name}</Text>}
          keyExtractor={(item) => `${item.id}`}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
        >
        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  text: {
    margin: 20,
  }
});
