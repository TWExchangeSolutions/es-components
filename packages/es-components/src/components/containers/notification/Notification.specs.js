/* eslint-env jest */

import React from 'react';
import { shallowWithTheme, mountWithTheme } from '../../../testing';
import viaTheme from 'es-components-via-theme';

import { Notification } from './Notification';

import Icon from '../../base/icons/Icon';
import Button from '../../controls/buttons/Button';

let instanceToRender;

beforeEach(() => {
  instanceToRender = (
    <Notification
      type="success"
      header="notification header"
      additionalText="test notification text"
      theme={viaTheme}
    />
  );
});

function getShallowInstance() {
  return shallowWithTheme(instanceToRender);
}

function getMountedInstance(props) {
  mountWithTheme(instanceToRender);
  return mountWithTheme(instanceToRender).setProps(props);
}

it('notification has the dialog role by default', () => {
  const instance = getShallowInstance().find('[role="dialog"]');
  expect(instance).toHaveLength(1);
});

it('notification has the alert role when isAlert prop is true', () => {
  const instance = getShallowInstance();
  instance.setProps({ isAlert: true });
  expect(instance.find('[role="alert"]')).toHaveLength(1);
});

it('header text is emphasized with h4 tag', () => {
  const instance = getMountedInstance();
  expect(instance.find('h4').text()).toBe('notification header');
});

it('notification has dismissable button when dismissable is true', () => {
  const instance = getMountedInstance();
  expect(instance.find('.notification__dismiss').hostNodes().length).toBe(0);

  instance.setProps({ dismissable: true });

  expect(instance.find('.notification__dismiss').hostNodes().length).toBe(1);
});

it('notification prepends icon appropriate to type when includeIcon is true', () => {
  const instance = getMountedInstance();
  expect(instance.find(Icon).length).toBe(0);

  instance.setProps({ includeIcon: true });

  expect(instance.find(Icon).length).toBe(1);
});

describe('when callsToAction are provided', () => {
  const primaryAction = jest.fn();
  const secondaryAction = jest.fn();
  const tertiaryAction = jest.fn();

  const callsToAction = [
    {
      actionButtonContent: 'primary',
      action: primaryAction
    },
    {
      actionButtonContent: 'secondary',
      action: secondaryAction
    },
    {
      actionButtonContent: 'tertiary',
      action: tertiaryAction
    }
  ];

  const instanceProps = { callsToAction };

  let instance;

  beforeEach(() => {
    instance = getMountedInstance(instanceProps);
  });

  it('adds a Button instance for all calls to action', () => {
    const buttons = instance.find(Button);

    expect(buttons.length).toBe(3);
  });

  it('allows components to be provided directly', () => {
    const myButton = (
      <Button id="myButton" handleOnClick={jest.fn()}>
        My button
      </Button>
    );
    const buttonedCallsToAction = [
      callsToAction[0],
      myButton,
      callsToAction[2]
    ];
    instance.setProps({ callsToAction: buttonedCallsToAction });

    const buttons = instance.find(Button);
    expect(buttons.length).toBe(3);
    expect(instance.find('#myButton')).not.toBeUndefined();
  });

  it('executes callToAction function provided to the button', () => {
    const button = instance.find(Button).first();

    button.simulate('click');

    expect(primaryAction.mock.calls.length).toBe(1);
  });
});

describe('when extraAlert is provided', () => {
  const extraAlert = { alertText: 'test' };
  const instanceProps = { extraAlert };

  let instance;

  beforeEach(() => {
    instance = getMountedInstance(instanceProps);
  });

  it('adds an ExtraAlert to the notification', () => {
    expect(instance.find('.extra__alert').hostNodes().length).toBe(1);
  });

  it('displays the passed text as small', () => {
    expect(instance.find('small').text()).toBe('test');
  });

  it('displays the default icon', () => {
    expect(instance.find(Icon).prop('name')).toBe('federal');
  });

  it('displays a different icon if provided one', () => {
    const newAlert = {
      alertText: 'test',
      alertIcon: 'bell'
    };

    instance.setProps({ extraAlert: newAlert });

    expect(instance.find(Icon).prop('name')).toBe('bell');
  });
});
