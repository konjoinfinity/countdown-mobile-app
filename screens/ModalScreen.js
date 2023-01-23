import { Dimensions, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { Text } from '../components/Themed';
import React, {useState, useRef, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons'

const timerskey = "timers";
const PALETTE = [
	"#3e415b",
	'#9c9fb6',
	'#F7876B',
	'#E75C70',
	'#D63174',
	'#812E5F'
]

export default function ModalScreen({navigation}) {
  const [date, setDate] = useState(new Date(0, 0, 0, 0, 1, 5));
  const [timeToAdd, setTimeToAdd] = useState(new Date().setSeconds(new Date().getSeconds() + 60))
  const [timers, setTimers] = useState([]);
  const [cardColor, setCardColor] = useState("#3e415b")
  const [colorSetting, setColorSetting] = useState(false)

  const onDateChange = (event, selectedDate) => {
    let datePlusMins = new Date().setMinutes(new Date().getMinutes() + new Date(selectedDate).getMinutes())
    datePlusMins = new Date(datePlusMins).setHours(new Date(datePlusMins).getHours() + new Date(selectedDate).getHours())
    console.log(new Date(datePlusMins).toLocaleString())
    setTimeToAdd(datePlusMins)
    const currentDate = selectedDate
    setDate(currentDate);
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
    const unsubscribe = navigation.addListener('focus', () => {
      getTimers();
      });
      return unsubscribe;
  }, [navigation])

  const startCountdown = async() => {
    try {
        Haptics.selectionAsync()
        var newCountdown = timers;
        newCountdown.unshift({ name: "Timer", date: new Date(timeToAdd).toLocaleString(), dateCreated: new Date().toLocaleString(), color: cardColor });
        setDate(new Date())
        setTimers(newCountdown)
        navigation.navigate("Root")
        await AsyncStorage.setItem(timerskey, JSON.stringify(newCountdown));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: '#33364f'}]}>
      <View style={{ justifyContent:'space-around', alignItems: 'center', flexDirection: 'row'}}>
      <TouchableOpacity disabled={true}>
        <AntDesign name="setting" size={28} color={"#33364f"}/>
              </TouchableOpacity> 
      <Text style={{color:"#e2e4f7", fontSize: 25, fontWeight: "600", letterSpacing: 1.5}}>TIMER</Text>
      <TouchableOpacity onPress={() => { Haptics.selectionAsync(); colorSetting == false ? setColorSetting(true) : setColorSetting(false)}}>
        <AntDesign name="setting" size={28} color={"#e2e4f7"}/>
              </TouchableOpacity> 
              </View>
              {colorSetting === true && <View style={{display: 'flex', alignItems: "center", justifyContent:'space-evenly', flexWrap: "wrap", position: 'absolute', flexDirection: 'row',
          top: Dimensions.get("window").width * 0.33,right: 0,backgroundColor: '#2E3048', borderRadius: 5, shadowColor:"#555a74", width: Dimensions.get("window").width * 1,
          shadowOffset: { height: 1.5, width: 1.5 }, 
          shadowOpacity: 1, 
          shadowRadius: 1, 
          elevation: 8, padding: 10, zIndex:1 }}> 
          {PALETTE.map((color, id) => {
            return <TouchableOpacity key={id} onPress={() =>  setCardColor(color)} style={{backgroundColor:color, 
            width: Dimensions.get("window").width * 0.12,height: Dimensions.get("window").width * 0.12,borderRadius: 50}}>
            </TouchableOpacity>
          })}
        </View>}
        <DateTimePicker
        style={{height:Dimensions.get("window").height * 0.35}}
               mode='countdown'
               minuteInterval={1}
          display='clock'
          value={date}
          textColor="#fff"
          onChange={onDateChange}/>
    <TouchableOpacity
              style={{
                shadowColor: "#555a74",
              shadowOffset: { height: 0.5, width: 0.5 }, 
              shadowOpacity: 0.6, 
              shadowRadius: 1, 
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => startCountdown()}>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={['#d42c75', '#f7876b']} style={{borderRadius: 50, padding: 20 }}>
                <Text style={{fontSize: 18, fontWeight: "600", paddingLeft: 25, letterSpacing: 1, paddingRight: 25, color:'#e2e4f7'}}>START</Text>
                </LinearGradient>
              </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
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
