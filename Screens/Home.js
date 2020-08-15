import React from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image

} from 'react-native'
import {Card,FAB} from 'react-native-paper'

const renderList = ((item)=>{
    return(
      <Card style={styles.mycard}>
      <View style={styles.cardView}>
           <Image
          style={{width:60,height:60,borderRadius:30}}
          source={{uri:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fblog%2Ftake-pictures-moon&psig=AOvVaw3cEqAsOi1RUC6CcA9CSQmF&ust=1596882212498000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjlovvviOsCFQAAAAAdAAAAABAD"}}
          
          />
          <View style={{marginLeft:10}}>
              <Text style={styles.text}>{item.name}</Text>   
               <Text style={styles.text}>{item.position}</Text>      
          </View>
     
      </View>
      
     </Card>
    )
})
const Home=()=>{
    const data = [
        {id:1,name:"Mukesh",position:"web dev"},
        {id:2,name:"bhukesh",position:"web dev2"},
        {id:3,name:"pukesh",position:"web dev3"},
        {id:4,name:"Thukesh",position:"web dev4"},
        {id:5,name:"Thukesh",position:"web dev4"},
        {id:6,name:"Thukesh",position:"web dev4"},
        {id:7,name:"Thukesh",position:"web dev4"},
        {id:8,name:"Thukesh",position:"web dev4"},
    ]
    return(
        <View>
            <FlatList 
                data = {data}
                renderItem={({item})=>{
                   return renderList(item)
                }}
                keyExtractor={item=>`${item.id}`}
            />
            <FAB
            style={styles.fab}
          small={false}
          icon="plus"
          theme={{
              colors:{
                accent: '#fc0000',
              }

          }}
          onPress={() => console.log('Pressed')}
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