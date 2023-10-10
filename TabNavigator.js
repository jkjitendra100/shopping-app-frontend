/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from './theme/Colors';
import { useDispatch, useSelector } from 'react-redux';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './screens/Login';
import AdminDashboard from './screens/adminPanel/AdminDashboard';
import SignUp from './screens/SignUp';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { server } from './server';
import MyOrders from './screens/MyOrders';
import NewProduct from './screens/adminPanel/NewProduct';
import UpdateProduct from './screens/adminPanel/UpdateProduct';
import AdminProducts from './screens/adminPanel/AdminProducts';

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const PlayerStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator screenOptions={{ contentStyle: { marginBottom: 55 } }}>
      <ProfileStack.Group>
        <HomeStack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </ProfileStack.Group>
    </HomeStack.Navigator>
  );
}

function MyFantasiesStack() {
  return (
    <PlayerStack.Navigator
      screenOptions={{ contentStyle: { marginBottom: 55 } }}
    >
      <PlayerStack.Group>
        <PlayerStack.Screen
          name="myOrders"
          component={MyOrders}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </PlayerStack.Group>
    </PlayerStack.Navigator>
  );
}

function ProfileStackScreens() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ contentStyle: { marginBottom: 55 } }}
    >
      <ProfileStack.Group>
        <ProfileStack.Screen
          name="profile"
          component={Profile}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <ProfileStack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <ProfileStack.Screen
          name="signUp"
          component={SignUp}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
}

function AdminStackScreens() {
  return (
    <AdminStack.Navigator
      initialRouteName="adminDashboard"
      screenOptions={{ contentStyle: { marginBottom: 55, flex: 1 } }}
    >
      <AdminStack.Group>
        <AdminStack.Screen
          name="adminDashboard"
          component={AdminDashboard}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <AdminStack.Screen
          name="newProduct"
          component={NewProduct}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <AdminStack.Screen
          name="updateProduct"
          component={UpdateProduct}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <AdminStack.Screen
          name="adminProducts"
          component={AdminProducts}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </AdminStack.Group>
    </AdminStack.Navigator>
  );
}

export default function TabNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const getProfileData = async () => {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server}/user/me`,
      };

      axios
        .request(config)
        .then((response) => {
          dispatch({
            type: 'myProfileSuccess',
            payload: response?.data?.user,
          });
        })
        .catch((e) => {
          console.log(e);
          dispatch({
            type: 'myProfileFail',
          });
          // Toast.show({
          //   type: 'error',
          //   text1: 'Error',
          //   text2: e?.response?.data?.message,
          // });
        });
    };

    getProfileData();
  }, [isAuthenticated]);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          tabBarStyle: {
            height: 55,
            paddingBottom: 6,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                return <Ionicons name={iconName} size={25} color={color} />;

              case 'Profile':
                iconName = focused ? 'user' : 'user-o';
                return <FontAwesome name={iconName} size={25} color={color} />;

              case 'Login':
                iconName = focused ? 'login-variant' : 'login-variant';
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={25}
                    color={color}
                  />
                );

              case 'My Fantasies':
                iconName = focused ? 'gamepad' : 'gamepad-outline';
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={25}
                    color={color}
                  />
                );

              case 'Admin':
                iconName = focused ? 'user-tie' : 'user-tie';
                return <FontAwesome6 name={iconName} size={25} color={color} />;

              default:
                return <Ionicons name="home" size={25} color={color} />;
            }
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Group>
          <Tab.Screen
            name="Home"
            component={HomeStackScreens}
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
          <Tab.Screen
            name="My Fantasies"
            component={MyFantasiesStack}
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
          <Tab.Screen
            name={isAuthenticated ? 'Profile' : 'Login'}
            component={ProfileStackScreens}
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
          <Tab.Screen
            name="Admin"
            component={AdminStackScreens}
            options={{
              headerShown: false,
              animation: 'fade_from_bottom',
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
      <Toast position="top" bottomOffset={20} />
    </>
  );
}
