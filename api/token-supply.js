// api/token-supply.js
export default async function handler(req, res) {
    const CONTRACT_ADDRESS = '0x44Cf220399be798baeaE45fd7C4fF44623713833';
    const ETHERSCAN_API_KEY = 'WRE7KWAN2AS9P1IJIPJKZUSQ34FSVIAQHV';
    
    const url = `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        res.status(200).json({
            success: data.status === '1',
            data: data.result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error',
            timestamp: new Date().toISOString()
        });
    }
}
