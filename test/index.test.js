import React from 'react';
import { shallow } from 'enzyme';

import Component from '../src/index';
import Counter from '../example/app/src/Counter';

const defaultProps = {
  as: Counter,
  props: {
    count: 0,
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
