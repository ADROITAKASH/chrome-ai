<a href="https://chrome-window-ai.vercel.app/">
  <img alt="Next.js 14 and App Router Semantic Search." src="https://chrome-window-ai.vercel.app/cover-image.png">
  <h1 align="center">Chrome AI | In-Browser Gemini Nano Experience</h1>
</a>

<p align="center">
  Experience our AI chatbot demo using Google's Gemini Nano, running entirely in Chrome without server dependencies.
</p>

<p align="center">
  <a href="#system-requirements"><strong>Explore Features</strong></a> ·
  <a href="#setup-instructions"><strong>Setup Guide</strong></a> ·
  <a href="#local-deployment"><strong>Local Deployment</strong></a>
</p>

<p align="center">
  <a href="https://link.medium.com/keqpglVxTKb"><strong>Medium Article</strong></a>
</p>
<br/>

## System Requirements

Ensure your system meets the following specifications to utilize Chrome AI effectively:

- **Browser**: Chromium-based (Google Chrome, Brave, Microsoft Edge) version 127 or higher.

## Setup Instructions

### Install and Configure

1. **Install Chrome Canary**: Required version 127 or above. [Download here](https://www.google.com/chrome/canary/).
2. **Enable Prompt API**: In Chrome, navigate to `chrome://flags/#prompt-api-for-gemini-nano` and set it to "Enabled". 
3. **Enable Optimization Guide**: Navigate to `chrome://flags/#optimization-guide-on-device-model`, setting it to "Enabled BypassPerfRequirement".
4. **Restart Browser**: Necessary for changes to take effect.
5. **Download Model**: Navigate to `chrome://components/`, locate "Optimization Guide On Device Model", and click "Check for update" if it shows "0.0.0.0".

### Verification

Open any webpage, press `F12` to open the console, and type `window.ai` to check the setup.

### Sample Code

```javascript
const session = await window.ai.createTextSession();
await session.prompt("What can you do?");
```

### Troubleshooting

If you encounter issues accessing `window.ai` or missing "Optimization Guide On Device Model" option:
- Try disabling and re-enabling the aforementioned options in `chrome://flags`.
- Restart your computer completely and then attempt to access `window.ai` again.

## Local Deployment

To run this project locally, follow these steps:

```bash
git clone git@github.com:ADROITAKASH/chrome-ai.git
cd chrome-ai

yarn
yarn dev
```

## Deep Dive

Learn more about the capabilities of in-browser AI by reading our detailed blog post on [Medium](https://link.medium.com/keqpglVxTKb).

## Contributions

Your contributions can help this project grow. Feel free to submit feature enhancements, bug fixes, or new ideas through our GitHub repository.

## Licensing

This project is open-sourced under the MIT License. Review the [LICENSE](LICENSE.md) for more details.

## Stay Connected

For the latest updates, follow me on [Twitter](https://x.com/akashtdev) and [Instagram](https://www.instagram.com/akashtdev/).