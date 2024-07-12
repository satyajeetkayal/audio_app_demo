import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Polyline } from 'react-native-svg';
import { useLocalSearchParams } from 'expo-router';


export default function Visualizer() {
  const [audioData, setAudioData] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState([]);
  const soundRef = useRef(new Audio.Sound());
  const {name} = useLocalSearchParams()

  // useEffect(() => {
  //   return soundRef.current
  //     ? () => {
  //         soundRef.current.unloadAsync();
  //       }
  //     : undefined;
  // }, []);

    useEffect(() => {
    const loadAudio = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: name }, 
        { shouldPlay: false }
      );
      setAudioData(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isPlaying) {
          
          const randomWaveform = new Array(100)
            .fill(0)
            .map(() => Math.random() * 100);
          setWaveform(randomWaveform);
        }
        
      });
      //const { durationMillis } = await sound.getStatusAsync();
      // console.log(durationMillis)
      //setAudioDuration(durationMillis);
    };

    loadAudio();

    return () => {
      if (audioData) {
        audioData.unloadAsync();
      }
    };
  }, []);

  //   useEffect(() => {
//     const updatePosition = async () => {
//       const status = await audioData.getStatusAsync();
//       // console.log({status})
//       setPlaybackPosition(status.positionMillis);
//       const waveformData = await audioData.getWaveFormAsync({
//         timescale: 100,
//         exponent: 5,
//       });
//       console.log({waveformData})
//       setWaveform(waveformData);
//     };

//     if (isPlaying) {
//       const interval = setInterval(updatePosition, 100); // Adjust interval as needed for smoothness
//       return () => clearInterval(interval);
//     }
//   }, [isPlaying,]);

  

  const stopSound = async () => {
    if (isPlaying) {
      await audioData.stopAsync();
      setIsPlaying(false);
    }
  };

  const handlePlayPause = async () => {
        if (!audioData) return;
    
        if (!isPlaying) {
          await audioData.playAsync();
        } else {
          await audioData.pauseAsync();
        }
        setIsPlaying(!isPlaying);
      };


     // const renderWaveform = () => {
        //     if (waveform.length === 0) return null;
        //     console.log({waveform})
        
        //     const pathData = waveform.map((value, index) => {
        //       const x = (index / waveform.length) * 300; // Adjust width as needed
        //       const y = (1 - value) * 150; // Adjust height as needed
        //       return `${index === 0 ? 'M' : 'L'}${x},${y}`;
        //     });
        //     console.log({pathData})
        
        //     return (
        //       <Svg width="100%" height="100%">
        //         <Path
        //           d={`${pathData.join(' ')} L300,150 L0,150 Z`}
        //           fill="rgba(0, 0, 255, 0.5)"
        //         />
                
        //       </Svg>
        //     );
        //   };

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
      <Svg height='200' width={Dimensions.get("screen").width/1.25}>
  
  <Polyline
    points={waveform.map((y, x) => `${x * 6},${100 - y}`).join(' ')}
    fill="none"
    stroke="black"
    strokeWidth="2"

  />
</Svg>
      </View>


      <View style={{flexDirection:'row', padding:20, }}>
        <View style={{margin:10}}>
        <Button 
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={handlePlayPause}
        disabled={!audioData}
      />
        </View>
     <View style={{margin:10}}>
     <Button
        title={'Stop'}
        onPress={stopSound}
        disabled={!audioData}
      />
     </View>
      
      </View>
      
      
    </View>
  );
  //return (
    //     <View style={styles.container}>
    //       <Button
    //         title={isPlaying ? 'Pause' : 'Play'}
    //         onPress={handlePlayPause}
    //         disabled={!audioData}
    //       />
    //       <View style={styles.waveformContainer}>
    //         {renderWaveform()}
    //       </View>
    //     </View>
    //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveContainer:{
    width: '80%',
    height: 200,
    marginTop: 20,
    backgroundColor: '#f0f0f0',
  }
});



