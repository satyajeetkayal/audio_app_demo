import { Link, Stack, useNavigation } from 'expo-router';
import { Image, Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';



export default function Home() {
  const [fileName, setFileName] = useState([]);
  const navigation= useNavigation()

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: 'audio/*', copyToCacheDirectory:true })
   console.log(result.assets)

   setFileName(result.assets);
   
    // if (result.type === 'success') {
        
    //   setFileName(result.name);
    // }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Home',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

         
        }}
      />
       {fileName ? <Text  style={styles.title}>{fileName[0]?.name}</Text> : null}
      <Button title="Pick an Audio File" onPress={pickDocument} />
      <Link style={styles.link} href={{ pathname: 'visual', params: { name: fileName[0]?.uri } }}>Go to Visualizer</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link:{
    marginTop:25,
    backgroundColor:'#ffff',
    borderWidth:0.5,
    borderColor:'grey',
    borderRadius:2,
    padding:10

  }
});