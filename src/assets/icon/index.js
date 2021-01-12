const request = require.context('./', false, /\.svg$/);
request.keys().forEach(request);
