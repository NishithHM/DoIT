import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  labelView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  labelContainer: {
    margin: 10,
  },
  labelText: {
    padding: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
