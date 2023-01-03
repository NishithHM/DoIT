import React, {useState} from 'react';
import {View} from 'react-native';
import {TaskRenderer} from '../../components';
import {writeTaskData} from '../../realm';
import styles from './daily.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;
import {Realm} from '@realm/react';
const Daily = () => {
  const [update, setUpdate] = useState(false);
  const realm = useRealm();
  const tasks = realm.objects('Task');
  
  const dailyTask = tasks.filtered(
    `type == 'daily' && isActive == true && createdOn >= ${dayjs().format(
      'YYYY-MM-DD@00:00:00',
    )} && createdOn < ${dayjs().add(1, 'day').format('YYYY-MM-DD@00:00:00')}`,
  );
  const onAddTask = async task => {
    realm.write(() => {
      realm.create(
        'Task',
        Task.generate(
          task,
          0,
          dayjs().endOf('day').add(330, 'minutes').toDate(),
          'daily',
        ),
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
        list={dailyTask}
        onAdd={onAddTask}
        onDelete={onDelete}
        onDone={onDone}
      />
    </View>
  );
};

export default Daily;
