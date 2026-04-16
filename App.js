import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen    from './screens/HomeScreen';
import SearchScreen  from './screens/SearchScreen';
import ReelsScreen   from './screens/ReelsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen  from './screens/CameraScreen';
import StoryScreen from './screens/StoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home"    component={HomeScreen} />
        <Stack.Screen name="Search"  component={SearchScreen} />
        <Stack.Screen name="Reels"   component={ReelsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Camera"  component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}