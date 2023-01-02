import React, {useState} from 'react';
import {Text, View, FlatList, Modal, Pressable} from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {SwipableRow, AddButton} from '../../components';
import styles from './daily.styles';
const Daily = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const arr = [
    {task: 'hello 1'},
    {task: 'hello 2'},
    {task: 'hello 3'},
    {task: 'hello 4'},
  ];
  const closeModal = () => {
    setModalVisible(false);
    setTask('');
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        keyExtractor={item => item.task}
        renderItem={({item, index}) => {
          return <SwipableRow key={item.task} item={item.task} />;
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Task</Text>
            <TextInput
              style={styles.input}
              onChangeText={e => setTask(e)}
              value={task}
              placeholder="add task here"
            />
            <View style={styles.modalButtons}>
              <Pressable onPress={closeModal}>
                <Text style={styles.modalText}>Close</Text>
              </Pressable>
              <Pressable onPress={closeModal}>
                <Text style={styles.modalText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <AddButton onPress={() => setModalVisible(true)} />
    </View>
  );
};

export default Daily;
