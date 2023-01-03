import React from 'react';
import {Text, View} from 'react-native';
import {TaskRenderer} from '../../components';
import styles from './overdue.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;

const Overdue = () => {
  const realm = useRealm();
  const tasks = realm.objects('Task');

  const overdueTask = tasks.filtered(
    `expiryOn < ${dayjs().format(
      'YYYY-MM-DD@HH:mm:ss',
    )} && status == 0 && isActive == true && type != 'streak'`,
  );
  console.log(overdueTask);
  return (
    <View style={styles.container}>
      <TaskRenderer list={overdueTask} isAdd={false} />
    </View>
  );
};

export default Overdue;
