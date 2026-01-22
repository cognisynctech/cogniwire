# Firebase Setup Steps

1. Create Firestore Database:
   - Go to Firebase Console > Cogniwire project
   - Click on "Firestore Database" in the left sidebar
   - Click "Create Database"
   - Start in "Production Mode"
   - Choose the location closest to your target audience
   
2. Set up Security Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow write only to newsletter_subscribers collection
       match /newsletter_subscribers/{document} {
         allow write: if true;  // Anyone can subscribe
         allow read: if false;  // Only backend can read
       }
       
       // Default deny
       match /{document=**} {
         allow read, write: if false;
       }
     }
   }
   ```

3. Project Settings:
   - Click the gear icon (⚙️) next to "Project Overview"
   - Go to "Project Settings"
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Register app with nickname "cogniwire-web"
   - Copy the Firebase configuration
