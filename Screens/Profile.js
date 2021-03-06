import React from 'react';
import { StyleSheet, Text, View, Image,Linking,Platform, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {Title, Card, Button} from 'react-native-paper'
import {MaterialIcons,Entypo,} from '@expo/vector-icons'
const Profile =(props)=>{

    const {_id,name,email,salary,phone,position,picture} = props.route.params.item

    const deleteEmployee=()=>{
        fetch('http://8fc21454c733.ngrok.io/delete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                  id:_id 
                })
        }).then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name} deleted`)
            props.navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert('Something went wrong')
        })
    }
    const openDial=()=>{
        if(Platform.OS==='android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }
    return(
        <View style={styles.root}>
        	<LinearGradient
                colors={['#e81a0c','#fc7d74']}
                style = {{height:"20%"}}
            />
            <View style = {{alignItems:'center'}}>
            <Image style={{width:140,height:140, borderRadius:140/2,marginTop:-70}}
            source= {{uri:picture}}
            />
            </View>
            <View style = {{alignItems:'center',margin:15}}>
                <Title>{name}</Title>
                <Text style = {{fontSize:18}}>{position}</Text>
            </View>
            <Card style={styles.mycard} onPress={()=>{
                Linking.openURL(`mailto:${email}`)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={32} color='red'/>
                    <Text style = {styles.mytext}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>openDial()}>
                <View style={styles.cardContent}>
                    <Entypo name="phone" size={32} color='red'/>
                    <Text style = {styles.mytext}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={32} color='red'/>
                    <Text style = {styles.mytext}>{salary}</Text>
                </View>
            </Card>
            <View style={{flexDirection:'row', justifyContent:'space-around',padding:10}}>
            <Button 
            theme={theme}
            icon='account-edit'
            mode='contained'
            onPress={() => {
                props.navigation.navigate("Create",
                {_id,name,email,salary,phone,position,picture}) 
            }}>
                     Edit
            </Button>
            <Button 
            theme={theme}
            icon='delete'
            mode='contained'
            onPress={() => deleteEmployee()}>
                     Fire Employee
            </Button> 
            </View>
            
        </View>
    )
}
const theme = {
    colors:{
        primary:'red'
    }
}
const styles = StyleSheet.create({
	root:{
		flex:1
    },
    mycard:{
        margin:3,

    },
    cardContent:{
        flexDirection:"row",
        padding:8
    },
    mytext:{
        fontSize:18,
        marginTop:3,
        marginLeft:5
    }
})

export default Profile