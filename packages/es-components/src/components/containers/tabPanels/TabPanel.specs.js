/* eslint-env jest */

import React from 'react';
import { mountWithTheme } from 'styled-enzyme';

import TabPanel from './TabPanel';

describe('Tab panel component', () => {
  const instanceToRender = (
    <TabPanel optionKeyFunc={x => x.replace(/\s/g, '')}>
      <TabPanel.Tab name="test1">
        <div>Test Content 1</div>
      </TabPanel.Tab>
      <TabPanel.Tab name="test2">
        <div>Test Content 2</div>
      </TabPanel.Tab>
    </TabPanel>
  );

  it('Will select first child on load', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    expect(tabPanelInstance.state('value')).toBe('test1');
  });

  it('Properly selects a tab', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    tabPanelInstance.setState({ value: 'test2' });
    expect(
      tabPanelInstance
        .find({ name: 'test2' })
        .first()
        .props().selected
    ).toBe(true);
  });

  it('Clicks on tab select them', () => {
    const tabPanelInstance = mountWithTheme(instanceToRender);
    const tab = tabPanelInstance.find({ name: 'test2' });
    const tabButton = tab.find('button');
    tabButton.simulate('click');
    expect(tabPanelInstance.state('value')).toBe('test2');
  });
});
