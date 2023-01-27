import {View, TouchableOpacity, Keyboard, Dimensions } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons'

const PALETTE = [
	"#3e415b",
	'#9c9fb6',
	'#F7876B',
	'#E75C70',
	'#D63174',
	'#812E5F'
]

export default function SeetingsBar({}) {
  return (
    <View style={{display: 'flex', alignItems: "center", justifyContent:'space-evenly', flexWrap: "wrap",position: 'absolute', flexDirection: 'row',
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
</View>
  )
}