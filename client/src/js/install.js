// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => { });

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => { });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => { });

////////////////////////////////////////


const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); //to stop the mini-infobar from appearing on mobile
    window.deferredPrompt = event; // Stash the event so it can be triggered later.
    butInstall.style.display = 'block'; // Remove the hidden class from the button.
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }

    promptEvent.prompt(); // Show the install prompt
    const { outcome } = await promptEvent.userChoice;  // Wait for the user to respond to the prompt
    console.log('User response to the install prompt:', outcome);  // console log outcome
    window.deferredPrompt = null; // We've used the prompt, and can't use it again, throw it away
    butInstall.style.display = 'none'; // Hide the install button
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed'); //log PWA install
    window.deferredPrompt = null;
});
