import { readable } from 'svelte/store';

const settingsElement = document.querySelector('script[type="settings+json"]');
let settingsData = {};
try {
    settingsData = JSON.parse(settingsElement.textContent);
} catch (_) {/* do nothing */}
if (settingsData && settingsData.mapboxPublicToken) {
    settingsData.mapboxPublicToken = atob(settingsData.mapboxPublicToken);
}
export const settings = readable(settingsData);
