export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  response.status(200).json({
    status: 'online',
    service: 'StancuBYT API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/token-supply',
      '/api/token-holders', 
      '/api/token-price',
      '/api/all-data',
      '/api/status'
    ],
    documentation: 'https://stancubyt.com'
  });
}
