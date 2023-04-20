const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const problemName = process.argv[2];
if (!problemName) {
  console.error('Usage: node generate-leetcodedaily.js <problemName>');
  process.exit(1);
}

const packageName = problemName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
const words = packageName.split(/[^a-zA-Z]/g).filter(word => word.length>0);
console.log(words);
const camelCaseName = words[0].charAt(0).toLowerCase()+ words[0].substring(1) + words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

// Create the package directory
fs.mkdirSync(problemName);

// Create the package.json file
fs.writeFileSync(path.join(problemName, 'package.json'), JSON.stringify({
  name: packageName,
  version: '1.0.0',
  description: '',
  main: `${camelCaseName}.js`,
  scripts: {
    test: 'jest'
  },
  author: '',
  license: 'ISC',
  devDependencies: {
    jest: '^29.5.0'
  }
}, null, 2));

// Create the source code files
fs.writeFileSync(path.join(problemName, `${camelCaseName}.js`), '');
fs.writeFileSync(path.join(problemName, `${camelCaseName}.test.js`), '');

// Create the README file
fs.writeFileSync(path.join(problemName, 'README.md'), `# ${problemName}\n\n`);

// Add to gitignore
const gitignorePath = path.join(__dirname, '.gitignore');
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
if (!gitignoreContent.includes(`${problemName}/node_modules/`)) {
  fs.appendFileSync(gitignorePath, `\n${problemName}/node_modules/`);
  console.log(`Added "${problemName}/node_modules/" to .gitignore file.`);
} else {
  console.log(`"${problemName}/node_modules/" already exists in .gitignore file.`);
}

// Change the current working directory to the package directory
process.chdir(problemName);


// Run `npm install`
execSync('npm install');

console.log('Done!');
