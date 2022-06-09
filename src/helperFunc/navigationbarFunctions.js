import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export const hide = async () => {
  
    if(Platform.OS == "android"){
    const result = await NavigationBar.setVisibilityAsync("hidden");
    }
    return
  }