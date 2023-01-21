import { ScrollView, TouchableOpacity, Text, useColorScheme, Dimensions, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import CountDown from 'react-native-countdown-component';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

AnimatableView = Animatable.createAnimatableComponent(View);

const timerskey = "timers";
const size = 280;
const symbolSize = 280;
const radius = size / 2;
const center = radius;
let direction = true;


export default function TabOneScreen({ navigation, route }) {
  const { colors } = useTheme();
  let colorScheme = useColorScheme();
  const [name, setName] = useState(route.params.name)
  const [date, setDate] = useState(new Date(route.params.date))
  const [id, setId] = useState(route.params.id)
  const [timers, setTimers] = useState([])
  let totalsecs = (new Date(route.params.date).getTime() - new Date().getTime()) / 1000;
  const [degrees, setDegrees] = useState([{deg: 0, hex: '#f7876b'}, {deg: 9, hex: '#f7876b'}, {deg: 18, hex: '#f5826b'}, {deg: 27, hex: '#f5826b'}, {deg: 36, hex: '#f47e6c'}, {deg: 45, hex: '#f47e6c'}, 
   {deg: 54, hex: '#f2796c'}, {deg: 63, hex: '#f2796c'}, {deg: 72, hex: '#f0756d'}, {deg: 81, hex: '#f0756d'}, {deg: 90, hex: '#ee706e'}, {deg: 99, hex: '#ee706e'}, {deg: 108, hex: '#ec6c6e'}, {deg: 117, hex: '#ec6c6e'},
   {deg: 126, hex: '#eb676e'}, {deg: 135, hex: '#eb676e'}, {deg: 144, hex: '#e9636f'}, {deg: 153, hex: '#e9636f'}, {deg: 162, hex: '#e75e70'}, {deg: 171, hex: '#e75e70'}, {deg: 180, hex: '#e65a70'}, {deg: 189, hex: '#e65a70'},
   {deg: 198, hex: '#e45570'},{deg: 207, hex: '#e45570'},{deg: 216, hex: '#e25071'},{deg: 225, hex: '#e25071'},{deg: 234, hex: '#e04c72'},{deg: 243, hex: '#e04c72'},{deg: 252, hex: '#de4772'},{deg: 261, hex: '#de4772'},
   {deg: 270, hex: '#dd4372'},{deg: 279, hex: '#dd4372'},{deg: 288, hex: '#db3e73'},{deg: 297, hex: '#db3e73'},{deg: 306, hex: '#d93a74'},{deg: 315, hex: '#d93a74'},{deg: 324, hex: '#d83574'},{deg: 333, hex: '#d83574'},
   {deg: 342, hex: '#d63174'},{deg: 351, hex: '#d63174'},{deg: 360, hex: '#d42c75'}])
  
   function getXY(deg){
    let angleRad = deg * Math.PI / 180;
        let x = radius * Math.cos(angleRad) + center - symbolSize / 1.63;
        let y = radius * Math.sin(angleRad) + center - symbolSize / 1.63;
        return {x: x, y: y+50}
      }
  
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
          totalsecs = (new Date(route.params.date).getTime() - new Date().getTime()) / 1000;
          });
          return unsubscribe;
      }, [navigation])

      useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { 
          totalsecs = 0;
         });
        return unsubscribe;
    }, [navigation])
    
    function Tick({x, y, deg, hex}){
      return (
        <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
            height: 6, width: 60, transform: [{rotate: `${deg}deg`}], backgroundColor: hex}} />
          )
      }

      const deleteTimer = async() => {
        try {
          var filtered = timers.filter(function(timer, id) { return id !== id}); 
          setName('')
          setDate('')
          setId('')
          setTimers(filtered);
          console.log(filtered)
          console.log(timers)
          // await AsyncStorage.setItem(logskey, JSON.stringify(filtered), () => {navigation.navigate("TabThree")});
        } catch (error) {
          console.log(error);
    
        }
      }

  return (
    <View style={{height: Dimensions.get("window").height * 1, backgroundColor: "#33364f", flex: 1, justifyContent:"center", alignItems: "center"}}>
      <Text style={{color:"#e2e4f7", fontSize: 30}}>{new Date(date).toDateString()}</Text>
      <View style={{height: Dimensions.get("window").height * 0.22}}/>
       {degrees && degrees.map((deg, id) => { 
  let xandy = getXY(deg.deg)
  return <AnimatableView
      key={id}
      animation={"fadeIn"}
      delay={id * 50}
      duration={50}
      useNativeDriver={true}>
     <Tick x={xandy.x} y={xandy.y} deg={deg.deg} hex={deg.hex} />
      </AnimatableView>
      })}
        

          
          
      <Text style={{color:"#e2e4f7", fontSize: 30}}>{name}</Text>
      <View style={{height: Dimensions.get("window").height * 0.22}}/>
      <View style={{backgroundColor: "#3e415b", opacity: 0.8, alignSelf:"stretch", paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 10}}>
      <CountDown
        digitTxtStyle={{color: "#e2e4f7"}}
        timeLabelStyle={{color: "#e2e4f7"}}
        until={totalsecs}
        size={25}
        digitStyle={{backgroundColor: "transparent"}}/>
      </View>
       
      
      <View style={{alignItems: "center", flexDirection: "row", marginTop: Dimensions.get("window").height * 0.05}}>
      <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:15}} onPress={() => {Haptics.selectionAsync(); navigation.navigate('Root')}}><MIcon name='arrow-back' size={32} color={"#e2e4f7"}/></TouchableOpacity>
      <TouchableOpacity
              style={{
              margin:15,
              shadowColor: colorScheme == "dark" ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.4)', 
              shadowOffset: { height: 0.5, width: 0.5 }, 
              shadowOpacity: 0.6, 
              shadowRadius: 1, 
              elevation: 8, 
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'}}
                onPress={() => {Haptics.selectionAsync(); console.log("Edit Countdown")}}>
                  <LinearGradient start={{x: 0.01, y: 0.25}} end={{ x: 0.99, y: 0.75 }} locations={[0.01, 0.99]} colors={["#e2e4f7", '#fff']} style={{borderRadius: 50, padding: 20 }}>
                <Text style={{color:'#d42c75', fontSize: 22, fontWeight: "500", paddingLeft: 25, letterSpacing: 1, paddingRight: 25}}>PAUSE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:15}} onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); deleteTimer()}}><MIcon name='delete' size={32} color={"#e2e4f7"}/></TouchableOpacity> 
      </View>
      </View>
  );
}
