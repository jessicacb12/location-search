import { Provider } from 'react-redux';

import store from '@/store';

import ComponentView from './view';
// for basic application styling
import './styles.scss';

const Component = () => (
  <Provider store={store}>
    <ComponentView />
  </Provider>
);

export default Component;
