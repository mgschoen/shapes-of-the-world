const fs = require('fs');
const path = require('path');
const centerOfMass = require('@turf/center-of-mass').default;

async function run() {
    const metadataPath = path.join(__dirname, `../dist/data/_meta.json`);
    const metadataFileHandle = await fs.promises.open(metadataPath, 'r+');
    const metadataString = await metadataFileHandle.readFile({ encoding: 'utf-8' });
    const metadata = JSON.parse(metadataString);

    for (let country of metadata.countries) {
        const geojsonPath = path.join(__dirname, `../dist/data/${country.short}.geojson`);
        const geojsonFileHandle = await fs.promises.open(geojsonPath, 'r');
        const geojsonString = await geojsonFileHandle.readFile({ encoding: 'utf-8' });
        await geojsonFileHandle.close();
        const geojson = JSON.parse(geojsonString);
        const center = centerOfMass(geojson);
        country.center = center.geometry.coordinates;
    }
    
    await metadataFileHandle.write(JSON.stringify(metadata), 0);
    await metadataFileHandle.close();
}

run().then(() => process.exit());
