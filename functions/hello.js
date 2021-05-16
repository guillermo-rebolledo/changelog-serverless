const github = require('octonode');

exports.handler = async (event) => {
  const client = github.client(process.env.GH_TOKEN);
  const repoR = await client.repo(`wizeline/patio-ui`);

  Promise.allSettled([repoR.prsAsync(), repoR.commitsAsync()])
    .then((results) => {
      const outputData = { pullRequests: null, commits: null };
      results
        .filter((result) => result.status === 'fulfilled')
        .forEach((result, idx) => {
          const [data] = result.value;
          if (idx === 0) {
            //PRs request
            outputData.pullRequests = data;
          } else {
            outputData.commits = data;
          }
        });

      return {
        data: outputData,
        error: null,
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: {
          error,
        },
      };
    });
};
