// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import RNPickerSelect from 'react-native-picker-select';

// const CountrySelectDropdown = () => {
//   const [selectedCountry, setSelectedCountry] = useState('');

//   const countries = [
//     { label: 'United States', value: 'US' },
//     { label: 'Canada', value: 'CA' },
//     { label: 'United Kingdom', value: 'UK' },
//     { label: 'Sri Lanka', value: 'LK' },
//     { label: 'Australia', value: 'AU' },
//     { label: 'India', value: 'IN' },
//     // Add more countries here...
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select a Country:</Text>

//       <RNPickerSelect
//         onValueChange={(value) => setSelectedCountry(value)}
//         items={countries}
//         placeholder={{ label: 'Select a country...', value: null }}
//         style={pickerSelectStyles}
//       />

//       {selectedCountry ? (
//         <Text style={styles.selectedText}>
//           Selected Country: {selectedCountry}
//         </Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   selectedText: {
//     marginTop: 20,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderWidth: 0.5,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
// });

// export default CountrySelectDropdown;


import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Picker as RNPicker } from '@react-native-picker/picker';

const CountrySelectDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState(''); // Holds selected country

  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Select a Country:</Text> */}

      <RNPicker
        selectedValue={selectedCountry}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCountry(itemValue)}
      >
        <RNPicker.Item label="Select a country..." value="" />
        <RNPicker.Item label="United States" value="US" />
        <RNPicker.Item label="Canada" value="CA" />
        <RNPicker.Item label="United Kingdom" value="UK" />
        <RNPicker.Item label="Sri Lanka" value="LK" />
        <RNPicker.Item label="Australia" value="AU" />
        <RNPicker.Item label="India" value="IN" />
        {/* Add more countries here */}
      </RNPicker>

      {selectedCountry ? (
        <Text style={styles.selectedText}>
          Selected Country: {selectedCountry}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: 250,
    color: '#000',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CountrySelectDropdown;
