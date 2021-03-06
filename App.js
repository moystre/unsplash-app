import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      // Setting the loading to 'true' on default
      isLoading: true,
      images: []
    };
    this.loadImages = this.loadImages.bind(this);
    // this.renderItem = this.renderItem.bind(this);
  }

  // Fetching images
  loadImages() {
    // Using Unsplash Endpoint with max of 30 images
    axios.get('https://api.unsplash.com/photos/random?count=30&client_id=r9QQ5ZdF7Qp7E4gFNDxRfKAZQ07Ag4i_B-RA1mooxkc')
      .then(function (response) {
        console.log(response.data);
        // Once the data is retrieved, the state needs to be updates and loader hidden
        this.setState({ images: response.data, isLoading: false });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log('request completed');
      });
  }

  // When the app starts running the images will be fetched from Unsplash API
  componentDidMount() {
    this.loadImages()
  }

  renderItem = ({ item }) => {
    return (
      // The View gets the dimensions of the device 
      <View style={{ height, width }}>
        <Image
          // Image will automatically style according to the parent element
          style={{ flex: 1, height: null, width: null }}
          source={{ uri: item.urls.regular }}
          resizeMode="cover"
        />
      </View>
    );
  }

  render() {
    // The loader will only be displayed when isLoading is 'true'
    return this.state.isLoading ? (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="large" color="blue" />
      </View>
    ) :
      // When loading is completed the items are passed to the FlatList
      (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          <FlatList
            horizontal
            // Paging enabled for swiping each image separately
            pagingEnabled
            data={this.state.images}
            // Passing each item to the FlatList
            renderItem={this.renderItem}
          />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
