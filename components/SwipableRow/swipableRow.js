import React, {useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './swipableRow.styles';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

const SwipableRow = ({
  item,
  id,
  onDelete,
  onDone,
  status,
  streak,
  route,
  onCancel = () => null,
}) => {
  const swipeRef = useRef();

  const updateRef = ref => {
    swipeRef.current = ref;
  };

  const onClose = () => {
    swipeRef.current.close();
  };

  const onDeleteSwipe = () => {
    onDelete(id);
    onClose();
  };

  const onDoneSwipe = () => {
    onDone(id);
    onClose();
  };

  const onCancelSwipe = () => {
    onCancel(id);
    onClose();
  };
  const renderLeftActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <>
        <RectButton style={styles.leftAction} onPress={onDoneSwipe}>
          <AnimatedIcon
            name="done"
            size={30}
            color="#fff"
            style={[styles.actionIcon]}
          />
        </RectButton>
      </>
    );
  };
  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <>
        <RectButton style={styles.rightAction} onPress={onDeleteSwipe}>
          <AnimatedIcon
            name="delete-forever"
            size={30}
            color="#fff"
            style={[styles.actionIcon]}
          />
        </RectButton>
        {route === 'Streaks' && (
          <RectButton style={styles.leftActionCancel} onPress={onCancelSwipe}>
            <AnimatedIcon
              name="cancel"
              size={30}
              color="#fff"
              style={[styles.actionIcon]}
            />
          </RectButton>
        )}
      </>
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
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.text,
              backgroundColor: status === 1 ? 'lightgreen' : 'lightgrey',
            }}>
            {item}&emsp;
          </Text>
          {streak > 0 && <Text style={styles.streak}>{streak}</Text>}
        </View>
      </Swipeable>
    </View>
  );
};

export default SwipableRow;
