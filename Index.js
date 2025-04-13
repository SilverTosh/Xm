const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Initialize the WhatsApp Client
const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Scan the QR code above to login');
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

client.on('message', async message => {
  const command = message.body.split(' ')[0].toLowerCase();
  const sender = message.from;

  // Auto-reply Command Example
  if (command === '.ping') {
    message.reply('pong');
  }

  // Help Command
  if (command === '.help') {
    message.reply('Available Commands: \n.ping - Simple ping pong\n.sticker - Convert image to sticker\n.autobio - Set auto bio\n.kick - Kick user (admins only)\n.terminate - Terminate group (admins only)');
  }

  // Sticker Command (Image to Sticker)
  if (command === '.sticker' && message.hasMedia) {
    const media = await message.downloadMedia();
    const mediaPath = path.join(__dirname, 'media', 'sticker.png');

    // Convert image to sticker using ffmpeg or direct manipulation
    ffmpeg(media.data)
      .output(mediaPath)
      .on('end', () => {
        message.reply(new MessageMedia('image/png', fs.readFileSync(mediaPath).toString('base64'), 'sticker.png'));
      })
      .run();
  }

  // Auto Bio Command
  if (command === '.autobio') {
    client.setStatus('Your new bio message goes here!');
    message.reply('Your bio has been updated!');
  }

  // Moderation: Kick Command (Admins only)
  if (command === '.kick') {
    const isAdmin = message.isGroupMsg && message.author && message.author === sender;  // Check if sender is group admin

    if (isAdmin) {
      const numberToKick = message.body.split(' ')[1];
      await message.reply(`Kicking user: ${numberToKick}`);
      // Kick logic based on the library you're using (ensure correct syntax for kicking members)
    } else {
      message.reply('Only admins can use this command!');
    }
  }

  // Terminate Command (Delete group) (Admins only)
  if (command === '.terminate') {
    const isAdmin = message.isGroupMsg && message.author && message.author === sender;  // Check if sender is group admin

    if (isAdmin) {
      message.reply('Terminating the group...');
      // Logic for group termination here (it might involve removing members or deleting the group entirely)
    } else {
      message.reply('Only admins can use this command!');
    }
  }

  // Anti-Link and Anti-Bad Word Filtering
  const bannedWords = ['badword1', 'badword2'];  // Example list of banned words
  const antilinkPattern = /https?:\/\/[^\s]+/g;

  // Check for links
  if (antilinkPattern.test(message.body)) {
    message.delete().then(() => {
      message.reply('Links are not allowed in this group have fun on the bench...🤧!');
    });
  }

  // Check for bad words
  bannedWords.forEach(word => {
    if (message.body.toLowerCase().includes(word)) {
      message.delete().then(() => {
        message.reply('Inappropriate language detected👾🫳!');
      });
    }
  });
});

// Start the client
client.initialize();
