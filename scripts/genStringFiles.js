const csv = require('csvtojson');
const util = require('util');
const path = require('path');
const fs = require('fs');
const writeFile = util.promisify(fs.writeFile);

const LOCALES = ['en', 'sv'];

async function generateLocFiles(locales, transJSON) {
  let files = [];
  for (let i = 0; i < locales.length; i++) {
    // console.log('*** locale:', locales[i]);

    let fileContent = {};
    for (let j = 0; j < transJSON.length; j++) {
      /**
       * string_id = string
       * */
      fileContent[transJSON[j].string_id] = transJSON[j][locales[i]];
    }

    // console.log(`${locales[i]}:`, JSON.stringify(fileContent));

    let result;
    try {
      result = await writeFile(
        path.resolve(__dirname, `../src/strings/${locales[i]}.json`),
        JSON.stringify(fileContent, null, 4),
        'utf8'
      );
      // console.log('result:', result);
    } catch (err) {
      console.error(err);
    }
  }
}

async function main() {
  const transJSON = await csv({ ignoreEmpty: true }).fromFile(
    path.resolve(__dirname, '../translations.csv')
  );
  // console.log('====================================');
  // console.log(
  //   'transJSON:',
  //   util.inspect(
  //     transJSON,
  //     (showHidden = false),
  //     (depth = 2),
  //     (colorize = true)
  //   )
  // );
  // console.log('====================================');

  generateLocFiles(LOCALES, transJSON);
}

main();
