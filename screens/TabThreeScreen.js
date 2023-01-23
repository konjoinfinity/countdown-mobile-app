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
<TouchableOpacity style={{backgroundColor: "#555a74", borderColor: "#555a74", height: Dimensions.get('window').width * 0.45, 
width: Dimensions.get('window').width * 0.45, marginTop: 10, borderRadius: 5, margin: 5}} 
onLongPress={() => {Haptics.selectionAsync()}}>
  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={["#555a74", "#3e415b"]} style={{borderRadius: 5, height: Dimensions.get('window').width * 0.45 }}>
      <View style={{backgroundColor: tile.color, opacity: 0.8, alignSelf:"stretch", height: Dimensions.get('window').width * 0.15, justifyContent: 'center' }}>
      <Text style={{color: "#e2e4f7", fontSize: 16, fontWeight: "500", textAlign: "center"}}>{new Date(tile.date).toLocaleDateString()}</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
      <Text style={{color: "#e2e4f7", fontSize: 18, fontWeight: "500", textAlign: "center", marginTop: Dimensions.get('window').width * 0.1, paddingLeft: 5, paddingRight: 5}}>{tile.name}</Text>
      </View>
      </LinearGradient>
      </TouchableOpacity>
    )
  }

    return (<View style={{ backgroundColor: "#33364f" , flex: 1, justifyContent:"center", alignItems: "center"}}>
      <View style={{ justifyContent:'center', alignItems: 'flex-end', height: Dimensions.get('window').height * 0.15, flexDirection: 'row' }}>
      <TouchableOpacity style={{ borderRadius: 50, padding: 15, margin:10}} 
      onPress={() => {Haptics.selectionAsync(); navigation.navigate('Root')}}><MIcon name='arrow-back' size={32} color={"#e2e4f7"}/>
      </TouchableOpacity>
      <Text style={{color:"#e2e4f7", fontSize: 25, fontWeight: "600", letterSpacing: 1.5, paddingLeft: Dimensions.get('window').width * 0.07, 
      paddingRight: Dimensions.get('window').width * 0.07, padding: 15, margin:10 }}>HISTORY</Text>
      <TouchableOpacity disabled={true} style={{ borderRadius: 50, padding: 15, opacity: 0.1, margin:10}}><MIcon name='arrow-back' size={32} color={"#33364f"}/>
      </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#2e3048", backgroundColor: "#33364f", 
      flexDirection:"row", flexWrap:"wrap", justifyContent:"space-evenly", alignItems: 'center' }}>
         {history && history.length > 0 ? history.map((tile, id) => { 
    return <Tile key={id} tile={tile} id={id} />
         }) : (
          <View style={{alignItems:"center", justifyContent: 'space-evenly' }}>
          <Text style={{color: "#e2e4f7", fontSize:40, textAlign: "center"}}>No History</Text>
          </View>
         )}
      </ScrollView>     
      </View>
    );
} 
