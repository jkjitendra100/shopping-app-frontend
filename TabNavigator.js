/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './screens/Login';
import AddPlayer from './screens/adminPanel/AddPlayer';
import Players from './screens/Players';
import AdminDashboard from './screens/adminPanel/AdminDashboard';
import SignUp from './screens/SignUp';
import Toast from 'react-native-toast-message';
import { Colors } from './theme/Colors';
import FantasyDetails from './screens/FantasyDetails';
import CreateFantasy from './screens/adminPanel/CreateFantasy';
import PlayersList from './screens/adminPanel/PlayersList';
import AdminFantasies from './screens/adminPanel/AdminFantasies';

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
          options={{ headerShown: false }}
        />

        <HomeStack.Screen
          name="fantasyDetails"
          component={FantasyDetails}
          options={{ headerShown: false }}
        />
      </ProfileStack.Group>
    </HomeStack.Navigator>
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
          options={{ headerShown: false }}
        />
        <ProfileStack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />

        <ProfileStack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
}

function PlayerStackScreens() {
  return (
    <PlayerStack.Navigator
      screenOptions={{ contentStyle: { marginBottom: 55 } }}
    >
      <PlayerStack.Group>
        <PlayerStack.Screen
          name="players"
          component={Players}
          options={{ headerShown: false }}
        />
      </PlayerStack.Group>
    </PlayerStack.Navigator>
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
          options={{ headerShown: false }}
        />
        <PlayerStack.Screen
          name="addPlayer"
          component={AddPlayer}
          options={{ headerShown: false }}
        />
        <PlayerStack.Screen
          name="createFantasy"
          component={CreateFantasy}
          options={{ headerShown: false }}
        />
        <PlayerStack.Screen
          name="playersList"
          component={PlayersList}
          options={{ headerShown: false }}
        />
        <PlayerStack.Screen
          name="adminFantasies"
          component={AdminFantasies}
          options={{ headerShown: false }}
        />
      </PlayerStack.Group>
    </PlayerStack.Navigator>
  );
}

export default function TabNavigator() {
  return (
    <>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          tabBarStyle: {
            height: 55,
            paddingBottom: 6,
            position: 'absolute',
            bottom: -0,
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

              case 'Players':
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
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Players"
            component={PlayerStackScreens}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreens}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Admin"
            component={AdminStackScreens}
            options={{ headerShown: false }}
          />
        </Tab.Group>
      </Tab.Navigator>
      <Toast position="top" bottomOffset={20} />
    </>
  );
}
