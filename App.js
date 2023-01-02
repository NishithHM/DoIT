import React from 'react';
import {Provider} from 'react-redux';
import Route from './Route';
import {store} from './store';
import TaskContext from './models/task.model';
const {RealmProvider} = TaskContext;
const App = () => {
  return (
    // <Provider store={store}>
    <RealmProvider>
      <Route />
    </RealmProvider>
  );
};

export default App;
