it('should work', (done) => {

  // Imports the Google Cloud client library
  const monitoring = require('@google-cloud/monitoring');

  // Your Google Cloud Platform project ID
  const projectId = 'YOUR_PROJECT_ID';

  // Creates a client
  const client = new monitoring.MetricServiceClient();

  // Prepares an individual data point
  const dataPoint = {
    interval: {
      endTime: {
        seconds: Date.now() / 1000,
      },
    },
    value: {
      // The amount of sales
      doubleValue: 123.45,
    },
  };

  // Prepares the time series request
  const request = {
    name: client.projectPath(projectId),
    timeSeries: [
      {
        // Ties the data point to a custom metric
        metric: {
          type: 'custom.googleapis.com/stores/daily_sales',
          labels: {
            store_id: 'Pittsburgh',
          },
        },
        resource: {
          type: 'global',
          labels: {
            project_id: projectId,
          },
        },
        points: [dataPoint],
      },
    ],
  };

  // Writes time series data
  client
    .createTimeSeries(request)
    .then(results => {
      console.log(`Done writing time series data.`, results[0]);
      done()
    })
    .catch(err => {
      console.error('ERROR:', err);
      done()
    });
});

