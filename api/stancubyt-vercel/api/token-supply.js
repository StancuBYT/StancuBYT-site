export default async function handler(request, response) {
  // Setează CORS headers
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Configurație
  const CONTRACT_ADDRESS = '0x44Cf220399be798baeaE45fd7C4fF44623713833';
  const ETHERSCAN_API_KEY = 'WRE7KWAN2AS9P1IJIPJKZUSQ34FSVIAQHV';
  
  try {
    // Apelează Etherscan API
    const etherscanUrl = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;
    
    const fetchResponse = await fetch(etherscanUrl);
    const data = await fetchResponse.json();
    
    // Formatează răspunsul
    if (data.status === '1') {
      const supplyWei = data.result;
      const supplyTokens = supplyWei / Math.pow(10, 18); // 18 decimals
      
      response.status(200).json({
        success: true,
        data: {
          raw: supplyWei,
          formatted: supplyTokens.toLocaleString('ro-RO', { maximumFractionDigits: 0 }),
          tokens: supplyTokens
        },
        timestamp: new Date().toISOString()
      });
    } else {
      response.status(500).json({
        success: false,
        error: 'Eroare de la Etherscan',
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Eroare API:', error);
    response.status(500).json({
      success: false,
      error: 'Eroare internă server',
      timestamp: new Date().toISOString()
    });
  }
}
