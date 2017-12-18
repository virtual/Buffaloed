import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Sights from '../sights/Sights';
import expect from 'expect'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Sights() component:", function () {
  it('renders "Sights"', () => {
    const wrapper = shallow(<Sights/>);
    const textHeader = <h1>Sights</h1>;
    expect(wrapper.contains(textHeader)).toEqual(true);
  });
});