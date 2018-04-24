import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import Button from './components/Button';
import CurvedImg from './components/CurvedImg';
import Display from './components/Display';
import Editor from './components/Editor';
import Form from './components/Form';
import Text from './components/Text';
import View from './components/View';



describe('Smoke tests', () => {
  it('Button without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('CurvedImg without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CurvedImg />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Display without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Display />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Form without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Form />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Text without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Text />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('View without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<View />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Editor without crashing', () => {
    let actions = {render: () => true};
    const div = document.createElement('div');
    ReactDOM.render(<Editor actions={actions}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('App without crashing', () => {
    const store = createStore(reducer);
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
      <App />
    </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});