const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

exports.sendVoiceReply = async (client, msg, text) => {
  const voicePath = './media/pong.ogg'; // Pre-recorded or TTS-generated file
  const voice = MessageMedia.fromFilePath(voicePath);
  await client.sendMessage(msg.from, voice, { sendAudioAsVoice: true });
};
