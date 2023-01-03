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
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
  },
  viewStyle: {
    margin: 10,
  },
  textContainer: {
    flexDirection: 'row',
  },
  streak: {
    backgroundColor: 'lightgrey',
    padding: 10,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    // justifyContent:'space-around'
  },
  leftActionCancel: {
    flex: 1,
    backgroundColor: '#FF8000',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
});

export default styles;
