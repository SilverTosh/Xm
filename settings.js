// settings.js

const settings = {
  // Bot Status and Bio
  botStatus: 'KINGVON Bot is online and ready!',
  bio: 'Your new bio goes here!',
  
  // Command Prefixes
  commandPrefixes: ['.', '#', '$', '&', '-', '+', '!', '*', '¶'],
  
  // Anti-Links and Anti-Bad Word Settings
  antilinkEnabled: true, // Disable/Enable anti-link feature
  bannedWords: ['badword1', 'badword2'], // List of words to filter out
  
  // Group Moderation Settings
  groupModeration: {
    enableAntilink: true, // Enable/Disable link banning in groups
    enableBadWordFilter: true, // Enable/Disable bad word filtering
    kickOnViolation: true, // Automatically kick users violating rules
    warnOnViolation: true, // Send warnings instead of kicking
    logViolations: true, // Log violations for further review
  },
  
  // Sticker Maker Settings
  stickerQuality: 80, // Set the quality of stickers (0-100)
  
  // Auto Bio Update Settings
  autoBioUpdate: true, // Enable/Disable automatic bio updates
  defaultBio: 'Welcome to KINGVON Bot!', // Default bio message when auto bio is enabled
  
  // Group Admin Settings
  groupAdminOnlyCommands: true, // Only admins can execute certain commands like `.kick`, `.terminate`
  
  // Additional Commands
  additionalCommands: {
    kickCommandEnabled: true, // Enable/Disable the .kick command
    terminateCommandEnabled: true, // Enable/Disable the .terminate command
    stickerCommandEnabled: true, // Enable/Disable the .sticker command
    helpCommandEnabled: true, // Enable/Disable the .help command
    autoReplyEnabled: true, // Enable/Disable the .ping auto-reply
  },
  
  // Logging and Debugging Settings
  debugMode: true, // Set to true for logging detailed messages (useful for debugging)
  logFilePath: './logs/bot_log.txt', // Path where logs will be saved
  
  // Custom Welcome Message for Groups
  welcomeMessage: 'Welcome to the group! Please follow the rules.',
  
  // Moderation Settings (Admins, Kick, etc.)
  groupAdmins: [], // List of group admins, if needed for advanced access control
  
  // Host Settings for the Dashboard (if applicable)
  dashboard: {
    host: 'http://localhost:3000', // Localhost for testing, change for deployment
    enableDashboard: false, // Toggle to enable/disable web dashboard for configuration
  }
};

module.exports = settings;
