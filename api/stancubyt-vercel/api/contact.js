export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Metoda nepermisă' });
  }

  try {
    const body = await request.body;
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return response.status(400).json({
        success: false,
        error: 'Toate câmpurile sunt obligatorii'
      });
    }
    
    // Aici poți adăuga logica de trimitere email
    console.log('📧 Mesaj contact primit:', { name, email, subject, message });
    
    // Simulare succes
    return response.status(200).json({
      success: true,
      message: 'Mesajul a fost primit! Vă vom contacta în curând.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Eroare contact:', error);
    return response.status(500).json({
      success: false,
      error: 'Eroare la procesarea mesajului'
    });
  }
}
