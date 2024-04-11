const fs = require('fs');
const path = require('path');

const outboxDir = path.join(__dirname, 'content', 'outbox');

// Check if the outbox directory exists
if (fs.existsSync(outboxDir)) {
    console.log('Outbox directory exists. Removing...');
    fs.rmdirSync(outboxDir, { recursive: true });
    console.log('Outbox directory removed.');
} else {
    console.log('Outbox directory does not exist. Continuing...');
}
