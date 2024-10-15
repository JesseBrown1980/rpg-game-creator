const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const server = http.createServer(async (req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './' || filePath === './index.html') filePath = './main.html'; // Update to main.html

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
    try {
        const content = await fs.readFile(safePath);
        
        // Add cache control headers
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
        
        // Check if the client accepts gzip encoding
        const acceptEncoding = req.headers['accept-encoding'] || '';
        if (acceptEncoding.includes('gzip')) {
            zlib.gzip(content, (err, compressed) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error compressing content');
                } else {
                    res.writeHead(200, { 
                        'Content-Type': contentType,
                        'Content-Encoding': 'gzip'
                    });
                    res.end(compressed);
                }
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File not found handling
            fs.readFile('./404.html', (err, pageContent) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - Page Not Found', 'utf-8');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(pageContent, 'utf-8');
                }
            });
        } else if (error.code === 'EACCES') {
            // Permission denied handling
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        } else {
            // Other error handling
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        }
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
