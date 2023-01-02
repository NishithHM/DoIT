import React, {useState} from 'react';
import {Text, View, FlatList, Modal, Pressable, TextInput} from 'react-native';
import {SwipableRow, AddButton} from '..';
import styles from './taskRenderer.styles';
import {useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';

const TaskRenderer = ({list, onAdd, isAdd = true, onDelete, onDone}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const route = useRoute();

  const closeModal = () => {
    setModalVisible(false);
    setTask('');
  };
  const onAddTask = () => {
    onAdd(task);
    closeModal();
  };
  const getTitle = () => {
    switch (route.name) {
      case 'Today':
        return dayjs().format('DD-MM-YYYY, ddd');
      case 'Weekly':
        return 'This week';
      case 'Monthly':
        return dayjs().format('MM-YYYY, MMM');
      case 'Yearly':
        return dayjs().format('YYYY');
      case 'Streaks':
        return 'Lets not break it';
      case 'Overdue':
        return 'Please look on it';
      default:
        'No task';
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{getTitle()}</Text>
      </View>
      <FlatList
        data={list}
        keyExtractor={item => item._id.toString()}
        renderItem={({item, index}) => {
          return (
            <SwipableRow
              onDelete={onDelete}
              onDone={onDone}
              key={item._id}
              item={item.name}
              id={item._id}
              status={item.status}
              streak={item.streak}
            />
          );
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
              <Pressable onPress={onAddTask}>
                <Text style={styles.modalText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {isAdd && <AddButton onPress={() => setModalVisible(true)} />}
    </View>
  );
};

export default TaskRenderer;
