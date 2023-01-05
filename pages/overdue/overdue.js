import React, { useState } from 'react';
import {Text, View} from 'react-native';
import {TaskRenderer} from '../../components';
import styles from './overdue.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;

const Overdue = () => {
  const realm = useRealm();
  const tasks = realm.objects('Task');
  const [update, setUpdate] = useState(false);
  const overdueTask = tasks.filtered(
    `expiryOn < ${dayjs().format(
      'YYYY-MM-DD@HH:mm:ss',
    )} && status == 0 && isActive == true && type != 'streak'`,
  );
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
        list={overdueTask}
        isAdd={false}
        onDone={onDone}
        onDelete={onDelete}
      />
    </View>
  );
};

export default Overdue;
