import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import TodoList from './TodoList';

import expect from 'expect'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
 
it('renders "Our Todo List"', () => {
  const wrapper = shallow(<TodoList/>);
  const textHeader = <p>Our Todo List</p>;
  expect(wrapper.contains(textHeader)).toEqual(true);
});