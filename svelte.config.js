
/** @type {import('@sveltejs/kit').Config} */
import adapter from '@sveltejs/adapter-static';

const production = process.env.NODE_ENV === 'production';

const config = {

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter({
			// Options below are defaults
			pages: 'build',
			assets: 'build'
		}),
		prerender: {
			default: true,
			enabled: production,
			entries: ['/', '/embed/'],
			onError: 'continue'

		},
		paths: {
			base: production ? '/visualisations/censuspopulationchange' : ''
		},
		trailingSlash: "always"
	}
};

export default config;

/*
import static_adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-netlify';
const production = process.env.NODE_ENV === 'production';

const config = {
    kit: {
        adapter: static_adapter(),
        //adapter: adapter(),
        files: {
            assets: 'static',
            lib: 'src/lib'
        },
        // hydrate the <div id="svelte"> element in src/app.html
        paths: {
            assets: production ? '' : '',
            base: production ? '' : ''
        },
        vite: {
        }
    }
};
export default config;*/