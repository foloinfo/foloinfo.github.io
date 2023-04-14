---
title: Bookmarklet to get direct link from google drive file
date: '2023-04-13T15:00:00.000Z'
---

Small script to take out id from the uri and makes it easy to copy the direct link url.
Add the script below as a bookmarklet and press from the sharing view of your item.

```javascript
javascript:(function() {
  const url = window.location.href;
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split('/');
  const id = pathParts[pathParts.indexOf('d') + 1];
  const directLink = `https://drive.google.com/uc?id=${id}`;

  const selectedText = prompt('Press Ctrl+C to copy the direct link:', directLink);

  if (selectedText) {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.value = selectedText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
})();
```
