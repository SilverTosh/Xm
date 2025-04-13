const { MessageMedia } = require('whatsapp-web.js');

exports.handleStickerCommand = async (client, msg) => {
  if (msg.hasMedia) {
    const media = await msg.downloadMedia();
    await client.sendMessage(msg.from, media, { sendMediaAsSticker: true });
  } else {
    msg.reply('Please send an image or video with the command.');
  }
};
