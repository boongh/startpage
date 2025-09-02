import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { 
		adapter:  adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),
		inlineStyleThreshold: 0, // Prevent inline styles too
		alias: {
			"@/*": "./path/to/lib/*",
		},
		paths:{
			relative: true,
			base: "/startpage"
		}
	},
	vite: {
        ssr: {
            noExternal: ['svelte-sonner']
        }
    }
};

export default config;
