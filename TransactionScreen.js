import  React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class TransactionScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      hasCameraPermissions: "",
      scanned:false,
      buttonState:"normal",
      scannedBookID: "",
      scannedStudentID: "",
    }
  }
  getCameraPermissions = async ()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermissions:status === "granted"})
  }

  handleBarCodeScanner = async ({type,data}) => {
    const {buttonState} = this.state
    if(buttonState === "BookID"){
      this.setState({scanned:true, scannedBookID:data, buttonState:"normal"})
    }else if(buttonState === "StudentID"){
      this.setState({scanned:true, scannedStudentID:data, buttonState:"normal"})
    }
  }
 render(){
     const hasCameraPermissions = this.state.hasCameraPermissions
     const scanned = this.state.scanned
     const buttonState = this.state.buttonState
     if(buttonState != "normal"&&hasCameraPermissions){
         return(
             <BarCodeScanner onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanner} style = {StyleSheet.absoluteFillObject}></BarCodeScanner>
         )
     }else if(
         buttonState === "normal"
     ){
   return(
       <View style = {styles.container}>
       <View>
         <Image source = {require("../assets/booklogo.jpg")} style = {{width:200, height:200}} />
         <Text style = {{textAlign:"center", fontSize: 30}}>Wi-Fi-Library</Text>
       </View>
       <View style = {styles.inputView}>
       <TextInput style = {styles.inputBox} placeholder = "BookID" value = {this.state.scannedBookID}/>
       <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions("BookID")}>
     <Text style = {styles.buttonText}>Scan-QR-Code</Text>
     </TouchableOpacity>

     <TextInput style = {styles.inputBox} placeholder = "StudentID" value = {this.state.scannedStudentID}/>
       <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions("StudentID")}>
     <Text style = {styles.buttonText}>Scan-QR-Code</Text>
     </TouchableOpacity>
     </View>
     </View>
   )
     }
 }
}
const styles = StyleSheet.create({
   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    displayText:{ fontSize: 15, textDecorationLine: 'underline' },
     scanButton:{ backgroundColor: '#2196F3', padding: 10, margin: 10 },
      buttonText:{ fontSize: 20, } });
