import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from '../containers/App/App';
import { shallow } from 'enzyme';
import { getEvents } from '../thunks/getEvents';
jest.mock('../thunks/getEvents');

describe('App', () => {
  let wrapper;
  let mockError;
  let mockLocation;

  beforeEach(() => {
    mockError = '';
    mockLocation = { pathname: '/' };

    wrapper = shallow(
      <App
        getEvents={getEvents}
        error={mockError}
        location={mockLocation}
      />
    )
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when there is an error', () => {
    wrapper = shallow(<App error='Error fetching data.' />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call window.location.reload when the Go Back button is clicked', () => {
    wrapper = shallow(<App error='Error fetching data.' />);
    window.location.reload = jest.fn();
    wrapper.find('.back-button').simulate('click');
    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  describe('mapStateToProps', () => {
    it('should return an object of props', () => {
      const mockState = {
        error: 'Error message',
        otherState: false,
      };
      const expected = {
        error: 'Error message',
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch when getEvents is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = getEvents();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.getEvents();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});