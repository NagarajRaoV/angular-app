// pretest.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const chromePath = puppeteer.executablePath();
const envPath = path.join(__dirname, '.env');
const envContent = `CHROME_BIN=${chromePath}\n`;

fs.writeFileSync(envPath, envContent, { encoding: 'utf8' });

console.log(`CHROME_BIN is set to: ${chromePath}`);
