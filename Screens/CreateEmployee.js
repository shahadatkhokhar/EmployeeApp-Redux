import React,{useState} from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image,
Modal,
Alert

} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee=()=>{
    const [Name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [salary,setSalary] = useState("")
    const [picture,setPicture] = useState("")
    const [modal,setModal] = useState(false)

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
            console.log(data)
            setPicture(data.url)
            setModal(false)
        })
    }
    return(
        <View style = {styles.root}>
        <TextInput
            label="Name"
            style = {styles.inputstyle}
            value={Name}
            theme= {theme}
            mode='outlined'
        onChangeText={text => setName(text)}
        />
        <TextInput
            label="Email"
            style = {styles.inputstyle}
            value={email}
            theme= {theme}
            mode='outlined'
        onChangeText={text => setEmail(text)}
        />
        <TextInput
            label="Phone"
            style = {styles.inputstyle}
            value={phone}
            theme= {theme}
            mode='outlined'
            keyboardType="number-pad"
        onChangeText={text => setPhone(text)}
        />
        <TextInput
            label="Salary"
            style = {styles.inputstyle}
            value={salary}
            theme= {theme}
            mode='outlined'
        onChangeText={text => setSalary(text)}
        />
        <Button 
        style = {styles.inputstyle} 
        theme= {theme}
        icon={picture==""?"upload":'check'} 
        mode="contained" 
        onPress={() => setModal(true)}>
        Upload Image
        </Button>

        <Button 
        style = {styles.inputstyle} 
        theme= {theme}
        icon="content-save" 
        mode="contained" 
        onPress={() => console.log("save")}>
        Save
        </Button>
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