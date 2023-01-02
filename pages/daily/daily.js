import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SwipableRow from '../../components/swipableRow';
const Daily = () => {
  const arr = [
    {task: 'hello 1'},
    {task: 'hello 2'},
    {task: 'hello 3'},
    {task: 'hello 4'},
  ];
  return (
    <View>
      <FlatList
        data={arr}
        keyExtractor={item => item.task}
        renderItem={({item, index}) => {
          return <SwipableRow key={item.task} item={item.task} />;
        }}
      />
    </View>
  );
};

export default Daily;
