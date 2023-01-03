import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {TaskRenderer} from '../../components';
import {writeTaskData} from '../../realm';
import styles from './daily.styles';
import dayjs from 'dayjs';
import TaskContext, {Task} from '../../models/task.model';
import {useNavigation} from '@react-navigation/native';
const {useRealm, useQuery, useObject} = TaskContext;
const Daily = () => {
  const [update, setUpdate] = useState(false);
  const realm = useRealm();
  const tasks = realm.objects('Task');
  const navigation = useNavigation();
  const backRef = useRef();
  const onFocus = () => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
    backRef.current = backHandler;
  };
  const onBlur = () => {
    backRef.current.remove();
  };
  useEffect(() => {
    const focusSub = navigation.addListener('focus', onFocus);
    const blurSub = navigation.addListener('blur', onBlur);
    () => {
      focusSub();
      blurSub();
    };
  }, []);

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
