import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, useColorScheme, Text, Animated } from 'react-native';
import { RadialGradient } from 'react-native-gradients';
import { useTheme } from '@react-navigation/native';
import MIcon from "@expo/vector-icons/MaterialIcons";
import * as Animatable from 'react-native-animatable';
import * as Haptics from 'expo-haptics';

AnimatableView = Animatable.createAnimatableComponent(View);

const size = 275 ;
const symbolSize = 16;
const radius = size / 2;
const center = radius;
let clockCall;

export function Tick({x, y, deg}){
  return (
    <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
        height: 8, width: 70, backgroundColor: "#fff", transform: [{rotate: `${deg}deg`}]
        }} />
      )
  }

export default function App({navigation}) {
  let colorScheme = useColorScheme();
  const { colors } = useTheme();
  const [timer, setTimer] = useState(30)
   const [degrees, setDegrees] = useState([0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144, 153, 162, 
    171, 180, 189, 198, 207, 216, 225, 234, 243, 252, 261, 270, 279, 288, 297, 306, 315, 324, 333, 342, 351, 360])
    const colorList = [{offset: '40%', color: '#525461', opacity: '0.3'},{offset: '75%', color: '#3c3f5f', opacity: '0.6'}]

    useEffect(() => {
     clockCall = setInterval(() => {
        decrementClock();
        clearInterval(clockCall);
      }, 1000);
      
    }, []);

   const decrementClock = () => {      
    setTimer(timer-1);
   };


function getXY(deg){
  let angleRad = deg * Math.PI / 180;
      let x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      let y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      return {x: x - 27, y: y}
    }

  function endAnim(tick) {
    if(tick == 39) {
      setDegrees([])
      setTimeout(() => {
        setDegrees([0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144, 153, 162, 
          171, 180, 189, 198, 207, 216, 225, 234, 243, 252, 261, 270, 279, 288, 297, 306, 315, 324, 333, 342, 351, 360])
      }, 500)
    } 
  }
console.log(timer)
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center', backgroundColor: "#2e3048" }}>
        <Text style={{position: "absolute", top: 100, color: colors.text, fontSize: 40}}>Countdown</Text>
        {/* <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} style={{position: 'absolute', zIndex: 2}}/> */}
        <View style={{ width: size, height: size, borderRadius: size / 2, position: "absolute"}}>
        <Text style={{fontSize: 28, color: '#fff'}}>{timer === 0 ? 'Times Up!' : `${timer}`}</Text>
        {degrees && degrees.length > 0 && (degrees.map((deg, id) => { 
          let xandy = getXY(deg)
         return <AnimatableView
           key={id}
           animation="fadeOut"
           delay={id * 500}
           duration={500}
           useNativeDriver={true}
           onAnimationEnd={() => endAnim(id)}
           onAnimationBegin={() => Haptics.selectionAsync()}>
            <Tick x={xandy.x} y={xandy.y} deg={deg} />
           </AnimatableView>
        }))}
        
    </View>
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
                <MIcon color={'#e8636e'} style={{margin: -8}} name="add-circle" size={75} />
              </TouchableOpacity>
      </View>
    );
} 
