import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TaskRenderer} from '../../components';
import styles from './streak.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;
const Streak = () => {
  const realm = useRealm();
  const tasks = realm.objects('Task');
  const streak = tasks.filtered("type == 'streak'");
  const [update, setUpdate] = useState(false);
  const onAddTask = async task => {
    realm.write(() => {
      realm.create(
        'Task',
        Task.generate(task, 0, dayjs().add('1', 'days').toDate(), 'streak', 0),
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
    realm.write(() => (item.streak = item.streak + 1));
    setUpdate(prev => !prev);
  };
  const onCancel = id => {
    const items = realm.objects('Task').filtered(`_id == oid(${id})`);
    const item = items[0];
    realm.write(() => (item.streak = 0));
    setUpdate(prev => !prev);
  };
  return (
    <View style={styles.container}>
      <TaskRenderer
        list={streak}
        onAdd={onAddTask}
        onDelete={onDelete}
        onDone={onDone}
        onCancel={onCancel}
      />
    </View>
  );
};

export default Streak;
