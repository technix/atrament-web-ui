const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const NwBuilder = require('nw-builder');
const appCfg = require('./src/app/package.json');

const buildDir = path.resolve('build');
const distDir = path.resolve('dist');
const webDir = path.resolve('dist','webapp');
const mapFiles = path.resolve(webDir, '*.map')

fs.ensureDirSync(distDir);
fs.ensureDirSync(webDir);
fs.copySync(buildDir, webDir, {overwrite: true});
fs.copyFileSync('./src/app/package.json', path.resolve(webDir, 'package.json'));

glob.sync(mapFiles).forEach(f => fs.unlinkSync(f));

const options_desktop = {
    flavor: 'normal',
    appName: appCfg.app_name,
    appVersion: appCfg.version,
    platforms: ['win64', 'osx64', 'linux'],
    version: '0.35.0',
    files: ['./dist/webapp/**'],
    buildDir: './dist/' + appCfg.app_name + '_desktop - ' + appCfg.version,
    credits: './dist/webapp/index.html',
    macCredits: './dist/webapp/index.html',
    macIcns: './src/app/icons/appIcon.hqx',
    winIco: './src/app/icons/appIcon.ico',
};

const builder = new NwBuilder(options_desktop);
builder.on('log', console.log);
builder.build().then(() => {
    console.log('All done!');
});
