import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MediaViewer from '../components/MediaViewer/MediaViewer';
import './index.css';
import items from '../../data/items.json'

export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'MediaViewer',
    component: MediaViewer,
} as ComponentMeta<typeof MediaViewer>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof MediaViewer> = (args) => <MediaViewer {...args} />;

export const Default = Template.bind({});
Default.args = { items, theme: 'light', hideControls: false, galleryName: "Switzerland's Best" };