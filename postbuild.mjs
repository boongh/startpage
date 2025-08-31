// post-build.mjs

import fs from 'fs';
import crypto from 'crypto';

// Path to your built index.html
const htmlPath = './build/index.html';
// Path to your manifest file
const manifestPath = './static/manifest.json'; // Assuming your manifest is in the 'static' folder
// Path where the final manifest should be
const finalManifestPath = './build/manifest.json';

// --- Step 1: Read the built HTML file ---
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// --- Step 2: Find all inline scripts and calculate their hashes ---
const scriptRegex = /<script>(.*?)<\/script>/gs;
const hashes = [];
let match;
while ((match = scriptRegex.exec(htmlContent)) !== null) {
    const scriptContent = match[1];
    const hash = crypto.createHash('sha256').update(scriptContent).digest('base64');
    hashes.push(`'sha256-${hash}'`);
}

console.log('✅ Found and hashed inline scripts:', hashes);

// --- Step 3: Read the manifest.json template ---
const manifestContent = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

// --- Step 4: Update the CSP in the manifest object ---
const csp = `script-src 'self' ${hashes.join(' ')}; object-src 'self'`;
manifestContent.content_security_policy = csp;

// --- Step 5: Write the updated manifest to the build directory ---
fs.writeFileSync(finalManifestPath, JSON.stringify(manifestContent, null, 2));

console.log('🚀 Successfully updated manifest.json with new CSP hashes!');