LiveQL:

LiveQL is a real-time library for graphQL in which the client subscribes to a specific mutation or query, (essentially subscribing to the data itself), as opposed to the an event.

Because the client doesn't subscribe to an event but rather the data it offers an alternative approach Facebook's publisher/subscriber method as well as polling.

This repo is the demo application; a Reddit-like forum where users comment on surf video. All interaction is facilitated through liveQL, thus integrating graphQL and WebSockets, so all other clients see user interaction in real time.

Checkout the deployed demo hosted at Heroku here:
https://quiet-lake-84075.herokuapp.com/

Feel free to download the zip and play around with it. 

To see it in full force follow these steps:
1. clone this repo
2. navigate to the deployed demo on Heroku
3. In your terminal navigate to test/nightmare and run <code>node scraper.js</code>
4. Watch headless browsers spins up and act as separate clients. You will see their interaction without refreshing the page.   

