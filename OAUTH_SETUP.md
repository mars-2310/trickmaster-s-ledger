# OAuth Setup Guide

## Quick Setup for Google OAuth

### 1. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### 2. Update Environment Variables

Update your `.env.local` file with the actual credentials:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-actual-secret-key-here

# Google OAuth Credentials (replace with actual values)
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret

# Database (optional for testing)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 3. Test the Connection

1. Restart your development server: `npm run dev`
2. Visit `http://localhost:3001`
3. Click "Sign in" button
4. You should be redirected to Google OAuth
5. After authentication, you'll be redirected to `/dashboard`

## Current Status

✅ **Landing page loads successfully**  
✅ **OAuth API endpoints configured**  
✅ **Authentication components connected**  
✅ **Redirect flow to dashboard**  
✅ **Session management working**  

## Troubleshooting

- **NEXTAUTH_URL warning**: Make sure the URL matches your current port
- **400 errors**: Usually means OAuth credentials are not set up
- **Redirect issues**: Check that callback URLs match exactly in Google Console

## Next Steps

1. Set up your Google OAuth credentials
2. Update the environment variables
3. Test the complete authentication flow
4. Deploy with production URLs
