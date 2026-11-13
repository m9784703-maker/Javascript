const fs = require('fs');
const path = require('path');

const inputFile = 'input.edi';
const outputFile = 'output.csv';

// Read EDI file
const ediContent = fs.readFileSync(inputFile, 'utf8');

// Split into segments
const segments = ediContent.split('~');

const rows = [];

let currentVN = '';
let currentIN = '';

for (const rawSegment of segments) {
    const segment = rawSegment.trim();

    // Process W01 segment
    if (segment.startsWith('W01*')) {
        const elements = segment.split('*');

        currentVN = '';
        currentIN = '';

        for (let i = 0; i < elements.length; i++) {
            if (elements[i] === 'VN' && i + 1 < elements.length) {
                currentVN = elements[i + 1];
            }

            if (elements[i] === 'IN' && i + 1 < elements.length) {
                currentIN = elements[i + 1];
            }
        }
    }

    // Process corresponding N9*ON segment
    if (segment.startsWith('N9*ON*')) {
        const elements = segment.split('*');

        const country = elements[2] || '';
        const countryCode = elements[3] || '';

        rows.push({
            VN: currentVN,
            IN: currentIN,
            Country: country,
            CountryCode: countryCode
        });
    }
}

// Build CSV
let csv = 'VN,IN,Country,CountryCode\n';

for (const row of rows) {
    csv += `${row.VN},${row.IN},${row.Country},${row.CountryCode}\n`;
}

// Write CSV
fs.writeFileSync(outputFile, csv, 'utf8');

console.log(`Created ${outputFile}`);
console.log(`Records exported: ${rows.length}`);