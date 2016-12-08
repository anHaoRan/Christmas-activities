import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
// import layouts from 'handlebars-layouts';

const LAYOUT_FOLDER = path.join(__dirname, '../src/layouts/');
const GLOBAL_LAYOUT = LAYOUT_FOLDER + 'global.hbs';
const ENCODE = 'utf8';

// Register helpers
// handlebars.registerHelper(layouts(handlebars));

// Register partials
// handlebars.registerPartial('global', fs.readFileSync(GLOBAL_LAYOUT, ENCODE));

const template = (layoutPath, data, cb) => {
  // return handlebars.compile(fs.readFileSync(LAYOUT_FOLDER + layoutPath + '.hbs', ENCODE))(data);
  // let file = fs.readFileSync(GLOBAL_LAYOUT, ENCODE);
  fs.readFile(GLOBAL_LAYOUT, ENCODE, (err, file) => {
    let page = handlebars.compile(file)(data)
    cb(page);
  });
}

export default template;