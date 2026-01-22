import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Validates email format
export const validateEmail = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Safer function to check if an email exists in a given collection
export const checkEmailExists = async (email, collectionName) => {
  // If email is invalid, don't even check
  if (!validateEmail(email)) return false;
  
  const maxRetries = 3;
  let retries = 0;
  let lastError = null;

  while (retries < maxRetries) {
    try {
      // Create a safe query
      const q = query(
        collection(db, collectionName || 'newsletter_subscribers'), 
        where("email", "==", String(email).toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      lastError = error;
      console.warn(`Firebase query attempt ${retries + 1} failed:`, error);
      retries++;
      if (retries === maxRetries) {
        console.error('Max retries reached for Firebase query:', error);
        return false; // Return false instead of throwing to avoid breaking the form
      }
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }
  
  return false; // Fallback in case something goes wrong with the loop
};
