import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  Greetings_First = 'Greetings_First',
  Greetings_Second = 'Greetings_Second',
  Greetings_Third = 'Greetings_Third',

  Mood_Select = 'Mood_Select',
  Mood_Loading = 'Mood_Loading',
  Mood_Meditation = 'Mood_Meditation',
  Mood_NightStory = 'Mood_NightStory',
  Mood_Track = 'Mood_Track',
  Mood_Finish = 'Mood_Finish',

  Bookmark = 'Bookmark',
  Profile = 'Profile',
}

export type ParamsList = {
  [Screens.Greetings_First]: undefined;
  [Screens.Greetings_Second]: undefined;
  [Screens.Greetings_Third]: undefined;

  [Screens.Mood_Select]: undefined;
  [Screens.Mood_Loading]: undefined;
  [Screens.Mood_Meditation]: undefined;
  [Screens.Mood_NightStory]: undefined;
  [Screens.Mood_Track]: undefined;
  [Screens.Mood_Finish]: undefined;

  [Screens.Bookmark]: undefined;

  [Screens.Profile]: undefined;
};

export type NavProp = NativeStackNavigationProp<ParamsList>;
