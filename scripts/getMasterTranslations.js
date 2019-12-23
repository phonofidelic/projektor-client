require('dotenv').config();
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

const LOCALES = ['en', 'sv'];

function authorize(callback) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_API_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          'Error while trying to retrieve access token',
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listSheetContents(auth) {
  const sheets = google.sheets({
    version: 'v4',
    auth
  });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1GHJ5yumhTfJ8n1AlXbRjPb52ArgbcS9uhxKSbDTuVLc',
      range: '2:23'
    },
    (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        // console.log('string id, en:, sv:');
        for (let i = 0; i < LOCALES.length; i++) {
          let fileContent = {};
          for (let j = 0; j < rows.length; j++) {
            fileContent[rows[j][0]] = rows[j][i + 2];
          }
          console.log(`${LOCALES[i]}:`, fileContent);

          fs.writeFile(
            path.resolve(__dirname, `../src/strings/${LOCALES[i]}.json`),
            JSON.stringify(fileContent, null, 4),
            'utf8',
            err => {
              if (err) return console.error(err);
              console.log(
                '*** Created translation file',
                `src/strings/${LOCALES[i]}.json`
              );
            }
          );
        }
        // rows.map(row => {
        //   console.log(`${row[0]}, ${row[2]}, ${row[3]}`);
        // });
      } else {
        console.log('No data found.');
      }
    }
  );
}

function main() {
  authorize(listSheetContents);
}
main();
