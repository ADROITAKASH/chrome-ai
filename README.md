# Chrome AI &nbsp; | &nbsp; Gemini Nano in Chrome

Chrome AI leverages Gemini Nano, Google’s innovative in-browser AI, to enhance web experiences by enabling powerful AI computations directly within Google Chrome.

## Project Overview

This repository demonstrates the integration of Google's Gemini Nano within Chrome browsers, showcasing AI capabilities that can be executed directly on the client-side without any server dependency.


## Prerequisites

### System Requirements

- A Chromium-based browser version 127 or higher, such as Google Chrome, Brave, or Microsoft Edge.

### Setting Up Gemini Nano

- **Install Chrome Canary**: Make sure you have version 127 or higher. [Download Chrome Canary](https://www.google.com/chrome/canary/).
- **Enable Prompt API**: Navigate to `chrome://flags/#prompt-api-for-gemini-nano` and set it to "Enabled".
- **Enable Optimization Guide**: Go to `chrome://flags/#optimization-guide-on-device-model`, set it to "Enabled BypassPerfRequirement". Restart your browser.
- **Download Model**: Visit `chrome://components/`, check "Optimization Guide On Device Model", and update it. If it shows "0.0.0.0", click "Check for update".
- **Verify Setup**: Launch a webpage, open the console with `F12`, and verify by typing `window.ai`.

### Troubleshooting Tips

If you encounter issues accessing `window.ai` after following the setup steps:
- Try disabling and re-enabling the aforementioned options in `chrome://flags`.
- Restart your computer completely and then attempt to access `window.ai` again.

### Test Code

```javascript
const session = await window.ai.createTextSession();
await session.prompt("What can you do?");
```

## Getting Started
To explore this demo, clone the repository and start experimenting with the integrated AI functionalities:

```bash
git clone git@github.com:ADROITAKASH/chrome-ai.git
cd chrome-ai

yarn
yarn dev
```

## Dive Deeper

Interested in learning more about in-browser AI capabilities? Check out our detailed blog post on [Medium](#).

## Contributions Welcome!

We encourage contributions to help evolve this project further. Whether it's feature enhancement, bug fixes, or new ideas, your input is valuable!

## Licensing

This project is released under the MIT License. For more details, see the [LICENSE](LICENSE.md) file.

## Stay Connected

For updates, follow me on [Twitter](https://x.com/akashtdev) and [Instagram](https://www.instagram.com/akashtdev/)