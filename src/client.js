import { createClient } from '@supabase/supabase-js';

const URL = 'https://spyyplqoyboveuunplhq.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNweXlwbHFveWJvdmV1dW5wbGhxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMzM5ODgxOCwiZXhwIjoyMDM4OTc0ODE4fQ.Kuf8FIh-R_yEgoFUBRLVwJXotapwG0JPWxtCy_XGOoo';

export const supabase = createClient(URL, API_KEY);
