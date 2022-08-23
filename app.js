const express = require('express')
const app = express()
const port = 3000

/* Show how to use AI */
let start = Date.now();
let appInsights = require('applicationinsights');
const { ExceptionData } = require('applicationinsights/out/Declarations/Contracts');
appInsights.setup('InstrumentationKey=cca25d53-c099-415b-a994-efb6faa5bd94;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/');
appInsights.defaultClient.config.samplingPercentage = 100; // 100% of all telemetry will be sent to Application Insights
appInsights.start();

let client = appInsights.defaultClient;
client.trackEvent({name: "Mi evento personalizado", properties: {versionNode: "18", useExpress:"yes"}});


app.get('/', (req, res) => {
  /* Request */
  client.trackNodeHttpRequest({request: req, response: res});
  /* Exceptions */
  client.trackException({exception: new Error("Example that how track a Exception")});
  res.send('Hello World!')
})

app.listen(port, () => {
     /* Metrics */
    let duration = Date.now() - start;
    client.trackMetric({name: "Server startup time", value: duration}); 
    console.log(`Example app listening on port ${port}`)
})