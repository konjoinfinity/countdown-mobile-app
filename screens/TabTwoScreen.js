import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { RadialGradient } from 'react-native-gradients';
import { useTheme } from '@react-navigation/native';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from 'expo-linear-gradient';

const size = 250 ;
const symbolSize = 16;
const radius = size / 2;
const center = radius;


export default function App({navigation}) {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [x2, setX2] = useState(0)
    const [y2, setY2] = useState(0)
    const [x3, setX3] = useState(0)
    const [y3, setY3] = useState(0)
    const [x4, setX4] = useState(0)
    const [y4, setY4] = useState(0)
    const [x5, setX5] = useState(0)
    const [y5, setY5] = useState(0)
    const [x6, setX6] = useState(0)
    const [y6, setY6] = useState(0)
    const [x7, setX7] = useState(0)
    const [y7, setY7] = useState(0)
    const [x8, setX8] = useState(0)
    const [y8, setY8] = useState(0)
    const [x9, setX9] = useState(0)
    const [y9, setY9] = useState(0)
    const { colors } = useTheme();
  let colorScheme = useColorScheme();

    const colorList = [
      {offset: '40%', color: '#525461', opacity: '0.6'},
      {offset: '85%', color: '#363747', opacity: '0.6'}
    ]

  useEffect(() => {
    setup1(); 
    setup2();
    setup3();
    setup4();
    setup5();
    setup6();
    setup7();
    setup8();
    setup9();
  }, []);

  function degToRad(deg) {
  return deg * Math.PI / 180;
}

function setup1(){
  const angleRad = degToRad(0);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX(x - 20)
      setY(y)
}

function setup2(){
  const angleRad = degToRad(45);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX2(x - 20)
      setY2(y)
}

function setup3(){
  const angleRad = degToRad(90);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX3(x - 20)
      setY3(y)
}

function setup4(){
  const angleRad = degToRad(135);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX4(x - 20)
      setY4(y)
}

function setup5(){
  const angleRad = degToRad(180);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX5(x - 20)
      setY5(y)
}

function setup6(){
  const angleRad = degToRad(225);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX6(x - 20)
      setY6(y)
}

function setup7(){
  const angleRad = degToRad(270);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX7(x - 20)
      setY7(y)
}

function setup8(){
  const angleRad = degToRad(360);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX8(x - 20)
      setY8(y)
}

function setup9(){
  const angleRad = degToRad(-45);
      const x = radius * Math.cos(angleRad) + center - symbolSize / 2;
      const y = radius * Math.sin(angleRad) + center - symbolSize / 2;
      setX9(x - 20)
      setY9(y)
}

    return (
      
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
        <RadialGradient x="50%" y="50%" rx="50%" ry="50%" colorList={colorList} style={{position: 'absolute', zIndex: 2}}/>
        <View style={{ width: size, height: size, borderRadius: size / 2, position: "absolute"}}>
       <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff" }} />
        <View style={{borderRadius: 5, left: x2, top: y2, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '45deg'}]
        }} />
        <View style={{borderRadius: 5, left: x3, top: y3, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '90deg'}]
        }} />
        <View style={{borderRadius: 5, left: x4, top: y4, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '135deg'}]
        }} />
        <View style={{borderRadius: 5, left: x5, top: y5, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '180deg'}]
        }} />
        <View style={{borderRadius: 5, left: x6, top: y6, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '225deg'}]
        }} />
        <View style={{borderRadius: 5, left: x7, top: y7, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '270deg'}]
        }} />
        <View style={{borderRadius: 5, left: x8, top: y8, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '360deg'}]
        }} />
       <View style={{borderRadius: 5, left: x9, top: y9, position:'absolute',
        height: 20, width: 50, backgroundColor: "#fff", transform: [{rotate: '-45deg'}]
        }} />
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
                <MIcon color={colors.primary} style={{margin: -8}} name="add-circle" size={75} />
              </TouchableOpacity>
      </View>
    );
} 
