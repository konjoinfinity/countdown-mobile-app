import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, useColorScheme, Text, Animated, Dimensions, ScrollView } from 'react-native';
import { RadialGradient } from 'react-native-gradients';
import { useTheme } from '@react-navigation/native';
import MIcon from "@expo/vector-icons/MaterialIcons";
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient'
import { Card, CardElement } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from '../components/index';

AnimatableView = Animatable.createAnimatableComponent(View);

const timerskey = "timers";
const historykey = "history"

export default function App({navigation}) {
  let colorScheme = useColorScheme();
  const { colors } = useTheme();
  const [clock, setClock] = useState(false)
  const [counter, setCounter] = useState(30)
  const [timers, setTimers] = useState([])
  const [history, setHistory] = useState([])

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getTimers();
        getHistory();
        });
        return unsubscribe;
    }, [navigation])

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

    const getHistory = async() => {
      try {
        await AsyncStorage.getItem(historykey, (error, result) => {
          result !== null && result !== "[]"
            ? setHistory(JSON.parse(result))
            : setHistory([]);
        })
      } catch (error) {
        console.log(error);
      }
    }

    async function timerExpired(id){
     console.log(id)
      try{
      var newHistory = history;
      var newTimers = timers;
      newHistory.unshift(timers[id]);
      console.log(newHistory)
      await AsyncStorage.setItem(historykey, JSON.stringify(newHistory));
      newTimers.splice(id, 1);
      console.log(newTimers)
      await AsyncStorage.setItem(timerskey, JSON.stringify(newTimers));
      getHistory()
      getTimers()
     } catch(e) {
      console.log(e)
     }
     console.log(timers)
     console.log(history)
    }


  function Tile({tile, id}){
    var totalsecs = (new Date(tile.date).getTime() - new Date().getTime()) / 1000;
    return(
<TouchableOpacity style={{backgroundColor: "#555a74", borderColor: "#555a74", height: Dimensions.get('window').width * 0.45, 
width: Dimensions.get('window').width * 0.45, marginTop: 10, borderRadius: 5}} onPress={() => {Haptics.selectionAsync(); navigation.navigate("TabTwo", {name: tile.name, date: tile.date, id: id, dateCreated: tile.dateCreated})}}>
  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={["#555a74", "#3e415b"]} style={{borderRadius: 5, height: Dimensions.get('window').width * 0.45 }}>
      <Text style={{color: "#e2e4f7", textAlign: "center", padding: 15}}>{new Date(tile.date).toLocaleDateString()}</Text>
      <View style={{backgroundColor: "#3e415b", opacity: 0.8, alignSelf:"stretch", paddingLeft: 20, paddingRight: 20, paddingBottom: 10}}>
      <CountDown
        digitTxtStyle={{color: "#e2e4f7"}}
        timeLabelStyle={{color: "#e2e4f7", marginTop: -5}}
        until={totalsecs}
        onFinish={() => timerExpired(id)}
        size={15}
        digitStyle={{backgroundColor: "transparent"}}/>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
      <Text style={{color: "#e2e4f7", paddingTop: 15, fontSize: 18, fontWeight: "500"}}>{tile.name}</Text>
      </View>
      </LinearGradient>
      </TouchableOpacity>
    )
  }

    return (<View style={{height: Dimensions.get("window").height * 1, backgroundColor: "#33364f"}}>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#2e3048", paddingTop: 100, backgroundColor: "#33364f", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", alignItems: 'center' }}>
         {timers && timers.length > 0 ? timers.map((tile, id) => { 
    return <Tile key={id} tile={tile} id={id} />
         }) : (
          <View style={{alignItems:"center", justifyContent: 'space-evenly', height: Dimensions.get('window').height * 0.8 }}>
          <Text style={{color: "#e2e4f7", fontSize:40, textAlign: "center"}}>No Timers</Text>
          <Text style={{color: "#e2e4f7", fontSize:20, textAlign: "center"}}>Tap + to add one</Text>
          </View>
         )}
      </ScrollView>
      
      <TouchableOpacity style={{ borderRadius: 50, padding: 15, margin:15, position: 'absolute', top: 30, right: 10}} 
              onPress={() => {Haptics.selectionAsync(); navigation.navigate("TabThree")}}><MIcon name='history' size={32} color={"#e2e4f7"}/>
              </TouchableOpacity> 

      <TouchableOpacity
              style={{position: 'absolute',
              bottom: 80,
              right: 35,
              shadowColor: "#555a74", 
              shadowOffset: { height: 1, width: 1 }, 
              shadowOpacity: 1, 
              shadowRadius: 1, 
              backgroundColor: "white",
              borderRadius: 50,
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => {Haptics.selectionAsync(); navigation.navigate("Modal")}}>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={['#d42c75', '#f7876b']} style={{borderRadius: 50 }}>
                <MIcon color={'#fff'} name="add" style={{padding: 10 }} size={70} />
                </LinearGradient>
              </TouchableOpacity>
              
      </View>
    );
} 
