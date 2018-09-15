import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default ({navigation}) => console.log(navigation) || <Text>{navigation.state.params.item.full_name}</Text>