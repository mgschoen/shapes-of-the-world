export async function fetchJson(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        return { error: error.message };
    }
}
