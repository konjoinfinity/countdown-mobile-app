import { Dimensions, StyleSheet, TouchableOpacity, useColorScheme, ScrollView, TextInput, Alert } from 'react-native';
import { Text } from '../components/Themed';
import React, {useState, useRef, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { Input } from '@ui-kitten/components';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const timerskey = "timers";

export default function ModalScreen({navigation}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [timers, setTimers] = useState([]);
  const nameinput = useRef(null);
  const { colors } = useTheme();
  let colorScheme = useColorScheme();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    console.log(currentDate)
  };

  const getTimers = async() => {
    try {
      await AsyncStorage.getItem(timerskey, (error, result) => {
        result !== null && result !== "[]"
          ? setTimers(JSON.parse(result))
          : setTimers([]);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    nameinput.current.focus();
    const unsubscribe = navigation.addListener('focus', () => {
      getTimers();
      });
      return unsubscribe;
  }, [navigation])

  const startCountdown = async() => {
    try {
      if (name !== "") {
        Haptics.selectionAsync()
        var newCountdown = timers;
        newCountdown.unshift({ name: name, date: new Date(date).toLocaleString() });
        setName("")
        setDate(new Date())
        setTimers(newCountdown)
        navigation.navigate("Root")
        await AsyncStorage.setItem(timerskey, JSON.stringify(newCountdown));
        console.log(timers)
      } else {
        Haptics.selectionAsync()
        Alert.alert(
          "Please add a title.", "",[{
              text: "Ok",
              onPress: () =>
              Haptics.selectionAsync()
            }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={[styles.container, {backgroundColor: '#555a74'}]} automaticallyAdjustKeyboardInsets={true}>
     <TextInput
      ref={nameinput}
      style={{textAlign: "center", width: Dimensions.get("window").width * 0.9,color: colors.text, fontSize: 25}}
                placeholder="Title"
                value={name}
                onChangeText={title => setName(title)}
                blurOnSubmit={false}
                maxLength={15}
              />
               <DateTimePicker
               style={{height:Dimensions.get("window").height * 0.15}}
               mode="date"
          display='spinner'
          value={date}
          minimumDate={new Date()}
          onChange={onDateChange}/>
        <DateTimePicker
        style={{height:Dimensions.get("window").height * 0.15}}
               mode="time"
               minuteInterval={1}
          display='spinner'
          value={date}
          minimumDate={new Date()}
          onChange={onDateChange}/>
    <TouchableOpacity
              style={{
              shadowColor: colorScheme == "dark" ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.4)', 
              shadowOffset: { height: 0.5, width: 0.5 }, 
              shadowOpacity: 0.6, 
              shadowRadius: 1, 
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => startCountdown()}>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={['#d42c75', '#f7876b']} style={{borderRadius: 50, padding: 20 }}>
                <Text style={{fontSize: 18, fontWeight: "500", paddingLeft: 25, letterSpacing: 1, paddingRight: 25}}>START</Text>
                </LinearGradient>
              </TouchableOpacity>
    </ScrollView>
  )
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
