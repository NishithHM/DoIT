/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './splash.styles';
import stairs from '../../assets/stairs.png';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('DrawerStack');
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Image source={stairs} />
        <Text style={styles.subText}>Breaking Impossible to Possibilities</Text>
      </View>
    </View>
  );
};

export default Splash;
