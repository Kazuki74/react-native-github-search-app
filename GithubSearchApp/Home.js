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
      refreshing: false,
    };
  }
  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.state.page + 1;
    const url = `https://api.github.com/search/repositories?q=react&page=${newPage}`
    console.log(newPage)
    fetch(url)
    .then(response => response.json())
    .then(({items}) => {
      if (refreshing){
        this.setState({ items, refreshing:false });
      } else {
        this.setState({ items: [...this.state.items, ...items], page: newPage, refreshing:false })
      }
      }
    )
  }
  navigateToDetail(item) {
    this.props.navigation.navigate('Detail', {item})
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.items}
          renderItem={({item, index}) =>
            <TouchableOpacity onPress={() => this.navigateToDetail(item)}>
              <Text style={styles.text}>{item.full_name}</Text>
            </TouchableOpacity>
          }
          keyExtractor={(item) => `${item.id}`}
          onEndReached={() => this.fetchRepositories()}
          onEndReachedThreshold={0.1}
          onRefresh={() => {this.fetchRepositories(true)}}
          refreshing={this.state.refreshing}
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
  },
  text: {
    margin: 20,
  }
});
