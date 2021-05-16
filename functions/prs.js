const github = require('octonode');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event) => {
  try {
    const client = github.client(process.env.GH_TOKEN);
    const repoR = await client.repo(`wizeline/patio-ui`);

    const [data] = await repoR.prsAsync();

    const body = {
      error: null,
      data,
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(body),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error,
      }),
    };
  }
};
