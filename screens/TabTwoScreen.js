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

AnimatableView = Animatable.createAnimatableComponent(View);

const timerskey = "timers";
const size = 100 ;
const symbolSize = 16;
const radius = size / 2;
const center = radius;

export function Tick({x, y, deg, hex}){
  return (
    <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
        height: 6, width: 50, transform: [{rotate: `${deg}deg`}], backgroundColor: hex
        }} />
      )
  }

export default function App({navigation}) {
  let colorScheme = useColorScheme();
  const { colors } = useTheme();
  const [clock, setClock] = useState(false)
  const [counter, setCounter] = useState(30)
   const [degrees, setDegrees] = useState([{deg: 0, hex: '#f7876b'}, {deg: 9, hex: '#f7876b'}, {deg: 18, hex: '#f5826b'}, {deg: 27, hex: '#f5826b'}, {deg: 36, hex: '#f47e6c'}, {deg: 45, hex: '#f47e6c'}, 
   {deg: 54, hex: '#f2796c'}, {deg: 63, hex: '#f2796c'}, {deg: 72, hex: '#f0756d'}, {deg: 81, hex: '#f0756d'}, {deg: 90, hex: '#ee706e'}, {deg: 99, hex: '#ee706e'}, {deg: 108, hex: '#ec6c6e'}, {deg: 117, hex: '#ec6c6e'},
   {deg: 126, hex: '#eb676e'}, {deg: 135, hex: '#eb676e'}, {deg: 144, hex: '#e9636f'}, {deg: 153, hex: '#e9636f'}, {deg: 162, hex: '#e75e70'}, {deg: 171, hex: '#e75e70'}, {deg: 180, hex: '#e65a70'}, {deg: 189, hex: '#e65a70'},
   {deg: 198, hex: '#e45570'},{deg: 207, hex: '#e45570'},{deg: 216, hex: '#e25071'},{deg: 225, hex: '#e25071'},{deg: 234, hex: '#e04c72'},{deg: 243, hex: '#e04c72'},{deg: 252, hex: '#de4772'},{deg: 261, hex: '#de4772'},
   {deg: 270, hex: '#dd4372'},{deg: 279, hex: '#dd4372'},{deg: 288, hex: '#db3e73'},{deg: 297, hex: '#db3e73'},{deg: 306, hex: '#d93a74'},{deg: 315, hex: '#d93a74'},{deg: 324, hex: '#d83574'},{deg: 333, hex: '#d83574'},
   {deg: 342, hex: '#d63174'},{deg: 351, hex: '#d63174'},{deg: 360, hex: '#d42c75'}])
    const [timers, setTimers] = useState([])

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getTimers();
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

function getXY(deg){
  let angleRad = deg * Math.PI / 180;
      let x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      let y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      return {x: x - 3, y: y + 95}
    }

  function endAnim(tick) {
    if(tick == 39) {
      let degstate = degrees
      setDegrees([])
      setTimeout(() => {
        setDegrees(degstate)
      }, 500)
    } 
  }
  
  function Tick({x, y, deg, hex}){
    return (
      <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
          height: 6, width: 40, transform: [{rotate: `${deg}deg`}], backgroundColor: hex
          }} />
        )
    }

  function Tile({tile}){
    return(
<Card style={{backgroundColor: "#555a74", borderColor: "#555a74", height: Dimensions.get('window').width * 0.65, width: Dimensions.get('window').width * 0.45, marginTop: 10}}>
  {degrees && degrees.map((deg, id) => { 
  let xandy = getXY(deg.deg)
  return <AnimatableView
      key={id}
      animation="fadeOut"
      delay={id * 500}
      duration={500}
      useNativeDriver={true}
      onAnimationEnd={() => endAnim(id)}>
     <Tick x={xandy.x} y={xandy.y} deg={deg.deg} hex={deg.hex} />
      </AnimatableView>
      })}
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
      <Text style={{color: "white"}}>{tile.name}</Text>
      <Text style={{color: "white"}}>{tile.date}</Text>
      </View>
      </Card>
    )
  }

    return (
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent:"space-evenly", alignItems: 'center', backgroundColor: "#2e3048", flexDirection:"row", flexWrap:"wrap", paddingTop: 75 }}>
         {timers && timers.length > 0 ? timers.map((tile, id) => { 
    return <Tile key={id} tile={tile} />
         }) : (
          <View style={{alignItems:"center", justifyContent: 'space-evenly', height: Dimensions.get('window').height * 0.8 }}>
          <Text style={{color: "#e2e4f7", fontSize:40, textAlign: "center"}}>No Timers</Text>
          <Text style={{color: "#e2e4f7", fontSize:20, textAlign: "center"}}>Tap + to add one</Text>
          </View>
         )}
    <TouchableOpacity
              style={{position: 'absolute',
              bottom: 100,
              right: 35,
              zIndex: 2,
              shadowColor: 'rgba(255,255,255,.4)', 
              shadowOffset: { height: 1, width: 1 }, 
              shadowOpacity: 1, 
              shadowRadius: 1, 
              backgroundColor: "white",
              borderRadius: 50,
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => 
                  // setClock(true)
                navigation.navigate("Modal")
                }>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={['#d42c75', '#f7876b']} style={{borderRadius: 50 }}>
                <MIcon color={'#fff'} name="add" style={{padding: 10 }} size={70} />
                </LinearGradient>
              </TouchableOpacity>
      </ScrollView>
    );
} 
