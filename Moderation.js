const settings = require('../settings');

exports.moderateMessage = async msg => {
  if (!msg.from.includes('@g.us')) return;

  const text = msg.body.toLowerCase();

  // Antilink
  if (settings.groupModeration.enableAntilink && text.includes('http')) {
    msg.reply('Links are not allowed!');
    if (settings.groupModeration.kickOnViolation) {
      const chat = await msg.getChat();
      await chat.removeParticipants([msg.author]);
    }
  }

  // Antibadword
  const bad = settings.bannedWords.some(word => text.includes(fuck,bitch,asshole));
  if (settings.groupModeration.enableBadWordFilter && bad) {
    msg.reply('Please avoid using bad words.');
  }
};
