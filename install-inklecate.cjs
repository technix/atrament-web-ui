const fs = require('node:fs');
const { downloadRelease } = require('@terascope/fetch-github-release');

const user = 'inkle';
const repo = 'ink';
const leaveZipped = false;
const disableLogging = false;

async function downloadInklecate(platform) {
  const outputdir = `./tools/inklecate_${platform}`;
  const filterRelease = (release) => (release.prerelease === false);
  const filterAsset = (asset) => asset.name.includes(platform);
  await fs.promises.mkdir(outputdir, { recursive: true });
  await downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging);
}

async function main() {
  await downloadInklecate('windows');
  await downloadInklecate('linux');
  await downloadInklecate('mac');
}

main();
