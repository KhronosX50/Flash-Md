const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VXOEZORDRHalN2L1NYR2FJaThvTlpPbDRVZzZBSklzUGlTRmRlWGltUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHFyRm5PNmRDL3BjekNIZnJiendUMHU0RGNqa3RFczdnMFYrVmoyQUcwZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSnZCcUlJQ1lUaGNBVlF6UjZZRU1yYytja1grL25LNm9GeXhNb2hBbm5NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxaWlaQjFWSmpKcE05MjVqQ1VDbnJPRWRFL0d3Y3dzS2ZrUHZObFZNemxFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JbHdSZFNWdDM4ckZ4YldnaXpPYjh1TEViNlFoWUpSbWJkRUFSdzFPMFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFONlJOVmo1SVJxeTdRd3VPU1RXZGJSRHlmTWRWc2xnZkZsd3hzS3p3MFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0RQTU5ucW9Qc1dEZ0IxcjlZS0cvYnVPZkJhL3pWMEtCdWlnNHRYQ3VtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkxpdTM4bTRHZ0pya1hwU0NhMVVjMnVsWWUzYXM0NWhDRGRhV3FOM1JpTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtreDV4UWMvY2d0TGMwc2FzcHJmcDZvZ25WQW5pc0lSaW5EOWJRYjVzeUREeml4RXExL3lsVDFqRHFiUzVRVDRVSml2WkhMYjgrUldXcG5ia0dubWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6IlN0Y0NUZnFBQXZsMlBhcUJnMUI0ck00S0hRa3paV2gycGRYbUUwdUxoTzA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InFMME4tTkhmUUd5eXlHNFVabzVZd0EiLCJwaG9uZUlkIjoiMGM2NzQxMDYtODVmZS00MTg3LTk4ZDQtYmM2OGM4YTdhMGRjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjEvaW8vZkljWFJWckRyQ01ndGcrcjJVZXgxND0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzeUk2MW5uandYRlRkK2Y2ZUwwb0NEZEc1MG89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiN1QzRlA4WkciLCJtZSI6eyJpZCI6IjIzNDcwMzQ2Nzg5NjQ6OEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnllMGJVRUVNYjlwYk1HR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieXRPenE3NzYwQzNQYXRPeWxWVE5GLzFxcGhoUWtJYnE0STFVNERRTUtBWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTmtXUFBvVEtNbnB1V2cxOTQwWURjT1Rlc2RIYzVrM0FlYzA1SnFhR3JpY0wzeFV2ZEhva3kvSDlWZlQ4OTRSbUdvLzF2b2JpNGtFSm8zMWZpNXFiQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6InpDUHpFNXk5blI0RFV0WThsVjBMODlaMlBBRWZLM2FpeStlMlZ0dVdzQUd3aFZCamZQU3RJcUJFVFRIbTJQK2h6eUluSFVlRnlKWlZnQzZyMW5kY2l3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzAzNDY3ODk2NDo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNyVHM2dSsrdEF0ejJyVHNwVlV6UmY5YXFZWVVKQ0c2dUNOVk9BMERDZ0cifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTgxODk3ODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRGFlIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254757835036", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
