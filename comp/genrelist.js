import React, { Component } from 'react';

import firebase from '../config';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// const { height, width } = Dimensions.get('window')
class GenreList extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('books');
    this.state = {
      isLoading: true,
      books: []
    };
  }

//   renderItem = ({item, index}) => {

//   }


  

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((res) => {
      const { book_name,
        author_name,
        publi_name,
        description,
        book_price,
        book_year,
        book_genre,
        book_hot,
    book_image } = res.data();
      books.push({
        key: res.id,
        book_name,
        author_name,
        publi_name,
        description,
        book_price,
        book_year,
        book_genre,
        book_hot,
        book_image
      });
    });
    this.setState({
      books,
      isLoading: false
   });
  }


  // sortCollection = (querySnapshot) => {
  //   const students = [];
  //   // querySnapshot.orderBy("lname");
  //   querySnapshot.forEach((res) => {
  //     const { name,lname, designation } = res.data().orderBy("lname");
  //     students.push({
  //       key: res.id,
  //       name,
  //       lname,
  //       designation
  //     });
  //   });
  //   this.setState({
  //     students,
  //     isLoading: false
  //  });
  // }

  



  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }    
    return (


<SafeAreaView>
<View  >
        
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
                    
        {/* <ScrollView 
        scrollEventThrottle={16}>
            <View style = {{flex: 1, backgroundColor: 'powderblue', paddingTop: 5}}>
               <Text style = {{fontSize: 24, fontWeight: '700', paddingHorizontal: 20}}> Hot Selling Books, Right Now.</Text>

               <View  style ={{backgroundColor: 'powderblue'}}>
               
                <ScrollView 
                horizontal = {true}
                showsHorizontalScrollIndicator={false}
                
                >
                {
                    this.state.books.map((res, x) => {
                        if (res.book_hot == "Yes"){
                            return (
                                <ListItem 
                                
                                key={x} 
                                onPress={() => {
                                   this.props.navigation.navigate('DetailsComponent', {
                                     userkey: res.key
                                   });
                                 }}                   
                                bottomDivider>
    
                                 
                                    <ListItem.Content style={{height:200, width: 170,paddingLeft:10, paddingRight:10 ,color: 'grey', borderRadius: 15, borderRightColor: 'black', borderStartWidth: '5', backgroundColor: 'skyblue'}}
                                 >
                                    <Avatar style={{height:80, width:"100%", justifyContent:'center',paddingHorizontal: 10, paddingTop:10}} 
                                    source={{uri:'http://universe.byu.edu/wp-content/uploads/2015/01/HP4cover.jpg'}}/>
                                    <ListItem.Title style = {{justifyContent:'center',fontSize: 15, fontWeight: '700', paddingHorizontal: 20}}>{res.book_name}</ListItem.Title>
                                    <ListItem.Subtitle style = {{justifyContent:'center',fontSize: 12, fontWeight: '600', paddingHorizontal: 40}}>{'$ ' + res.book_price}</ListItem.Subtitle>
                                    <ListItem.Subtitle style = {{justifyContent:'center',fontSize: 10, fontWeight: '600', paddingHorizontal: 40}}>{res.author_name}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    </ListItem> 
                            );
                        }
                        else {
                            console.log("No hot books available")
                        }
                     
                    })
                }

                </ScrollView>
                
               </View>
            </View>
        </ScrollView> */}
        <View>
            {this.state.books.map((res,i) => {
                return(
                    <FlatList 
                    style = {{ width: '100%',color:'red',marginRight:10, backgroundColor:'powderblue'}}
                    data={this.state.books}
                    numColumns = {2}
                    renderItem = {({item, index}) => (
                    <TouchableOpacity 
                    style = {{height:200, width:'50%', color:'red',marginRight:10,marginBottom:5, justifyContent:'center', borderColor:'black', borderWidth: 2, paddingBottom:10, borderRadius:10}}
                    key={i}
                    onPress={() => {
                        this.props.navigation.navigate('DetailsFlatComponent', {
                          userkey: res.key
                        });
                      }}   
                //    keyExtractor={(item) => item.id.toString()}
                    //key = {item.id}
                   // keyExtractor = {(res, i) => i}
                   // onPress={()=> this.props.navigation.navigate('DetailsFlatComponent', {item})}
                    // onPress={() => {
                    //     this.props.navigation.navigate('DetailsFlatComponent', {
                    //       id: item.id
                    //     });
                    //   }} 
                   // key={item.id}
                    // onPress={() => {
                    //     this.props.navigation.navigate('DetailsFlatComponent', {
                    //       id: item.id
                    //     });
                    //   }} 
                    >
                        <View 
                    
                    >
                        <Avatar style={{height:'75%'}} source={{uri:item.book_image}}></Avatar>
                        <Text>{item.book_name}</Text>
                        <Text>{item.book_price}</Text>
                        <Text>{item.book_genre}</Text>
                        
                    </View>
                    </TouchableOpacity>)
                    }
                    
                    >
        
                    </FlatList>
                )
            })}
        
        </View>

        {/* <View style={{color: 'skyblue'}}>
        <ScrollView style={styles.wrapper}>
          {
            this.state.books.map((res, i) => {
            
              return (
                
                <ListItem 
                   key={i} 
                   onPress={() => {
                      this.props.navigation.navigate('UpdateComponent', {
                        userkey: res.key
                      });
                    }}                   
                   bottomDivider>
                    
                  <ListItem.Content>
                    <ListItem.Title>{'Title:- ' + res.book_name}</ListItem.Title>
                    <ListItem.Title>{'Year:- ' +res.book_year}</ListItem.Title>
                    <ListItem.Title>{'Price:- ' +res.book_price}</ListItem.Title>
                    <ListItem.Title>{'Status:- ' +res.book_hot}</ListItem.Title>
                    <ListItem.Title>{'Genre:- ' +res.book_genre}</ListItem.Title>
                    <ListItem.Subtitle>{'Author:- ' +res.author_name}</ListItem.Subtitle>
                    <ListItem.Subtitle>{'Publisher:- ' +res.publi_name}</ListItem.Subtitle>
                    <ListItem.Subtitle>{'Description:- ' +res.description}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron 
                     color="black" 
                  />
                  
                </ListItem>
              );
            })
          }
            <Button
            title='Sort'
            onPress={()=> this.sortCollection}
            color="black"
          />
      </ScrollView>
        </View> */}
      </View>
</SafeAreaView>
        
     
    );
  }
}

const styles = StyleSheet.create({
//   wrapper: {
//    flex: 1,
//    paddingBottom: 800
   
//   },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export default GenreList;