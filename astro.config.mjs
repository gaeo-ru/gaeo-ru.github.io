import {defineConfig} from 'astro/config';
export default defineConfig({
 site:'https://gaeo.ru',
 output:'static',
 trailingSlash:'always',
 build:{format:'directory'}
});
