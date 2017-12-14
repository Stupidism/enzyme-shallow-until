import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShallowWrapper from 'enzyme/ShallowWrapper';
import expect from 'expect';

import until from 'src';

Enzyme.configure({ adapter: new Adapter() });
ShallowWrapper.prototype.until = until;

describe('until', () => {
  const Div = () => <div />;
  const Foo = () => <Div />;
  const hoc = Component => () => <Component />;

  it('shallow renders the current wrapper one level deep', () => {
    const EnhancedFoo = hoc(Foo);
    const wrapper = shallow(<EnhancedFoo />).until(Foo);
    expect(wrapper.contains(<Foo />)).toBe(true);
    expect(wrapper.dive().contains(<Div />)).toBe(true);
  });

  it('shallow renders the current wrapper several levels deep', () => {
    const EnhancedFoo = hoc(hoc(hoc(Foo)));
    const wrapper = shallow(<EnhancedFoo />).until(Foo);
    expect(wrapper.contains(<Foo />)).toBe(true);
    expect(wrapper.dive().contains(<Div />)).toBe(true);
  });

  it('supports string selectors', () => {
    const EnhancedFoo = hoc(Foo);
    const wrapper = shallow(<EnhancedFoo />).until('Foo');
    expect(wrapper.contains(<Foo />)).toBe(true);
    expect(wrapper.dive().contains(<Div />)).toBe(true);
  });

  it('shallow renders as much as possible when no selector is provided', () => {
    const EnhancedFoo = hoc(hoc(Foo));
    const wrapper = shallow(<EnhancedFoo />).until();
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('stops shallow rendering when the wrapper is empty', () => {
    const NullComponent = () => null;
    const wrapper = shallow(<NullComponent />).until();
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('shallow renders the current wrapper even if the selector never matches', () => {
    const EnhancedFoo = hoc(Foo);
    const wrapper = shallow(<EnhancedFoo />).until('Whatever');
    expect(wrapper.contains(<div />)).toBe(true);
  });

  it('stops shallow rendering when it encounters a DOM element', () => {
    const Container = () => <div><Foo /></div>;

    let wrapper = shallow(<Container />).until(Foo);
    expect(wrapper.contains(<div><Foo /></div>)).toBe(true);

    const EnhancedContainer = hoc(hoc(Container));
    wrapper = shallow(<EnhancedContainer />).until(Foo);
    expect(wrapper.contains(<div><Foo /></div>)).toBe(true);
  });

  it('throws when it is called on an empty wrapper', () => {
    expect(() => shallow(<Foo />).find('Whatever').until()).toThrow(
      Error,
      'Method “until” is only meant to be run on a single node. 0 found instead.',
    );
  });

  it('shallow renders non-root wrappers', () => {
    const Container = () => <div><Foo /></div>;
    const wrapper = shallow(<Container />).find(Foo).until();
    expect(wrapper.contains(<div />)).toBe(true);
  });
});
