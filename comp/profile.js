import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import firebase from '../config';


//import {ref} from "firebase/storage";
// import ImagePicker from 'react-native-image-picker';
// import * as Progress from 'react-native-progress';
//import {Dropdown } from 'react-native-dropdown';


class ProfileComponent extends Component {
  constructor() {
    
    super();
    this.ref = firebase.firestore().collection('users');
    
    this.state = {
       user_name: '',
      user_email: '',
      user_password: '',
      isLoading: false
    };
  }
  
  onValUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

   


  
  addUser() {
   
    if(
    this.state.user_name === '',
    this.state.user_email === '',
    this.state.user_password === ''
    ){
     alert('Fields are empty.');
     console.log(this.state.book_image);
    } 
    
    else {
      this.setState({
        isLoading: true,
      });      
      this.ref.add({
        user_name: this.state.user_name,
        user_email: this.state.user_email,
        user_password: this.state.user_password
        
      }).then((res) => {
        this.setState({
          user_name: '',
          user_email: '',
          user_password: '',
          isLoading: false,
        });
        // this.props.navigation.navigate('ReadComponent')
        alert('User Created');
      })
      .catch((err) => {
        console.error("Error occured: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>

        
        <View style={styles.formEle}>
          <TextInput
              placeholder={'User Name'}
              value={this.state.user_name}
              onChangeText={(val) => this.onValUpdate(val, 'user_name')}
          />
        </View>
         <View style={styles.formEle}>
          <TextInput
              placeholder={'Email'}
              value={this.state.user_email}
              onChangeText={(val) => this.onValUpdate(val, 'user_email')}
          />
        </View>
       
       
        
        <View style={styles.formEle}>
          <TextInput
              placeholder={'Password'}
              value={this.state.user_password}
              onChangeText={(val) => this.onValUpdate(val, 'user_password')}
          />
        </View>
        
        <View style={styles.button}>
          <Button
            title='Create'
            onPress={() => this.addUser()} 
            color="black"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='view'
            onPress={() => {
              this.setState({
                user_name: '',
                user_email: '',   
                user_password: '',
            //   book_image:'',
                isLoading: false,
              });
              this.props.navigation.navigate('ReadComponent');
              //this.uploadImage;
           //   console.log.setBookImage();
            }}
            color="black"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formEle: {
    flex: 1,
    padding: 5,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4e4e4e',
  },
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export default ProfileComponent;