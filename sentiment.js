'use strict';

// [START language_quickstart]
// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Your Google Cloud Platform project ID
const projectId = 'project2-journal';

// Instantiates a client
const languageClient = Language({
  projectId: projectId
});

// The text to analyze
const text = 'Hello, world!';

// Detects the sentiment of the text
languageClient.detectSentiment(text)
  .then((results) => {
    const sentiment = results[0];

    console.log(`Text: ${text}`);
    console.log(`Sentiment: ${sentiment}`);
  });
// [END language_quickstart]