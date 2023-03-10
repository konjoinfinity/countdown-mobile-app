import { Dimensions, StyleSheet, TouchableOpacity, ScrollView, View, Keyboard } from 'react-native';
import { Text } from '../components/Themed';
import React, {useState, useRef, useEffect} from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { Input } from '@ui-kitten/components';

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
  const [name, setName] = useState('Title')
  const [timeToAdd, setTimeToAdd] = useState(new Date().setSeconds(new Date().getSeconds() + 60))
  const [timers, setTimers] = useState([]);
  const [cardColor, setCardColor] = useState("#3e415b")
  const [colorSetting, setColorSetting] = useState(false)

  const onDateChange = (event, selectedDate) => {
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
      setDate(new Date(0, 0, 0, 0, 1, 5))
      setName('Title')
      setCardColor("#3e415b")
      setColorSetting(false)
      getTimers();
      });
      return unsubscribe;
  }, [navigation])

  const startCountdown = async() => {
    let datePlusMins = new Date().setMinutes(new Date().getMinutes() + new Date(date).getMinutes())
    datePlusMins = new Date(datePlusMins).setHours(new Date(datePlusMins).getHours() + new Date(date).getHours())
    console.log(new Date(datePlusMins).toLocaleString())
    setTimeToAdd(datePlusMins)
    try {
        Haptics.selectionAsync()
        var newCountdown = timers;
        newCountdown.unshift({ name: name, date: new Date(datePlusMins).toLocaleString(), dateCreated: new Date().toLocaleString(), color: cardColor });
        setDate(new Date())
        setTimers(newCountdown)
        navigation.navigate("TabOne")
        await AsyncStorage.setItem(timerskey, JSON.stringify(newCountdown));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, {backgroundColor: '#33364f'}]}>
      <View style={{height: Dimensions.get("window").height * 0.1, width: Dimensions.get("window").width * 1 ,backgroundColor: cardColor, position: 'absolute', top:0}}></View>
      <View style={{ justifyContent:'space-around', alignItems: 'center', flexDirection: 'row'}}>
      <TouchableOpacity 
              onPress={() => {Haptics.selectionAsync(); navigation.navigate("TabOne")}}><MIcon name='access-time' size={30} color={"#e2e4f7"}/>
              </TouchableOpacity> 
      <Text style={{color:"#e2e4f7", fontSize: 25, fontWeight: "600", letterSpacing: 1.5}}>TIMER</Text>
      <TouchableOpacity onPress={() => { Haptics.selectionAsync(); colorSetting == false ? setColorSetting(true) : setColorSetting(false)}}>
        <AntDesign name="setting" size={28} color={"#e2e4f7"}/>
              </TouchableOpacity> 
              </View>
              {colorSetting === true && <View style={{display: 'flex', alignItems: "center", justifyContent:'space-evenly', flexWrap: "wrap", position: 'absolute', flexDirection: 'row',
          top: Dimensions.get("window").height * 0.2,right: 0,backgroundColor: '#2E3048', borderRadius: 5, shadowColor:"#555a74", width: Dimensions.get("window").width * 1,
          shadowOffset: { height: 1.5, width: 1.5 }, 
          shadowOpacity: 1, 
          shadowRadius: 1, 
          elevation: 8, padding: 10, zIndex:1 }}> 
          {PALETTE.map((color, id) => {
            return <TouchableOpacity key={id} onPress={() =>  setCardColor(color)} style={{backgroundColor:color, 
            width: Dimensions.get("window").width * 0.12,height: Dimensions.get("window").width * 0.12,borderRadius: 50}}>
            </TouchableOpacity>
          })}
           <Input textStyle={{textAlign:'center',color: '#e2e4f7', fontSize: 25}} style={{ marginTop: 25,width: Dimensions.get("window").width * 0.9,backgroundColor: '#2E3048'}}
                placeholder="Title"
                value={name}
                onChangeText={title => setName(title)}
                blurOnSubmit={false}
                onBlur={()=> Keyboard.dismiss()}
                status='control'
                accessoryLeft={()=> <MaterialCommunityIcons name="playlist-edit" size={28} color={"#e2e4f7"}/>}/>
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
