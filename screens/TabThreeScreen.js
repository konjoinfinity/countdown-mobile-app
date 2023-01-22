import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, useColorScheme, Text, Animated, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MIcon from "@expo/vector-icons/MaterialIcons";
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';

AnimatableView = Animatable.createAnimatableComponent(View);
const historykey = "history"

export default function App({navigation}) {
  let colorScheme = useColorScheme();
  const { colors } = useTheme();
  const [history, setHistory] = useState([])

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getHistory();
        });
        return unsubscribe;
    }, [navigation])

    const getHistory = async() => {
      // try {
      //   await AsyncStorage.removeItem('@MyApp_key')
      // } catch(e) {
      //   // remove error
      // }
      // console.log('Done.')
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

  function Tile({tile, id}){
    return(
<TouchableOpacity style={{ height: Dimensions.get('window').width * 0.3, backgroundColor: tile.color,
width: Dimensions.get('window').width * 0.45, marginTop: 10, borderRadius: 5, opacity: 0.7}} onPress={() => {Haptics.selectionAsync(); }}>
  <Text style={{color: '#fff', paddingTop: 15, fontSize: 18, fontWeight: "500", textAlign: "center"}}>{tile.name}</Text>
      <Text style={{color: '#fff', textAlign: "center", padding: 15}}>{new Date(tile.date).toLocaleDateString()}</Text>
      </TouchableOpacity>
    )
  }

    return (<View style={{height: Dimensions.get("window").height * 1, backgroundColor: "#33364f"}}>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#2e3048", paddingTop: 75, backgroundColor: "#33364f", 
      flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", alignItems: 'center' }}>
         {history && history.length > 0 ? history.map((tile, id) => { 
    return <Tile key={id} tile={tile} id={id} />
         }) : (
          <View style={{alignItems:"center", justifyContent: 'space-evenly' }}>
          <Text style={{color: "#e2e4f7", fontSize:40, textAlign: "center"}}>No History</Text>
          </View>
         )}
      </ScrollView>
      <View style={{alignItems: "center", flexDirection: "row", justifyContent:'center', marginTop: Dimensions.get("window").height * 0.05, marginBottom: Dimensions.get("window").height * 0.05}}>
      <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:10}} 
      onPress={() => {Haptics.selectionAsync(); navigation.navigate('Root')}}><MIcon name='arrow-back' size={32} color={"#e2e4f7"}/>
      </TouchableOpacity>
      <TouchableOpacity
              style={{
              margin:10,
              shadowColor: "#555a74", 
              shadowOffset: { height: 1.5, width: 1.5 }, 
              shadowOpacity: 1, 
              shadowRadius: 1, 
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => {Haptics.selectionAsync(); console.log("Edit Countdown")}}>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={["#e2e4f7", '#fff']} style={{borderRadius: 50, padding: 20 }}>
                <Text style={{color:'#d42c75', fontSize: 22, fontWeight: "700", paddingLeft: 25, letterSpacing: 2, paddingRight: 25}}>PAUSE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:10}} 
              onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); console.log("Delete")}}><MIcon name='delete' size={32} color={"#e2e4f7"}/>
              </TouchableOpacity> 
      </View>
              
      </View>
    );
} 