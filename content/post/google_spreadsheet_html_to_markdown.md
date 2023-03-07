---
title: Converting HTML to Markdown using Google Spreadsheet with RapidAPI
date: '2023-03-06T15:00:00.000Z'
---

I needed to convert large amount of HTML strings into markdown.

You will need to sign up for RapidAPI, but you can use this endpoint for free (at least at this point)

Create an AppScript project for the sheet and add the function below.

Don't forget to set your `X-RapidAPI-Key`.

Following the example at [https://rapidapi.com/rimuatkinson/api/html-to-gemtext-or-markdown](https://rapidapi.com/rimuatkinson/api/html-to-gemtext-or-markdown) will show you the key.

```javascript
const uri = 'https://html-to-gemtext-or-markdown.p.rapidapi.com/html2md/'

function MARKDOWN(html) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'your-api-token',
      'X-RapidAPI-Host': 'html-to-gemtext-or-markdown.p.rapidapi.com'
    },
    payload: JSON.stringify({ html })
  }
  const result = UrlFetchApp.fetch(uri, options)
  const body = result.getContentText()
  const json = JSON.parse(body)
  return json['result']
}
```

Simply apply the function to the cell and convert html string into markdown.

```
=MARKDOWN(B2)
```

It maybe useful when you want to convert all the blog posts into markdown.
