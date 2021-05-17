const fetch = require('node-fetch');

(async function () {
  const response = await fetch(
    'https://api.github.com/repos/wizeline/patio-ui/actions/workflows',
    {
      method: 'get',
      headers: {
        Authorization: 'token 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',
      },
    },
  );

  const data = await response.json();

  console.log(data);
})();
