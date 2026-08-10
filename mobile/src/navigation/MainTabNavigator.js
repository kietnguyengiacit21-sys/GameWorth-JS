import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import GameListScreen from '../screens/games/GameListScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MyReviewsScreen from '../screens/reviews/MyReviewsScreen';
import {colors} from '../theme/colors';

const Tab = createBottomTabNavigator();

const icons = {
  Home: '⌂',
  Games: '▣',
  MyReviews: '★',
  Profile: '●',
};

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Games"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          height: 66,
          paddingTop: 7,
          paddingBottom: 8,
          borderTopColor: colors.border,
          backgroundColor: '#0E0F10',
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarIcon: ({color}) => (
          <Text style={{color, fontSize: 19, fontWeight: '800'}}>
            {icons[route.name]}
          </Text>
        ),
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Games" component={GameListScreen} />
      <Tab.Screen name="MyReviews" component={MyReviewsScreen} options={{title: 'My Reviews'}} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
