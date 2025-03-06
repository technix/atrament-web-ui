const fs = require('node:fs');
const os = require('node:os');

const user = 'inkle';
const repo = 'ink';
const outputdir = `./tools/inklecate`;
const leaveZipped = false;
const disableLogging = false;

const platforms = {
  win32: 'windows',
  linux: 'linux',
  darwin: 'mac'
}

async function downloadInklecate(platform) {
  const { downloadRelease } = await import('@terascope/fetch-github-release');
  const filterRelease = (release) => (release.prerelease === false);
  const filterAsset = (asset) => asset.name.includes(platform);
  await fs.promises.mkdir(outputdir, { recursive: true });
  await downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging);
  if (platform !== 'windows') {
    await fs.promises.chmod(`${outputdir}/inklecate`, '755');
  }
}

async function main() {
  const env = os.platform();
  const platform = platforms[env];
  if (platform) {
    try {
      await downloadInklecate(platform);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.warn(`Inklecate is not available for platform: ${env}. Atrament UI will use JS compiler instead.`);
  }
}

main();
