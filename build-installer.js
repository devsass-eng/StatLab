const electronInstaller = require('electron-winstaller');

async function buildInstaller() {
  try {
    console.log('Creating StatLab Setup Installer...');
    await electronInstaller.createWindowsInstaller({
      appDirectory: './dist/StatLab-win32-x64',
      outputDirectory: './dist/installer',
      authors: 'StatLab', // No spaces
      name: 'StatLab', // Explicit name
      exe: 'StatLab.exe',
      setupExe: 'StatLab-Setup.exe',
      noMsi: true,
      description: 'StatLab'
    });
    console.log('Installer created successfully at dist/installer/StatLab-Setup.exe');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
}

buildInstaller();
