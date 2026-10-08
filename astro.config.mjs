// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://nishat.blog',
	integrations: [mdx(), sitemap({
			// Exclude category archives and posts that are noindex (keep in sync with `noindex: true` frontmatter)
			filter: (page) =>
				!page.includes('/category/') && !page.includes('/nichenish-issue-01/') &&
				!page.includes('/nichenish-issue-02/') &&
				!page.includes('/wordcamp-kathmandu-2026-experience/'),
		})],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
