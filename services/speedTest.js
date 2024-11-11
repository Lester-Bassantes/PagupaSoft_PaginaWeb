// speedTest.js
const FastSpeedtest = require('fast-speedtest-api');

const speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
    verbose: false,
    timeout: 10000,
    unit: FastSpeedtest.UNITS.Mbps
});

async function getSpeedTestResults() {
    try {
        const download = await speedtest.getSpeed(); // Velocidad de bajada
        const upload = await speedtest.getSpeed(FastSpeedtest.DOWNLOAD); // Velocidad de subida
        //const latency = await speedtest.getLatency(); // Latencia
        return {
            download: `${download.toFixed(2)} Mbps`,
            upload: `${upload.toFixed(2)} Mbps`
            //latency: `${latency} ms`
        };
    } catch (error) {
        console.error('Error realizando el test de velocidad:', error);
        throw error;
    }
}

module.exports = getSpeedTestResults;
