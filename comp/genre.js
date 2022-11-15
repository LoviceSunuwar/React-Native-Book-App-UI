import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TextInput, StatusBar, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    title: 'Fantasy',
    imglink: 'https://img.freepik.com/premium-vector/cute-dragon-flying-cartoon-icon-illustration-animal-fantasy-icon-concept-premium-cartoon-style_138676-1772.jpg?w=2000',
  },
  {
    id: '2',
    title: 'Adventure',
    imglink: 'https://cdn-icons-png.flaticon.com/512/5778/5778250.png',
  },
  {
    id: '3',
    title: 'Romance',
    imglink: 'https://cdn-icons-png.flaticon.com/512/2904/2904973.png',
  },
  {
    id: '0',
    title: 'Mystery',
    imglink: 'https://cdn-icons-png.flaticon.com/512/2040/2040703.png',
  },
  {
    id: '4',
    title: 'Horror',
    imglink: 'https://static.thenounproject.com/png/4185227-200.png',
  },
  {
    id: '5',
    title: 'Thriller',
    imglink: 'https://cdn3.vectorstock.com/i/1000x1000/67/52/thriller-book-icon-flat-style-vector-34226752.jpg',
  },
  {
    id: '6',
    title: 'Paranormal',
    imglink: 'https://cdn-icons-png.flaticon.com/512/2472/2472929.png',
  },
  {
    id: '7',
    title: 'Fiction',
    imglink: 'https://cdn-icons-png.flaticon.com/512/2178/2178098.png',
  },
  {
    id: '8',
    title: 'Humor',
    imglink: 'https://cdn-icons-png.flaticon.com/512/3079/3079197.png',
  },
  {
    id: '9',
    title: 'Art',
    imglink: 'https://cdn-icons-png.flaticon.com/512/178/178390.png',
  },
  {
    id: '10',
    title: 'History',
    imglink: 'https://cdn-icons-png.flaticon.com/512/2132/2132336.png',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const GenreComponent = ({navigate, navigation}) => {

  
  const renderItem = ({ item , index}) => (
   <TouchableOpacity
   onPress={() => 
  navigation.navigate('GenreList')
  } 
   >
     <View style={{flexDirection:'row'}}>
        <Image style={{height:50,width:50}} source={{uri: item.imglink}} /> 
        <Item title={item.title} />

    </View>
   </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 30 : null
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Search Knowledge"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                            />
                        </View>
                    </View>
                    
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: 'powderblue',
    padding: 20,
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default GenreComponent;