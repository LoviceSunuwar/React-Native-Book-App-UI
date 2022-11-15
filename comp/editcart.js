import React, { Component } from 'react';

import firebase from '../config';
import { Alert, Button, ActivityIndicator, View, StyleSheet, TextInput, ScrollView, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class Editcart extends Component {
  constructor() {
    super();
    this.state = {
      book_name: '',
      author_name: '',
      publi_name:'',
      description: '',
      book_price:'',
      book_year:'',
      book_genre:'',
      book_hot:'',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const docRef = firebase.firestore().collection('books').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          book_name: user.book_name,
          lbook_name: user.book_name,
          author_name: user.author_name,
          publi_name:user.publi_name,
          description: user.description,
          book_price: user.book_price,
          book_year: user.book_year,
          book_genre: user.book_genre,
          book_hot: user.book_hot,
          isLoading: false
        });
      } else {
        console.log("No Books found.");
      }
    });
  }
  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  editBook() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = firebase.firestore().collection('books').doc(this.state.key);
    docUpdate.set({
      book_name: this.state.book_name,
        author_name: this.state.author_name,
        publi_name:this.state.publi_name,
        description: this.state.description,
        book_price:this.state.book_price,
        book_year:this.state.book_year,
        book_genre:this.state.book_genre,
        book_hot:this.state.book_hot,
    }).then((docRef) => {
      this.setState({
          book_name: '',
          author_name: '',
          publi_name:'',
          description: '',
          book_price:'',
          book_year:'',
          book_genre:'',
          book_hot:'',
        isLoading: false,
      });
      this.props.navigation.navigate('ReadComponent');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteBook() {
    const docRef = firebase.firestore().collection('books').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
          console.log('Doc deleted.')
          this.props.navigation.navigate('ReadComponent');
      })
  }

  alertDialog=()=>{
    Alert.alert(
      'Delete',
      'Really?',
      [
        {text: 'Yes', onPress: () => this.deleteBook()},
        {text: 'No', onPress: () => console.log('Item not deleted'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }
    return (
        <View>
        <View>
        {/* Image view on details */}
        <Image
        style={{height:400, margin:10 , justifyContent: 'center'}}
       source={{uri: this.state.book_image}}
        />             
        </View>
        {/* view book name */}
        <View style={{marginTop: 10, marginBottom: 1, marginLeft:15, marginRight:5}}>
            <Text style={{fontSize:22, fontWeight:'800'}}>{this.state.book_name}</Text>
        </View>
        <View>
            <ScrollView>
            <View style={{marginTop:5, marginLeft:15, marginRight:5}}>
        <Text>
        <Text style={{fontSize:20, fontWeight:'800' , color: 'green'}}>{'$: ' + this.state.book_price}</Text>
        </Text>
        </View>
        <View style={{marginTop:5, marginLeft:15, marginRight:5}}>
        <Text>
        <Text style={{fontSize:20, fontWeight:'600', color: 'orange'}}>{'Author'+this.state.author_name}</Text>
        </Text>
        </View>
        <View style={{marginTop:5, marginLeft:15, marginRight:5}}>
        <Text>
        <Text style={{fontSize:15, fontWeight:'600', color: 'orange'}}>{'Publisher: '+this.state.publi_name}</Text>
        </Text>
        </View>
        <View style={{marginTop:3, marginLeft:15, marginRight:5}}>
        <Text>
        <Text style={{fontSize:15, fontWeight:'600', color: 'black'}}>{'About '+this.state.book_name}</Text>
        </Text>
        </View>
      <View style={{height: 100}}>
      
        <View style={{marginTop:3, marginLeft:15, marginRight:15}}>
        <Text>
        <Text style={{fontSize:15, fontWeight:'400', color: 'black'}}>{this.state.description}</Text>
        </Text>
        </View>
      
      </View>
            </ScrollView>
        </View>
        
      <TouchableOpacity 
      underlayColor ='red'
      style={styles.cartScreenButton}
      onPress = {this.addCartBook}
      >

      <Text style={styles.cartText}>DELETE FROM CART</Text>
      
      </TouchableOpacity >

{/* Scroll View from Below */}
<View>
{/* 
<ScrollView style={styles.container}>
    
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Book Title'}
          value={this.state.book_name}
          onChangeText={(val) => this.inputEl(val, 'set_book_title')}
      />
    </View>
     <View style={styles.formEl}>
      <TextInput
          placeholder={'Author Name'}
          value={this.state.author_name}
          onChangeText={(val) => this.inputEl(val, 'set_author_name')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Publisher'}
          value={this.state.publi_name}
          onChangeText={(val) => this.inputEl(val, 'set_publi_name')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Price'}
          value={this.state.book_price}
          onChangeText={(val) => this.inputEl(val, 'set_book_price')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Year'}
          value={this.state.book_year}
          onChangeText={(val) => this.inputEl(val, 'set_book_year')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Genre'}
          value={this.state.book_genre}
          onChangeText={(val) => this.inputEl(val, 'book_genre')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          placeholder={'Is It Hot?'}
          value={this.state.book_hot}
          onChangeText={(val) => this.inputEl(val, 'set_book_hot')}
      />
    </View>
    <View style={styles.formEl}>
      <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder={'Description'}
          value={this.state.description}
          onChangeText={(val) => this.inputEl(val, 'set_description')}
      />
    </View>
    <View style={styles.button}>
      <Button
        title='Update'
        onPress={() => this.editBook()} 
        color="green"
      />
      </View>
     <View>
      <Button
        title='Delete'
        onPress={this.alertDialog}
        color="red"
      />
    </View>
  </ScrollView> */}
    </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  },
  cartScreenButton:{
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'red',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  cartText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
})

export default Editcart;