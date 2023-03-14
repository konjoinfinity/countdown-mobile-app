/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Start: {
            screens: {
              StartScreen: 'one',
            },
          },
          Timer: {
            screens: {
              TimerScreen: 'two',
            },
          },
          Timers: {
            screens: {
              TimersScreen: 'three',
            },
          },
          History: {
            screens: {
              HistoryScreen: 'three',
            },
          },
        },
      },
    },
  },
};

export default linking;
