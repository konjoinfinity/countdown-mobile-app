import { ScrollView, TouchableOpacity, Text, useColorScheme, Dimensions, View, Alert } from 'react-native';
import React, {useEffect, useState} from 'react';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import CountDown from '../components/index';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wheel = [{deg: 270, hex: '#d63174'}, {deg: 279, hex: '#d63174'}, {deg: 288, hex: '#d83574'}, {deg: 297, hex: '#d83574'}, {deg: 306, hex: '#d93a74'}, {deg: 315, hex: '#d93a74'}, {deg: 324, hex: '#db3e73'}, {deg: 333, hex: '#db3e73'}, 
{deg: 342, hex: '#dd4372'}, {deg: 351, hex: '#dd4372'}, {deg: 0, hex: '#de4772'}, {deg: 9, hex: '#de4772'}, {deg: 18, hex: '#e04c72'}, {deg: 27, hex: '#e04c72'},
{deg: 36, hex: '#e25071'}, {deg: 45, hex: '#e25071'}, {deg: 54, hex: '#e45570'}, {deg: 63, hex: '#e45570'}, {deg: 72, hex: '#e65a70'}, {deg: 81, hex: '#e65a70'}, {deg: 90, hex: '#e75e70'}, {deg: 99, hex: '#e75e70'},
{deg: 108, hex: '#e9636f'},{deg: 117, hex:'#e9636f'},{deg: 126, hex: '#eb676e'},{deg: 135, hex: '#eb676e'},{deg: 144, hex: '#ec6c6e'},{deg: 153, hex: '#ec6c6e'},{deg: 162, hex: '#ee706e'},{deg: 171, hex: '#ee706e'},
{deg: 180, hex: '#f0756d'},{deg: 189, hex: '#f0756d'},{deg: 198, hex: '#f2796c'},{deg: 207, hex: '#f2796c'},{deg: 216, hex: '#f47e6c'},{deg: 225, hex: '#f47e6c'},{deg: 234, hex: '#f5826b'},{deg: 243, hex: '#f5826b'},
{deg: 252, hex: '#f7876b'},{deg: 251, hex: '#f7876b'}];

AnimatableView = Animatable.createAnimatableComponent(View);

const timerskey = "timers";
const size = 280;
const symbolSize = 280;
const radius = size / 2;
const center = radius;
let direction = true;


export default function TabOneScreen({ navigation, route }) {
  let totalsecs = (new Date(route.params.date).getTime() - new Date().getTime()) / 1000
  const { colors } = useTheme();
  let colorScheme = useColorScheme();
  const [name, setName] = useState(route.params.name)
  const [date, setDate] = useState(new Date(route.params.date))
  const [dateCreated, setDateCreated] = useState(new Date(route.params.dateCreated))
  const [id, setId] = useState(route.params.id)
  const [timers, setTimers] = useState([])
  const [count, setCount] = useState(false)
  const [degrees, setDegrees] = useState(wheel)

   function getXY(deg){
    let angleRad = deg * Math.PI / 180;
        let x = radius * Math.cos(angleRad) + center - symbolSize / 1.63;
        let y = radius * Math.sin(angleRad) + center - symbolSize / 1.63;
        return {x: x, y: y+50}
      }

      function getWheel() {
  let currentDate = new Date() 
  let createdDate = new Date(route.params.dateCreated)
  let futureDate = new Date(route.params.date)
  let timeElapsed = currentDate.getTime() - createdDate.getTime()
  let totalTime = futureDate.getTime() - createdDate.getTime()
  let percentComplete = timeElapsed / totalTime
  let wheelPercent = Math.round(percentComplete * wheel.length)
  let newWheelPerc = wheel.length - wheelPercent
    degrees.length == 0 ? "Done" : setDegrees(wheel.slice(0, newWheelPerc))
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
          setCount(true)
          getWheel()
          });
          return unsubscribe;
      }, [navigation])

      useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => { 
          setCount(false)
          totalsecs = 0;
         });
        return unsubscribe;
    }, [navigation])
    
    function Tick({x, y, deg, hex}){
      return (
        <View style={{borderRadius: 5, left: x, top: y, position:'absolute',
            height: 6, width: 60, transform: [{rotate: `${deg}deg`}], backgroundColor: hex, shadowColor: "#555a74", 
            shadowOffset: { height: 1.2, width: 1.2 }, 
            shadowOpacity: 1, 
            shadowRadius: 1, }} />
          )
      }

      const deleteTimer = async() => {
        try {
          var filtered = timers.filter(function(timer) { return timer.name !== name}); 
          setName('')
          setDate('')
          setId('')
          setTimers(filtered);
          await AsyncStorage.setItem(timerskey, JSON.stringify(filtered), () => {navigation.navigate("Root")});
        } catch (error) {
          console.log(error);
    
        }
      }

  return (
    <View style={{height: Dimensions.get("window").height * 1, backgroundColor: "#33364f", flex: 1, justifyContent:"center", alignItems: "center"}}>
      <Text style={{color:"#e2e4f7", fontSize: 30}}>{new Date(date).toLocaleDateString()}</Text>
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
      <Text style={{color:"#e2e4f7", fontSize: 28}}>{name}</Text>
      <View style={{height: Dimensions.get("window").height * 0.22}}/>
      <View style={{backgroundColor: "#3e415b", opacity: 0.8, alignSelf:"stretch", paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 10}}>
      <CountDown
        digitTxtStyle={{color: "#e2e4f7"}}
        timeLabelStyle={{color: "#e2e4f7"}}
        until={totalsecs}
        size={25}
        onChange={() => getWheel()}
        running={count}
        onFinish={() => Alert.alert("Time's up!")}
        digitStyle={{backgroundColor: "transparent"}}/>
      </View>
      <View style={{alignItems: "center", flexDirection: "row", marginTop: Dimensions.get("window").height * 0.05}}>
      <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:15}} 
      onPress={() => {Haptics.selectionAsync(); navigation.navigate('Root')}}><MIcon name='arrow-back' size={32} color={"#e2e4f7"}/>
      </TouchableOpacity>
      <TouchableOpacity
              style={{
              margin:15,
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
                <Text style={{color:'#d42c75', fontSize: 22, fontWeight: "500", paddingLeft: 25, letterSpacing: 1, paddingRight: 25}}>PAUSE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:15}} 
              onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); deleteTimer()}}><MIcon name='delete' size={32} color={"#e2e4f7"}/>
              </TouchableOpacity> 
      </View>
      </View>
  );
}
