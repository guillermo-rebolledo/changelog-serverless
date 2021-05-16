const github = require('octonode');

exports.handler = async (event) => {
  try {
    const client = github.client(process.env.GH_TOKEN);
    const repoR = await client.repo(`wizeline/patio-ui`);

    const [data] = await repoR.commitsAsync();

    const body = {
      error: null,
      data,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
