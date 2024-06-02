const butInstall = document.getElementById('buttonInstall');

// Store the triggered events if not installed
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing 
  event.preventDefault();
  // Store the event so it can be triggered later
  window.deferredPrompt = event;
  // Remove the hidden class from the install button
  butInstall.classList.toggle('hidden', false);
});

// Prompt will appear when clicking on the install button
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  promptEvent.prompt();

  // Wait for the user to respond to the prompt
  const result = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${result.outcome}`);

  // Clear the deferredPrompt variable
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle('hidden', true);
});

// Clear the deferredPrompt after the app is installed
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
  window.deferredPrompt = null;
});
