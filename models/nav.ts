import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  Greetings_First = 'Greetings_First',
  Greetings_Second = 'Greetings_Second',
  Greetings_Third = 'Greetings_Third',

  Mood_Select = 'Mood_Select',
  Mood_Loading = 'Mood_Loading',
  Mood_Timeline = 'Mood_Timeline',
  Mood_Track = 'Mood_Track',
  Mood_Finish = 'Mood_Finish',

  Profile = 'Profile',
}

export type ParamsList = {
  [Screens.Greetings_First]: undefined;
  [Screens.Greetings_Second]: undefined;
  [Screens.Greetings_Third]: undefined;

  [Screens.Mood_Select]: undefined;
  [Screens.Mood_Loading]: undefined;
  [Screens.Mood_Timeline]: {step: number} | undefined;
  [Screens.Mood_Track]: undefined;
  [Screens.Mood_Finish]: undefined;

  [Screens.Profile]: undefined;
};

export type NavProp = NativeStackNavigationProp<ParamsList>;
