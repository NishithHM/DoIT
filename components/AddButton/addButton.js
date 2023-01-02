import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import styles from './addButton.styles';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
const AddButton = ({onPress}) => {
  return (
    <View style={styles.buttonStyle}>
      <TouchableWithoutFeedback onPress={onPress}>
        <IconF size={25} name="plus" color={'white'} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddButton;
