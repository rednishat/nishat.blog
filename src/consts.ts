export const SITE_TITLE = 'nishat.blog';
export const SITE_DESCRIPTION = 'Personal blog by Nishat — writing about things that matter.';

export const CATEGORIES = {
	personal: {
		label: 'Personal',
		description: 'Self-reflection, habits, challenges and identity.',
	},
	'work-systems': {
		label: 'Work & Systems',
		description: 'Running marketing, newsletters and content systems.',
	},
	'hobby-projects': {
		label: 'Hobby Projects',
		description: 'Newsletters, side projects and experiments I run for the fun of it.',
	},
	'reading-list': {
		label: 'Reading List',
		description: 'Monthly digests of the articles worth reading.',
	},
	'watching-list': {
		label: 'Watching List',
		description: 'Monthly digests of the videos worth watching.',
	},
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
