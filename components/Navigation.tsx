import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParamsList, Screens} from '@/models/nav';
import First from '@/containers/Greetings/First';
import Second from '@/containers/Greetings/Second';
import Third from '@/containers/Greetings/Third';
import MoodSelect from '@/containers/Mood/Select';
import MoodLoading from '@/containers/Mood/Loading';
import MoodMeditation from '@/containers/Mood/Meditation';
import MoodStory from '@/containers/Mood/Story';
import MoodTracker from '@/containers/Mood/Tracker';
import MoodFinish from '@/containers/Mood/Finish';
import Saved from '@/containers/Saved/Saved';
import Profile from '@/containers/Profile/Profile';

const Stack = createNativeStackNavigator<ParamsList>();

const GreetingsNavigator = () => (
  <Stack.Group screenOptions={{animation: 'slide_from_right'}}>
    <Stack.Screen name={Screens.Greetings_First} component={First} />
    <Stack.Screen name={Screens.Greetings_Second} component={Second} />
    <Stack.Screen name={Screens.Greetings_Third} component={Third} />
  </Stack.Group>
);

const MoodFlowNavigator = () => (
  <Stack.Group screenOptions={{animation: 'fade_from_bottom'}}>
    <Stack.Screen name={Screens.Mood_Select} component={MoodSelect} />
    <Stack.Screen name={Screens.Mood_Loading} component={MoodLoading} />
    <Stack.Screen name={Screens.Mood_Track} component={MoodTracker} />
    <Stack.Screen name={Screens.Mood_Finish} component={MoodFinish} />
    <Stack.Screen
      name={Screens.Mood_Meditation}
      component={MoodMeditation}
      options={{animation: 'fade'}}
    />
    <Stack.Screen 
      name={Screens.Mood_NightStory} 
      component={MoodStory}
      options={{animation: 'fade'}}
    />
  </Stack.Group>
);

const SettingsNavigator = () => (
  <Stack.Group screenOptions={{animation: 'slide_from_bottom'}}>
    <Stack.Screen name={Screens.Bookmark} component={Saved} />
    <Stack.Screen name={Screens.Profile} component={Profile} />
  </Stack.Group>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.Greetings_First}
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        {GreetingsNavigator()}
        {MoodFlowNavigator()}
        {SettingsNavigator()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
