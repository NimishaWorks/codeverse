// Simple build script for CodeVerse Vanilla JS
import fs from 'fs';
import path from 'path';

const srcDir = './';
const distDir = './dist';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML file
fs.copyFileSync(path.join(srcDir, 'index.html'), path.join(distDir, 'index.html'));

// Copy assets
if (fs.existsSync(path.join(srcDir, 'assets'))) {
    fs.cpSync(path.join(srcDir, 'assets'), path.join(distDir, 'assets'), { recursive: true });
}

// Copy JS files
fs.cpSync(path.join(srcDir, 'js'), path.join(distDir, 'js'), { recursive: true });

// Copy CSS files  
fs.cpSync(path.join(srcDir, 'css'), path.join(distDir, 'css'), { recursive: true });

console.log('✅ Build completed successfully!');
console.log('📁 Files copied to dist/ directory');
console.log('🚀 Run "npm run serve" to serve the built application');