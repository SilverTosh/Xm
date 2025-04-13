const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  useSingleFileAuthState,
  generateRegistrationOptions,
  initAuthCreds,
  getRegistrationCode
} = require("@whiskeysockets/baileys");

const readline = require('readline');

async function askPhoneNumber() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    rl.question('Enter your WhatsApp number (with country code, no +): ', number => {
      rl.close();
      resolve(number.trim());
    });
  });
}

async function startWithPairingCode() {
  const phoneNumber = await askPhoneNumber();

  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${phoneNumber}`);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  const registration = await generateRegistrationOptions(phoneNumber, { method: 'pairing-code' });
  console.log('\nGo to WhatsApp > Linked Devices > Link a Device\n');
  console.log(`Pairing Code: ${registration.pairingCode}\n`);

  const creds = initAuthCreds();
  await getRegistrationCode(creds, registration);
  saveCreds();
}

startWithPairingCode();
