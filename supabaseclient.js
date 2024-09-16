require('dotenv').config(); // Certifique-se de que esta linha está no início do arquivo
const { createClient } = require('@supabase/supabase-js');

// Acesso às variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and key must be provided');
}

// Criação do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
