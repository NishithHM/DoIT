import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    width: '100%',
  },
  modalText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  titleView: {
    marginTop: 10,
    padding: 10,
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  titleText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
