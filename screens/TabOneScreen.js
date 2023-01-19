import { StyleSheet, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useTheme } from '@react-navigation/native';

export default function TabOneScreen({ navigation }) {
  const { colors } = useTheme();
  let colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={{height: 500, width: 400, backgroundColor: 'rgb(82,84,97)', borderRadius: 200, opacity: 0.1}}/>
      <View style={{position: "absolute", height: 400, width: 300, backgroundColor: 'radial-gradient(circle, rgba(82,84,97,1) 0%, rgba(54,55,71,1) 100%)'}} />
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
});
