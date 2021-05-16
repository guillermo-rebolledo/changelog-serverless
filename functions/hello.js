const github = require('octonode');

exports.handler = async (event) => {
  try {
    const client = github.client(process.env.GH_TOKEN);
    const repoR = await client.repo(`wizeline/patio-ui`);

    const [data] = await repoR.commitsAsync();

    return {
      statusCode: 200,
      body: {
        error: null,
        data,
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { error },
    };
  }
};
