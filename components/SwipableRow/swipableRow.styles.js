import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    padding: 10,
    color: 'black',
    width: '98%',
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
  },
  viewStyle: {
    margin: 10,
  },
});

export default styles;
