import { readable, writable } from 'svelte/store';

const settingsElement = document.querySelector('script[type="settings+json"]');
let settingsData = {};
try {
    settingsData = JSON.parse(settingsElement.textContent);
} catch (_) {/* do nothing */}
if (settingsData && settingsData.mapboxPublicToken) {
    settingsData.mapboxPublicToken = atob(settingsData.mapboxPublicToken);
}
export const settings = readable(settingsData);

export const metadata = writable();
export const country = writable();
export const geojson = writable();
export const isLoading = writable(false);

// TODO Debugging only
export const isModalOpen = writable(false);
// END TODO