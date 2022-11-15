import React, { Component } from 'react';

import firebase from '../config';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements'


class ReadComponent extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('users');
    this.state = {
      isLoading: true,
      users: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((res) => {
      const { 
        user_name,
        user_email,
        user_password
         } = res.data();
      users.push({
        key: res.id,
        user_name,
        user_email,
        user_password
      });
    });
    this.setState({
      users,
      isLoading: false
   });
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
      <ScrollView style={styles.wrapper}>
          {
            this.state.users.map((res, i) => {
            
              return (
                
                
                <ListItem 
                   key={i} 
                //    onPress={() => {
                //       this.props.navigation.navigate('UpdateComponent', {
                //         userkey: res.key
                //       });
                //     }}                   
                   bottomDivider>
                    
                  <ListItem.Content>
                    <ListItem.Title>{'Title:- ' + res.user_name}</ListItem.Title>
                    <ListItem.Subtitle>{'Author:- ' +res.user_email}</ListItem.Subtitle>
                    <ListItem.Subtitle>{'Publisher:- ' +res.user_password}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron 
                     color="black" 
                  />
                  
                </ListItem>
              );
            })
          }
            
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
   flex: 1,
   paddingBottom: 20
  },
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

export default ReadComponent;