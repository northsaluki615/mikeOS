const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const contentDir = './content';
const outputFilePath = './_data/backlinks.json';

let backlinks = {};

glob(`${contentDir}/**/*.md`, (err, files) => {
    if (err) {
        console.error('Failed to read content files:', err);
        return;
    }

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const { data, content: markdownContent } = matter(content);
        const links = markdownContent.match(/\[.*?\]\((.*?)\)/g) || [];
        
        links.forEach(link => {
            const match = link.match(/\[.*?\]\((.*?)\)/);
            if (match) {
                const linkedPage = match[1];
                if (!backlinks[linkedPage]) backlinks[linkedPage] = [];
                backlinks[linkedPage].push(data.title || path.basename(file));
            }
        });
    });

    fs.writeFileSync(outputFilePath, JSON.stringify(backlinks, null, 2));
    console.log('Backlinks generated.');
});
