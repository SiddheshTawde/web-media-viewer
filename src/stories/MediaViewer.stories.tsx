import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MediaViewer from '../components/MediaViewer/MediaViewer';
import items from './items.json';
import './index.css';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Web Media Viewer',
    component: MediaViewer,
} as ComponentMeta<typeof MediaViewer>;

const Template: ComponentStory<typeof MediaViewer> = (args) => <MediaViewer {...args} />;

export const Default = Template.bind({});
Default.args = { items, theme: "light", galleryName: "Switzerland's Best" };