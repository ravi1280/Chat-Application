import React from 'react';
import { StyleSheet, } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function ErrorAlert({showAlert,alertMessage,hideAlert,showConbutton=false,onConfirmPressed1
 }) {

    return (


        <AwesomeAlert
          show={showAlert}
          showProgress={false}   
          title=" Message ❗"
          message={alertMessage}
          // closeOnTouchOutside={true} 
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={showConbutton}

        
          confirmText="Confirm"
          confirmButtonColor="#c79be8"
          // cancelText="    Ok    "
          cancelText={"Back"}
          cancelButtonColor='#c79be8' 
          onCancelPressed={hideAlert}
          onConfirmPressed={onConfirmPressed1}
        />
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
