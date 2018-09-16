import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  AppState,
} from 'react-native';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      items: [],
      page: 0,
      refreshing: false,
      text: "",
    };
  }
  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.state.page + 1;
    const url = `https://api.github.com/search/repositories?q=${this.state.text}&page=${newPage}`
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

  componentDidMount() {
    AppState.addEventListener('change', this.onChangeState);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.onChangeState);
  }

  onChangeState = (appState) => {
    if (appState === 'active') {
      this.fetchRepositories(true)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({text})}/>
          <TouchableOpacity onPress={() => this.fetchRepositories(true)}>
            <Text style={styles.searchText}>search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.items}
          renderItem={({item, index}) =>
            <TouchableOpacity style={styles.searchResult} onPress={() => this.navigateToDetail(item)}>
              <Text style={styles.itemName}>{item.full_name}</Text>
              <View style={styles.ownerData}>
                <Image
                  source={{ uri: item.owner.avatar_url }}
                  style={styles.ownerIcon}
                />
                <Text style={styles.ownerName}>{item.owner.login}</Text>
              </View>
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
  inputWrapper: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
  },
  searchText: {
    padding: 10,
    backgroundColor: '#000',
    color: '#FFF',
  },
  searchResult:{
    padding: 10,
  }
  ,
  ownerData: {
    flexDirection: 'row',
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
