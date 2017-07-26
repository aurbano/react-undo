import React from 'react';
import { shallow } from 'enzyme';

import Component from '../src/index';
import Input from '../example/app/src/Input';

const defaultProps = {
  as: Input,
  props: {
    val: 'Initial value',
    update: () => {},
  },
  trackProps: ['count'],
  onChange: () => {},
};

describe('<Component />', () => {
  it('Should render', () => {
    const renderedComponent = shallow(
      <Component { ...defaultProps } />
    );
    expect(renderedComponent.find('div')).toHaveLength(0);
  });
});
