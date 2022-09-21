import pkg from 'archieml';
const { load } = pkg;

import { txt } from './aml.js'

export const story_raw = load(txt).ScrollY.map(e=>e.Part);