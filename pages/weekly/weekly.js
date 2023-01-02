import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TaskRenderer} from '../../components';
import styles from './weekly.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;

const Weekly = () => {
  const [update, setUpdate] = useState(false);
  const realm = useRealm();
  const tasks = realm.objects('Task');
  const weeklyTask = tasks.filtered("type == 'weekly' && isActive == true");
  const onAddTask = async task => {
    realm.write(() => {
      realm.create(
        'Task',
        Task.generate(task, 0, dayjs().endOf('week').toDate(), 'weekly'),
      );
    });
  };
  const onDelete = id => {
    const items = realm.objects('Task').filtered(`_id == oid(${id})`);
    const item = items[0];
    realm.write(() => (item.isActive = false));
    setUpdate(prev => !prev);
  };
  const onDone = id => {
    const items = realm.objects('Task').filtered(`_id == oid(${id})`);
    const item = items[0];
    realm.write(() => (item.status = 1));
    setUpdate(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <TaskRenderer
        list={weeklyTask}
        onAdd={onAddTask}
        onDelete={onDelete}
        onDone={onDone}
      />
    </View>
  );
};

export default Weekly;
