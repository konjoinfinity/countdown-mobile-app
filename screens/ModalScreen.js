import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, View } from '../components/Themed';
import React, {useState} from 'react';
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import { LinearGradient } from 'expo-linear-gradient'

export default function ModalScreen() {
  const [selectedDate, setSelectedDate] = useState(getToday());
  let colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <DatePicker
      options={{
        backgroundColor: '#33364f',
        textHeaderColor: '#FFA25B',
        textDefaultColor: '#F6E7C1',
        selectedTextColor: '#fff',
        mainColor: '#F4722B',
        textSecondaryColor: '#D6C7A1',
        borderColor: 'rgba(122, 146, 165, 0.1)',
      }}
      current={selectedDate}
      selected={selectedDate}
      mode="datepicker"
      minuteInterval={30}
      style={{ borderRadius: 10 }}
      onSelectedChange={date => setSelectedDate(date)}
    />
    <TouchableOpacity
              style={{
              shadowColor: colorScheme == "dark" ? 'rgba(100,100,100,.4)' : 'rgba(0,0,0,.4)', 
              shadowOffset: { height: 2.5, width: 2.5 }, 
              shadowOpacity: 1, 
              shadowRadius: 1, 
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() =>
                navigation.navigate("Modal")}>
                  <LinearGradient colors={['#f7876b', '#d42c75']} style={{borderRadius: 5, padding: 25 }}>
                <Text>Start Countdown</Text>
                </LinearGradient>
              </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
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
