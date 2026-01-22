import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Replace with your actual Supabase project credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Career application submission
export const submitCareerApplication = async (applicationData) => {
  try {
    console.log('Submitting career application:', applicationData);
    
    const insertData = {
      name: applicationData.name,
      email: applicationData.email,
      phone: applicationData.phone || null,
      position_title: applicationData.position_title || null,
      resume: applicationData.resume || null,
      answers: applicationData.answers ? JSON.stringify(applicationData.answers) : null,
      status: 'pending'
    };
    
    const { data, error } = await supabase
      .from('career_applications')
      .insert([insertData])
      .select();
    
    console.log('Supabase response:', data, error);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting application:', error);
    return { success: false, error: error.message };
  }
};

// Get all available positions
export const getOpenPositions = async () => {
  try {
    const { data, error } = await supabase
      .from('open_positions')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching positions:', error);
    return { success: false, error: error.message };
  }
};
