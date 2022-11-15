import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './comp/home';
import CartComponent from './comp/cart';
import ProfileComponent from './comp/profile';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import GenreComponent from './comp/genre';
 import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeTab from './tabscreens/hometab';
import DetailsComponent from './comp/details';
import DetailsFlatComponent from './comp/detailsFlat';
import GenreList from './comp/genrelist';
import LoginComponent from './comp/login';
import OnboardingScreen from './comp/OnBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Editcart from './comp/editcart';
import RegisterComponent from './comp/register';
import ReadComponent from './comp/read';



const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function CrudStack() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  React.useEffect(async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'true');
    } else {
      setIsAppFirstLaunched(false);
    }

    // AsyncStorage.removeItem('isAppFirstLaunched');
  }, []);

  return (
    isAppFirstLaunched != null && (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor: 'blue',
          },
          headerTintColor: 'skyblue',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
        name = "OnboardingScreen"
        component={OnboardingScreen}
        options={{ title: 'Onboarding' }}
        >
          
        </Stack.Screen>
        <Stack.Screen 
        name="LoginComponent" 
        component={LoginComponent} 
        options={{ title: 'Login' }}
      />
     <Stack.Screen 
        name="HomeComponent" 
        component={BottomTabs} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="DetailsComponent" 
        component={DetailsComponent} 
        options={{ title: 'Details' }}
      />
      <Stack.Screen 
       name="ProfileComponent" 
       component={ProfileComponent} 
       options={{ title: 'Profile' }}
      />
      <Stack.Screen 
       name="CartComponent" 
       component={CartComponent} 
       options={{ title: 'Cart' }}
      />
      <Stack.Screen 
      name="DetailsFlatComponent" 
      component={DetailsFlatComponent} 
      options={{ title: 'DetailsFlat' }}
     />
      <Stack.Screen 
      name="GenreList" 
      component={GenreList} 
      options={{ title: 'GenreList' }}
     />
      <Stack.Screen
        name = "EditCart"
        component={Editcart}
        options={{ title: 'EditCart' }}
        />
        <Stack.Screen
        name = "RegisterComponent"
        component={RegisterComponent}
        options={{ title: 'RegisterComponent' }}
        />
        <Stack.Screen
        name = "ReadComponent"
        component={ReadComponent}
        options={{ title: 'ReadComponent' }}
        />
          
    </Stack.Navigator>
    )
  );
}

function BottomTabs(){
  return (
    <Tab.Navigator
      // initialRouteName="HomeTab"
      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'skyblue' }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeComponent}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Genre"
        component={GenreComponent}
        options={{
          tabBarLabel: 'Genre',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileComponent}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartComponent}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {


  return (
    
    <NavigationContainer>
     {/* <BottomTabs />   */}
    <CrudStack/>
    </NavigationContainer>
  );
}
