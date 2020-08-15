import React,{useState} from 'react'
import {
StyleSheet, 
Text,
View,
FlatList,
Image,
Modal

} from 'react-native'
import {TextInput,Button} from 'react-native-paper'

const CreateEmployee=()=>{
    const [Name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [salary,setSalary] = useState("")
    const [modal,setModal] = useState(false)

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
        icon="upload" 
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
                onPress={() => console.log("camera")}>
                     Camera
                </Button>
                <Button 
                icon="image-area" 
                theme= {theme}
                mode="contained" 
                onPress={() => console.log("gallery")} >
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