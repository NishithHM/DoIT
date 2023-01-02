import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './swipableRow.styles';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipableRow = ({item}) => {
  const swipeRef = useRef();
  const updateRef = ref => {
    swipeRef.current = ref;
  };
  const onClose = () => {
    swipeRef.current.close();
  };
  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.leftAction} onPress={onClose}>
        <AnimatedIcon
          name="done"
          size={30}
          color="#fff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={onClose}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
  };
  return (
    <View style={styles.viewStyle}>
      <Swipeable
        ref={updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={41}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}>
        <Text style={styles.text}>{item}</Text>
      </Swipeable>
    </View>
  );
};

export default SwipableRow;
