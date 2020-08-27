import React,{useState} from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image,
Modal,
Alert,
KeyboardAvoidingView

} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee=({navigation, route})=>{
    const getDetails =(type)=>{
        if(route.params){
            switch(type){
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }
    
    const [name,setName] = useState(getDetails("name"))
    const [phone,setPhone] = useState(getDetails("phone"))
    const [email,setEmail] = useState(getDetails("email"))
    const [salary,setSalary] = useState(getDetails("salary"))
    const [picture,setPicture] = useState(getDetails("picture"))
    const [position,setPosition] = useState(getDetails("position"))
    const [modal,setModal] = useState(false)
    const [enableshift,setenableShift] = useState(false)

    const submitData=()=>{
        fetch('http://8fc21454c733.ngrok.io/send-data',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify({
                  name,
                  email,
                  phone,
                  salary,
                  picture,
                  position
              })
        }).then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfully`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert('Error posting data')
        })
    }

    const updateDetails=()=>{
        fetch('http://8fc21454c733.ngrok.io/update',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify({
                  id:route.params._id, 
                  name,
                  email,
                  phone,
                  salary,
                  picture,
                  position
              })
        }).then(res=>res.json())
        .then(data=>{
            Alert.alert(`${data.name} is Updated`)
            navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert('Error posting data')
        })
    }

    const pickFromGallery =async()=>{
         const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
         if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`}
                handleUpload(newfile)
            }
         }else{
             Alert.alert("Camera Permission Required")
         }
    }
    const pickFromCamera =async()=>{
         const {granted} = await Permissions.askAsync(Permissions.CAMERA)
         if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:0.5
            })
            if(!data.cancelled){
                let newfile = {
                    uri:data.uri,
                    type:`test/${data.uri.split('.')[1]}`,
                    name:`test/${data.uri.split('.')[1]}`}
                handleUpload(newfile)
            }
         }else{
             Alert.alert("Camera Permission Required")
         }
    }

    const handleUpload=(image)=>{
        const data = new FormData()
        data.append('file',image)
        data.append('upload_preset','EmployeeApp')
        data.append('coud_name','robin054')

        fetch("https://api.cloudinary.com/v1_1/robin054/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            setPicture(data.url)
            setModal(false)
        })
    }
    return(
        <KeyboardAvoidingView behavior="position" style = {styles.root} enabled={enableshift} >
        <View>
            <TextInput
                label="Name"
                style = {styles.inputstyle}
                value={name}
                theme= {theme}
                onFocus ={()=>setenableShift(false)}
                mode='outlined'
            onChangeText={text => setName(text)}
            />
            <TextInput
                label="Email"
                style = {styles.inputstyle}
                value={email}
                theme= {theme}
                onFocus ={()=>setenableShift(false)}
                mode='outlined'
            onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Phone"
                style = {styles.inputstyle}
                value={phone}
                theme= {theme}
                onFocus ={()=>setenableShift(false)}
                mode='outlined'
                keyboardType="number-pad"
            onChangeText={text => setPhone(text)}
            />
            <TextInput
                label="Salary"
                style = {styles.inputstyle}
                value={salary}
                theme= {theme}
                onFocus ={()=>setenableShift(false)}
                mode='outlined'
            onChangeText={text => setSalary(text)}
            />
            <TextInput
                label="Position"
                style = {styles.inputstyle}
                value={position}
                theme= {theme}
                onFocus ={()=>setenableShift(true)}
                mode='outlined'
            onChangeText={text => setPosition(text)}
            />
            <Button 
            style = {styles.inputstyle} 
            theme= {theme}
            icon={picture==""?"upload":'check'} 
            mode="contained" 
            onPress={() => setModal(true)}>
            Upload Image
            </Button>

            {!route.params?
            <Button 
            style = {styles.inputstyle} 
            theme= {theme}
            icon="content-save" 
            mode="contained" 
            onPress={() => submitData()}>
            Save
            </Button>
            :
            <Button 
            style = {styles.inputstyle} 
            theme= {theme}
            icon="content-save" 
            mode="contained" 
            onPress={() => updateDetails()}>
            Update details
            </Button>
            }
            
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>{
                setModal(false)
            }}
            >
                <View style = {styles.modelView}>
                    <View style = {styles.modalButtonView}>
                    <Button 
                    icon="camera" 
                    theme= {theme}
                    mode="contained"
                    onPress={() => pickFromCamera()}>
                        Camera
                    </Button>
                    <Button 
                    icon="image-area" 
                    theme= {theme}
                    mode="contained" 
                    onPress={() => pickFromGallery()} >
                        Gallery
                    </Button>
                </View>
                <Button 
                theme= {theme}
                onPress={() => setModal(false)}>
                        Cancel
                </Button>
                </View>
            </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}
const theme = {
    colors:{
        primary:'red'
    }
}
const styles= StyleSheet.create({
    root:{
        flex:1
    },
    inputstyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:'row',
        justifyContent:"space-around",
        padding:10
    },
    modelView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"#ffd9d9"

    }
})
export default CreateEmployee