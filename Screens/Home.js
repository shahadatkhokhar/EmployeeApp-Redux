import React, {useEffect,useState} from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image,
ActivityIndicator, 
Alert

} from 'react-native'
import {Card,FAB} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import { State } from 'react-native-gesture-handler'


const Home=({navigation})=>{
    //const [data,setData] = useState([])
    //const [loading,setLoading] = useState(true)
    const displatch = useDispatch()
    const {data,loading} = useSelector((state)=>{
        return state
    })

    const fetchData =()=>{
        fetch('http://8fc21454c733.ngrok.io')
        .then(res=>res.json())
        .then(results=>{
            //setData(results)
            //setLoading(false)
            displatch({type:"ADD_DATA",payload:results})
            displatch({type:"SET_LOADING",payload:false})
        }).catch(err=>{
            Alert.alert('Something went wrong')
        })
    }
    useEffect(()=>{
        fetchData()
    },[])

    const renderList = ((item)=>{
        return(
        <Card 
        style={styles.mycard}
        onPress={()=>navigation.navigate('Profile',{item})}>
        <View style={styles.cardView}>
            <Image
            style={{width:60,height:60,borderRadius:30}}
            source={{uri:item.picture}}
            
            />
            <View style={{marginLeft:10}}>
                <Text style={styles.text}>{item.name}</Text>   
                <Text style={styles.text}>{item.position}</Text>      
            </View>
        
        </View>
        </Card>
        )
    })
    return(
        <View style = {{flex:1}}>
            <FlatList 
            data = {data}
            renderItem={({item})=>{
               return renderList(item)
            }}
            keyExtractor={item=>item._id}
            onRefresh ={()=>fetchData()}
            refreshing={loading}
        />
            
            <FAB 
            onPress = {()=>navigation.navigate('Create')}
            style={styles.fab}
          small={false}
          icon="plus"
          theme={{
              colors:{
                accent: '#fc0000',
              }

          }}
             />

        </View>
        
    )
}
const styles = StyleSheet.create({
    mycard:{
        margin:5,
        padding:5,
        backgroundColor:'#bfbdbd'
    },
    cardView:{
        flexDirection:"row",
        padding:6
   },
   text:{
       fontSize:18,
   },
   fab: {
       position: 'absolute',
       margin: 16,
       right: 0,
       bottom: 0,
     }, 
     fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
     
})

export default Home; 