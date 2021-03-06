import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';





configure({adapter: new Adapter()});

describe('<App />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<App />);
    })
    it('Renderiza un <header>', () => {
      expect(wrapper.find('header')).toHaveLength(1)
    })
  })
})
