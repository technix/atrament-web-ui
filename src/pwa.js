let isPWAsupported = false;
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  isPWAsupported = true;
  deferredPrompt = e;
});

const installPWA = async () => {
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      deferredPrompt = null;
    }
  }
}

export default function pwa() {
  return [ isPWAsupported, installPWA ];
}
