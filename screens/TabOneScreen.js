import { StyleSheet, TouchableOpacity, Alert, useColorScheme, Animated } from 'react-native';
import React, {useRef} from 'react';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { Text, View } from '../components/Themed';
import { useTheme } from '@react-navigation/native';
import { RadialGradient } from 'react-native-gradients';

export default function TabOneScreen({ navigation }) {
  const { colors } = useTheme();
  let colorScheme = useColorScheme();
  const xAnim = useRef(new Animated.Value(100)).current;
  const yAnim = useRef(new Animated.Value(50)).current;

  const move = () => {
    Animated.timing(xAnim, {
      useNativeDriver: true,
    }).start();
    Animated.timing(yAnim, {
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const colorList = [
    {offset: '40%', color: '#525461', opacity: '0.6'},
    {offset: '85%', color: '#363747', opacity: '0.6'}
  ]

  return (
    <View style={styles.container}>
      <View style={{top: 300, left: 100, borderRadius: 5, zIndex: 2, height: 20, width: 50, backgroundColor: colors.text, position: "absolute", transform: [{rotate: '45deg'}]}} />
      <View style={{top: 400, left: 75, borderRadius: 5, zIndex: 2, height: 20, width: 50, backgroundColor: colors.text, position: "absolute", transform: [{rotate: '0deg'}]}} />
      <View style={{top: 450, left: 75, borderRadius: 5, zIndex: 2, height: 20, width: 50, backgroundColor: colors.text, position: "absolute", transform: [{rotate: '-25deg'}]}} />
    <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} style={{zIndex: 1}}/>
    {/* <Animated.View
        style={[
          styles.fadingContainer,
          {transform: [{
            translateY: yAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
            })
          }]}
        ]}>
    <Text>TESTING</Text>
    </Animated.View> */}
    
    
      <TouchableOpacity
              style={{position: 'absolute',
              bottom: 100,
              right: 35,
              zIndex: 2,
              shadowColor: colorScheme == "dark" ? 'rgba(100,100,100,.4)' : 'rgba(0,0,0,.4)', 
              shadowOffset: { height: 2.5, width: 2.5 }, 
              shadowOpacity: 1, 
              shadowRadius: 1, 
              backgroundColor: "white",
              borderRadius: 50,
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() =>
                navigation.navigate("Modal")}>
                <MIcon color={colors.primary} style={{margin: -8}} name="add-circle" size={75} />
              </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
    position: "absolute",
  },
});
