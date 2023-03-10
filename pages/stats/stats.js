import React from 'react';
import {Text, View, BackHandler} from 'react-native';
import styles from './stats.styles';
import dayjs from 'dayjs';
import TaskContext from '../../models/task.model';
import PieChart from 'react-native-pie-chart';
const {useRealm, useQuery, useObject} = TaskContext;
const Stats = () => {
  const realm = useRealm();
  const tasks = realm.objects('Task');
  const done = tasks.filtered(
    `isActive == true && status == 1 && createdOn >= ${dayjs()
      .startOf('year')
      .format('YYYY-MM-DD@00:00:00')} && createdOn < ${dayjs()
      .endOf('year')
      .format('YYYY-MM-DD@00:00:00')}`,
  );
  const todo = tasks.filtered(
    `isActive == true && status == 0 && createdOn >= ${dayjs()
      .startOf('year')
      .format('YYYY-MM-DD@00:00:00')} && createdOn < ${dayjs()
      .endOf('year')
      .format('YYYY-MM-DD@00:00:00')}`,
  );
  const deleted = tasks.filtered(
    `isActive == false && createdOn >= ${dayjs()
      .startOf('year')
      .format('YYYY-MM-DD@00:00:00')} && createdOn < ${dayjs()
      .endOf('year')
      .format('YYYY-MM-DD@00:00:00')}`,
  );

  const overduePending = tasks.filtered(
    `expiryOn < ${dayjs().format(
      'YYYY-MM-DD@HH:mm:ss',
    )} && status == 0 && isActive == true && createdOn >= ${dayjs()
      .startOf('year')
      .format('YYYY-MM-DD@00:00:00')} && createdOn < ${dayjs()
      .endOf('year')
      .add(1, 'day')
      .format('YYYY-MM-DD@00:00:00')} && type != 'streak'`,
  );
  const widthAndHeight = 270;
  const series = [
    done.length,
    todo.length,
    deleted.length,
    overduePending.length,
  ];
  console.log(overduePending)
  const sliceColor = ['#32a852', '#808080', '#a18900', '#96032f'];
  const labels = [
    `Done ${done.length}`,
    `To Do ${todo.length}`,
    `Deleted ${deleted.length}`,
    `Overdue ${overduePending.length}`,
  ];
  return (
    <View style={styles.container}>
      <>
        <Text style={styles.header}>Dashboard</Text>
        <View style={styles.labelView}>
          {labels.map((ele, index) => (
            <View
              key={ele}
              style={{
                ...styles.labelContainer,
                backgroundColor: sliceColor[index],
              }}>
              <Text style={styles.labelText}>{ele}</Text>
            </View>
          ))}
        </View>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
        />
      </>
    </View>
  );
};

export default Stats;
