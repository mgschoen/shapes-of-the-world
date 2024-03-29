import { readable, writable, derived } from 'svelte/store';

const settingsElement = document.querySelector('script[type="settings+json"]');
let settingsData = {};
try {
    settingsData = JSON.parse(settingsElement.textContent);
} catch (_) {/* do nothing */}
if (settingsData && settingsData.mapboxPublicToken) {
    settingsData.mapboxPublicToken = atob(settingsData.mapboxPublicToken);
}

const calculatePool = ([ $metadata, $history ]) => {
    if (!$metadata || !Array.isArray($metadata.countries)) {
        return [];
    }
    const remainingCountries = $metadata.countries
        .filter((country) => !$history.includes(country.short))
        .toSorted((a, b) => b.score - a.score)
        .map((country) => country.short);
    
    const windowSize = Math.min(remainingCountries.length, 20);
    return remainingCountries.slice(0, windowSize);
};

const highscoreLocalStorageKey = 'map-quiz_highscore';
let localStorageHighscore;
try {
    localStorageHighscore = parseInt(localStorage.getItem(highscoreLocalStorageKey));
} catch (_) {/* do nothing */}
const highscoreStore = writable(localStorageHighscore || 0);
highscoreStore.subscribe(($highscore) => localStorage.setItem(highscoreLocalStorageKey, '' + $highscore));

const isDebugMode = new URLSearchParams(window.location.search).get('debug') === 'true';

// static globals
export const settings = readable(settingsData);
export const metadata = writable();
export const userCountry = writable();
export const debug = readable(isDebugMode);

// application model
export const history = writable([]);
export const pool = derived([ metadata, history ], calculatePool);
export const score = writable(0);
export const highscore = highscoreStore;
export const country = writable();
export const geojson = writable();

// view state
export const isLoading = writable(false);
export const modal = writable('splash');
