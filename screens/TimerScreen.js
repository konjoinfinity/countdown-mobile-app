import { ScrollView, TouchableOpacity, Text, useColorScheme, Dimensions, View, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, {useEffect, useState} from 'react';
import MIcon from "@expo/vector-icons/MaterialIcons";
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import CountDown from '../components/index';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const wheel = [{deg: 270, hex: '#d63174'}, {deg: 279, hex: '#d63174'}, {deg: 288, hex: '#d83574'}, {deg: 297, hex: '#d83574'}, {deg: 306, hex: '#d93a74'}, {deg: 315, hex: '#d93a74'}, {deg: 324, hex: '#db3e73'}, {deg: 333, hex: '#db3e73'}, 
{deg: 342, hex: '#dd4372'}, {deg: 351, hex: '#dd4372'}, {deg: 0, hex: '#de4772'}, {deg: 9, hex: '#de4772'}, {deg: 18, hex: '#e04c72'}, {deg: 27, hex: '#e04c72'},
{deg: 36, hex: '#e25071'}, {deg: 45, hex: '#e25071'}, {deg: 54, hex: '#e45570'}, {deg: 63, hex: '#e45570'}, {deg: 72, hex: '#e65a70'}, {deg: 81, hex: '#e65a70'}, {deg: 90, hex: '#e75e70'}, {deg: 99, hex: '#e75e70'},
{deg: 108, hex: '#e9636f'},{deg: 117, hex:'#e9636f'},{deg: 126, hex: '#eb676e'},{deg: 135, hex: '#eb676e'},{deg: 144, hex: '#ec6c6e'},{deg: 153, hex: '#ec6c6e'},{deg: 162, hex: '#ee706e'},{deg: 171, hex: '#ee706e'},
{deg: 180, hex: '#f0756d'},{deg: 189, hex: '#f0756d'},{deg: 198, hex: '#f2796c'},{deg: 207, hex: '#f2796c'},{deg: 216, hex: '#f47e6c'},{deg: 225, hex: '#f47e6c'},{deg: 234, hex: '#f5826b'},{deg: 243, hex: '#f5826b'},
{deg: 252, hex: '#f7876b'},{deg: 251, hex: '#f7876b'}];

AnimatableView = Animatable.createAnimatableComponent(View);

const timerskey = "timers";
const size = Dimensions.get("window").width * 0.75
const symbolSize = Dimensions.get("window").width * 0.75
const radius = size / 2;
const center = radius;
let direction = true;
const PALETTE = [
	"#3e415b",
	'#9c9fb6',
	'#F7876B',
	'#E75C70',
	'#D63174',
	'#812E5F'
]

export default function TimerScreen({ navigation, route }) {
  let totalsecs = (new Date(route.params.date).getTime() - new Date().getTime()) / 1000
  const { colors } = useTheme();
  let colorScheme = useColorScheme();
  const [name, setName] = useState(route.params.name)
  const [date, setDate] = useState(new Date(route.params.date))
  const [dateCreated, setDateCreated] = useState(new Date(route.params.dateCreated))
  const [cardColor, setCardColor] = useState(route.params.color)
  const [id, setId] = useState(route.params.id)
  const [timers, setTimers] = useState([])
  const [count, setCount] = useState(false)
  const [degrees, setDegrees] = useState(wheel)
  const [colorSetting, setColorSetting] = useState(false)

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
          let newTimers = timers
          newTimers.splice(id, 1); 
          setName('')
          setDate('')
          setId('')
          setTimers(newTimers);
          await AsyncStorage.setItem(timerskey, JSON.stringify(newTimers), () => {navigation.navigate("Timers")});
        } catch (error) {
          console.log(error);
        }
      }

      const goBack = async() => {
        try {
          Haptics.selectionAsync();
          var editTimer = timers;
          editTimer[id] = { name: name, date: date, dateCreated:  dateCreated, color: cardColor };
          setTimers(editTimer)
          await AsyncStorage.setItem(timerskey, JSON.stringify(editTimer));
          navigation.navigate("Timers")
        } catch (error) {
          console.log(error);
        }
      }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{height: Dimensions.get("window").height * 1, backgroundColor: "#33364f", flex: 1, justifyContent:"center", alignItems: "center"}}>
      <Text style={{color:"#e2e4f7", fontSize: 25, fontWeight: "600", letterSpacing: 1.5}}>TIMER</Text>
      <TouchableOpacity style={{position:'absolute', top: Dimensions.get("window").height * 0.0725, right: Dimensions.get("window").width * 0.08, padding: 15}} 
              onPress={() => { Haptics.selectionAsync(); colorSetting == false ? setColorSetting(true) : setColorSetting(false)}}><AntDesign name="setting" size={28} color={"#e2e4f7"}/>
              </TouchableOpacity> 
              {colorSetting === true && <View style={{display: 'flex', alignItems: "center", justifyContent:'space-evenly', flexWrap: "wrap",position: 'absolute', flexDirection: 'row',
          top: Dimensions.get("window").width * 0.33,right: 0,backgroundColor: '#2E3048', borderRadius: 5, shadowColor:"#555a74", width: Dimensions.get("window").width * 1,
          shadowOffset: { height: 1.5, width: 1.5 }, 
          shadowOpacity: 1, 
          shadowRadius: 1, 
          elevation: 8, padding: 10, zIndex:1 }}> 
          {PALETTE.map((color, id) => {
            return <TouchableOpacity key={id} onPress={() => setCardColor(color)} style={{backgroundColor:color, 
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

      <View style={{height: Dimensions.get("window").height * 0.25}}/>
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
      <View style={{ height: Dimensions.get("window").height * 0.22, width: Dimensions.get("window").height * 0.22, borderRadius: 100, 
      position: 'absolute', justifyContent: 'center', alignItems: "center", bottom: Dimensions.get("window").height * 0.441}}>
      <CountDown
        digitTxtStyle={{color: "#e2e4f7"}}
        separatorStyle={{color: "#e2e4f7", margin: 0, padding: 0}}
        showSeparator={true}
        until={totalsecs}
        size={25}
        onChange={() => getWheel()}
        running={count}
        onFinish={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); Alert.alert("Time's up!"); navigation.navigate("Root")}}
        digitStyle={{backgroundColor: "transparent"}}/>
      </View>
      <View style={{height: Dimensions.get("window").height * 0.25}}/>
      <View style={{alignItems: "center", flexDirection: "row", marginTop: Dimensions.get("window").height * 0.05}}>
      <TouchableOpacity style={{backgroundColor: '#3e415b', borderRadius: 50, padding: 15, opacity: 0.5, margin:10}} 
      onPress={() => goBack()}><MIcon name='arrow-back' size={32} color={"#e2e4f7"}/>
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
              onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); deleteTimer()}}><MIcon name='delete' size={32} color={"#e2e4f7"}/>
              </TouchableOpacity> 
      </View>
      </View>
      </TouchableWithoutFeedback>
  );
}
