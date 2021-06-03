const fetch = require('node-fetch');
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

exports.handler = async (event) => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/wizeline/patio-ui/events',
      {
        method: 'get',
        headers: {
          Authorization: `token ${process.env.GH_TOKEN}`,
        },
      },
    );

    const data = await response.json();

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
