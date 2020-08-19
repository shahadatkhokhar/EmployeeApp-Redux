import React from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image

} from 'react-native'
import {Card,FAB} from 'react-native-paper'


const Home=({navigation})=>{
    const data = [
        {id:"1",name:"Rob",email:"Rob@abc.com",salary:"12 LPA",phone:"123",position:"Web Dev",picture:"https://images.unsplash.com/photo-1551712702-4b7335dd8706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {id:"2",name:"Robin Soe",email:"robin@abc.com",salary:"10 LPA",phone:"456",position:"Android Dev",picture:"https://images.unsplash.com/photo-1551712702-4b7335dd8706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
        {id:"3",name:"Stacy Finnigan",email:"Stacy@abc.com",salary:"13 LPA",phone:"2004",position:"Linux Expert",picture:"https://images.unsplash.com/photo-1551712702-4b7335dd8706?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},

         ]

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
                keyExtractor={item=>item.id}
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