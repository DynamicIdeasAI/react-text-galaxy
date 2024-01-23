import * as React from 'react';
import { render } from '@testing-library/react';
import { TextGalaxy } from '../src';
import 'jest-canvas-mock';

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <TextGalaxy
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus faucibus ornare suspendisse sed nisi. Elementum nibh tellus molestie nunc. Ornare arcu dui vivamus arcu felis bibendum ut. Convallis posuere morbi leo urna molestie at elementum. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Eget nunc lobortis mattis aliquam faucibus purus. Eget magna fermentum iaculis eu non diam phasellus. Condimentum lacinia quis vel eros donec ac odio tempor. Mauris nunc congue nisi vitae suscipit tellus mauris. Nulla pellentesque dignissim enim sit amet. At augue eget arcu dictum varius duis. Aliquet lectus proin nibh nisl. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Facilisis gravida neque convallis a cras semper auctor neque vitae. Quisque non tellus orci ac auctor augue mauris augue neque. Elementum nibh tellus molestie nunc non blandit massa. Pharetra convallis posuere morbi leo urna molestie. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Id porta nibh venenatis cras sed felis eget velit aliquet. Cursus mattis molestie a iaculis at erat. Egestas egestas fringilla phasellus faucibus scelerisque. Semper feugiat nibh sed pulvinar proin. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Ac odio tempor orci dapibus ultrices in iaculis. Vestibulum lectus mauris ultrices eros in cursus. Eget aliquet nibh praesent tristique. At augue eget arcu dictum varius duis at. Enim sit amet venenatis urna cursus eget nunc scelerisque viverra. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Et netus et malesuada fames. Congue eu consequat ac felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
      />
    );
  });
});
