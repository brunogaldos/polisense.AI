# Firebase Setup Instructions

## Overview
The demo booking modal is fully functional and integrated with Firebase Firestore. To make it work with your Firebase account, follow these steps:

## Setup Steps

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Enable Firestore Database
1. In your Firebase project, go to **Build > Firestore Database**
2. Click "Create database"
3. Start in **test mode** for development (or production mode with proper security rules)
4. Choose a location for your database

### 3. Get Your Firebase Configuration
1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Polisense Landing")
5. Copy the `firebaseConfig` object

### 4. Update Configuration File
Open `lib/firebase.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 5. Set Up Firestore Security Rules (Production)
In Firestore Database > Rules, add these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /demo-requests/{document} {
      // Allow anyone to create new demo requests
      allow create: if true;

      // Only authenticated admin users can read/update/delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Data Structure

Demo requests are stored in the `demo-requests` collection with the following structure:

```typescript
{
  email: string,          // User's email address
  company: string,        // Organization name
  timestamp: Timestamp,   // Server timestamp when submitted
  status: "pending"       // Status of the request
}
```

## Testing

1. Start the development server: `npm run dev`
2. Open http://localhost:3000
3. Click any of these buttons:
   - "Get Started" (navigation bar)
   - "Book a Demo" (hero section)
   - "Schedule a Demo" (CTA section)
4. Fill in the form and submit
5. Check Firestore Console to verify the data was saved

## Environment Variables (Optional)

For better security in production, you can move Firebase config to environment variables:

1. Create `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

2. Update `lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ... etc
};
```

## Features Implemented

✅ Fully functional modal with smooth animations
✅ Form validation (email and company required)
✅ Loading state during submission
✅ Success confirmation message
✅ Error handling
✅ Firebase Firestore integration
✅ Server timestamp for all submissions
✅ Backdrop click to close
✅ Close button
✅ Responsive design matching your landing page theme

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify Firebase credentials are correct
3. Ensure Firestore is enabled in your Firebase project
4. Check that security rules allow writes to the `demo-requests` collection
