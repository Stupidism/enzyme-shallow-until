# enzyme-shallow-until

[![Travis][build-badge]][build]
[![Greenkeeper][greenkeeper-badge]][greenkeeper]
[![Codecov][codecov-badge]][codecov]
[![CodeFactor][codefactor-badge]][codefactor]
[![BCH compliance][bettercodehub-badge]][bettercodehub]
[![bitHound Score][bitHound-badge]][bitHound]
[![Known Vulnerabilities][snyk-badge]][snyk]

`enzyme-shallow-until` is a utility library to extend enzyme's shallow function.
It gives ShallowWrapper the ability to dive until a specific component type.
Especially useful when you have some HOC-style components to test.

## Setup
- install

`npm i -D enzyme enzyme-shallow-until enzyme-adapter-react-xx`

- setup `ShallowWrapper`
```
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-xx';
import ShallowWrapper from 'enzyme/ShallowWrapper';

Enzyme.configure({ adapter: new Adapter() });
ShallowWrapper.prototype.until = until;
```

## Usage
```
const wrapper = shallow(<ComposedComponent />).until(Component);
```

### Use with jest snapshot and enzyme-to-json
```js
// in test-setup.js
import { createSerializer } from 'enzyme-to-json';
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
```

```js
// in xxx.test.js
it('should keep render result unchanged', () => {
  const wrapper = shallow(<ComposedComponent />).until(Component);
  expect(wrapper).toMatchSnapshot();
})
```

## Thanks

Thank @matthieuprat for his [gist](https://gist.github.com/matthieuprat/5fd37abbd4a4002e6cfe0c73ae54cda8)

## License MIT

[build-badge]: https://travis-ci.org/Stupidism/enzyme-shallow-until.svg?branch=master
[build]: https://travis-ci.org/Stupidism/enzyme-shallow-until

[greenkeeper-badge]: https://badges.greenkeeper.io/stupidism/enzyme-shallow-until.svg
[greenkeeper]: https://greenkeeper.io/

[codecov-badge]: https://codecov.io/gh/Stupidism/enzyme-shallow-until/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/Stupidism/enzyme-shallow-until

[codefactor-badge]: https://www.codefactor.io/repository/github/storybooks/storybook/badge
[codefactor]: https://www.codefactor.io/repository/github/Stupidism/enzyme-shallow-until

[bettercodehub-badge]: https://bettercodehub.com/edge/badge/Stupidism/enzyme-shallow-until?branch=master
[bettercodehub]: https://bettercodehub.com/

[bitHound-badge]: https://www.bithound.io/github/Stupidism/enzyme-shallow-until/badges/score.svg
[bitHound]: https://www.bithound.io/github/Stupidism/enzyme-shallow-until

[snyk-badge]: https://snyk.io/test/github/stupidism/enzyme-shallow-until/badge.svg
[snyk]: https://snyk.io/test/github/stupidism/enzyme-shallow-until
