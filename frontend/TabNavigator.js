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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './screens/Login';
import AddPlayer from './screens/adminPanel/AddPlayer';
import Players from './screens/Players';
import AdminDashboard from './screens/adminPanel/AdminDashboard';
import SignUp from './screens/SignUp';
import Toast from 'react-native-toast-message';
import FantasyDetails from './screens/FantasyDetails';
import CreateFantasy from './screens/adminPanel/CreateFantasy';
import PlayersList from './screens/adminPanel/PlayersList';
import AdminFantasies from './screens/adminPanel/AdminFantasies';
import { userProfile } from './redux/action/userAction';
import axios from 'axios';
import { server } from './server';
import NewContest from './screens/adminPanel/NewContest';
import NewMatch from './screens/adminPanel/NewMatch';
import AdminContests from './screens/adminPanel/AdminContests';
import AdminMatches from './screens/adminPanel/AdminMatches';
import MatchDetails from './screens/MatchDetails';
import CreateTeam from './screens/CreateTeam';
import Payment from './screens/Payment';
import MyFantasies from './screens/MyFantasies';

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

        <HomeStack.Screen
          name="fantasyDetails"
          component={FantasyDetails}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <HomeStack.Screen
          name="matchDetails"
          component={MatchDetails}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <HomeStack.Screen
          name="createTeam"
          component={CreateTeam}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <HomeStack.Screen
          name="payment"
          component={Payment}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
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
          name="myFantasies"
          component={MyFantasies}
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
    <PlayerStack.Navigator
      initialRouteName="adminDashboard"
      screenOptions={{ contentStyle: { marginBottom: 55, flex: 1 } }}
    >
      <PlayerStack.Group>
        <PlayerStack.Screen
          name="adminDashboard"
          component={AdminDashboard}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <PlayerStack.Screen
          name="addPlayer"
          component={AddPlayer}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <PlayerStack.Screen
          name="createFantasy"
          component={CreateFantasy}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <PlayerStack.Screen
          name="playersList"
          component={PlayersList}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
        <PlayerStack.Screen
          name="adminFantasies"
          component={AdminFantasies}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <PlayerStack.Screen
          name="newContest"
          component={NewContest}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <PlayerStack.Screen
          name="adminContests"
          component={AdminContests}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <PlayerStack.Screen
          name="newMatch"
          component={NewMatch}
          options={{ headerShown: false, animation: 'flip' }}
        />

        <PlayerStack.Screen
          name="adminMatches"
          component={AdminMatches}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />
      </PlayerStack.Group>
    </PlayerStack.Navigator>
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
