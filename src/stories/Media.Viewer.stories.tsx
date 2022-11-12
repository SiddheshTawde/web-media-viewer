import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import switzerland from "./switzerland.json"
import videos from "./videos.json"
import picsum from "./picsum.json"

import Viewer from '../components/Viewer/Viewer';

import "./index.css"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Media Viewer/Media Viewer',
	component: Viewer
} as ComponentMeta<typeof Viewer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Viewer> = (args) => <Viewer {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	items: switzerland,
	galleryName: "Switzerland's Best"
};

export const Video = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Video.args = {
	items: videos,
	galleryName: "Videos"
};

export const PicSum = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PicSum.args = {
	items: picsum,
	galleryName: "PicSum"
};
