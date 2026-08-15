import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import FilterGameScreen from '../screens/games/FilterGameScreen';
import GameDetailScreen from '../screens/games/GameDetailScreen';
import GameMediaScreen from '../screens/games/GameMediaScreen';
import SearchGameScreen from '../screens/games/SearchGameScreen';
import SystemRequirementsScreen from '../screens/games/SystemRequirementsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import AddReviewScreen from '../screens/reviews/AddReviewScreen';
import CommunityRatingScreen from '../screens/reviews/CommunityRatingScreen';
import DeleteReviewConfirmationScreen from '../screens/reviews/DeleteReviewConfirmationScreen';
import EditReviewScreen from '../screens/reviews/EditReviewScreen';
import ReviewDetailScreen from '../screens/reviews/ReviewDetailScreen';
import ReviewListScreen from '../screens/reviews/ReviewListScreen';
import {colors} from '../theme/colors';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.warning,
  },
};

function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {backgroundColor: colors.background},
          headerTintColor: colors.text,
          headerTitleStyle: {fontWeight: '800'},
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}} />

        <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{headerShown: false}} />

        <Stack.Screen name="SearchGame" component={SearchGameScreen} options={{title: 'Search Game'}} />
        <Stack.Screen name="FilterGame" component={FilterGameScreen} options={{title: 'Filter Game'}} />
        <Stack.Screen name="GameDetail" component={GameDetailScreen} options={{title: 'Game Detail'}} />
        <Stack.Screen name="GameMedia" component={GameMediaScreen} options={{title: 'Game Media'}} />
        <Stack.Screen name="SystemRequirements" component={SystemRequirementsScreen} options={{title: 'System Requirements'}} />

        <Stack.Screen name="CommunityRating" component={CommunityRatingScreen} options={{title: 'Community Rating'}} />
        <Stack.Screen name="ReviewList" component={ReviewListScreen} options={{title: 'Reviews'}} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetailScreen} options={{title: 'Review Detail'}} />
        <Stack.Screen name="AddReview" component={AddReviewScreen} options={{title: 'Add Review'}} />
        <Stack.Screen name="EditReview" component={EditReviewScreen} options={{title: 'Edit Review'}} />
        <Stack.Screen
          name="DeleteReviewConfirmation"
          component={DeleteReviewConfirmationScreen}
          options={{title: 'Delete Review'}}
        />

        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title: 'Edit Profile'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default RootNavigator;
