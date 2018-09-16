import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

export default class Detail extends React.Component {
	render() {
		const { navigation: {state: {params: {item}}} } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.repoName}>{item.full_name}</Text>
				<Text styles={styles.ownerData}>
					<Image
						style={styles.ownerIcon}
						source={{ uri: item.owner.avatar_url }}
					/>
					<Text style={styles.ownerName}>{item.owner.login}</Text>
				</Text>
				<Text style={styles.description}>{item.description}</Text>
				<Text style={styles.repoUrl}>{item.url}</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: 'white',
	},
	repoName: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
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
	repoUrl: {
		marginTop: 10,
	},
	description: {
		paddingTop: 10,
	},
})
