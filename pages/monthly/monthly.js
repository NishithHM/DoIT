import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TaskRenderer} from '../../components';
import styles from './monthly.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
const {useRealm, useQuery, useObject} = TaskContext;

const Monthly = () => {
  const [update, setUpdate] = useState(false);
  const realm = useRealm();
  const tasks = realm.objects('Task');

  const monthlyTask = tasks.filtered(
    `type == 'monthly' && isActive == true && createdOn >= ${dayjs()
      .startOf('month')
      .format('YYYY-MM-DD@00:00:00')} && createdOn < ${dayjs()
      .endOf('months')
      .add(1, 'day')
      .format('YYYY-MM-DD@00:00:00')}`,
  );
  const onAddTask = async task => {
    realm.write(() => {
      realm.create(
        'Task',
        Task.generate(
          task,
          0,
          dayjs().endOf('month').add(330, 'minutes').toDate(),
          'monthly',
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
        list={monthlyTask}
        onAdd={onAddTask}
        onDelete={onDelete}
        onDone={onDone}
      />
    </View>
  );
};

export default Monthly;
