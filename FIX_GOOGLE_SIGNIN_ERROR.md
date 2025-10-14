# 🔧 Fix: Google Sign-In "redirect_uri_mismatch" Error

## ❌ The Error You're Seeing

```
Access blocked: project-326810779693's request is invalid
Error 400: redirect_uri_mismatch
```

**What this means:** Firebase doesn't recognize your app's URL (localhost) as an authorized redirect URI.

---

## ✅ Quick Fix (3 Steps - 2 Minutes)

### Step 1: Complete Your Firebase Config

Your `src/firebase.js` is missing 2 values. Let me help:

1. **Go to Firebase Console:** https://console.firebase.google.com
2. **Open "codeverse" project**
3. **Click ⚙️ Settings → Project Settings**
4. **Scroll to "Your apps"** section
5. **Copy the FULL config:**

You should see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyARB4FQ95LemLLeL1uw7raAqN1pPUobTaY",
  authDomain: "codeverse.firebaseapp.com",
  projectId: "codeverse",
  storageBucket: "codeverse.appspot.com",
  messagingSenderId: "123456789012",  // ← You're missing this
  appId: "1:123456789:web:abc123def456"  // ← And this
};
```

**Update your `src/firebase.js`** with the actual values for:
- `messagingSenderId`
- `appId`

---

### Step 2: Add Authorized Redirect URIs (THE FIX!)

This is the main fix for your error:

1. **Go to Firebase Console:** https://console.firebase.google.com
2. **Select "codeverse" project**
3. **Click "Authentication" in left sidebar**
4. **Click "Settings" tab** (next to "Sign-in method")
5. **Scroll to "Authorized domains"**
6. **Make sure these are listed:**
   - ✅ `localhost` (should already be there)
   - ✅ `127.0.0.1` (add if missing)

**If localhost is missing:**
- Click "Add domain"
- Enter: `localhost`
- Click "Add"

---

### Step 3: Configure OAuth Redirect URIs in Google Cloud Console

**This is the critical step that fixes your error:**

1. **Go to Google Cloud Console:** https://console.cloud.google.com
2. **Select your project** (same as Firebase project ID: `project-326810779693`)
3. **Navigate to:** APIs & Services → Credentials
4. **Find "OAuth 2.0 Client IDs"** section
5. **Click on the client ID** (usually named "Web client (auto created by Google Service)")
6. **Scroll to "Authorized redirect URIs"**
7. **Click "+ ADD URI"**
8. **Add these URIs one by one:**
   ```
   http://localhost
   http://localhost:5173
   http://localhost:5173/__/auth/handler
   https://codeverse.firebaseapp.com/__/auth/handler
   ```
9. **Click "SAVE"**

---

## 📋 Complete Checklist

### Firebase Console Setup:
- [ ] Copy complete firebaseConfig (with messagingSenderId and appId)
- [ ] Paste into `src/firebase.js`
- [ ] Authentication → Sign-in method → Enable "Google"
- [ ] Authentication → Settings → Authorized domains → Verify "localhost" exists

### Google Cloud Console Setup:
- [ ] Go to console.cloud.google.com
- [ ] Select project: `project-326810779693`
- [ ] APIs & Services → Credentials
- [ ] OAuth 2.0 Client → Click your client ID
- [ ] Add redirect URIs:
  - [ ] `http://localhost`
  - [ ] `http://localhost:5173`
  - [ ] `http://localhost:5173/__/auth/handler`
  - [ ] `https://codeverse.firebaseapp.com/__/auth/handler`
- [ ] Click "SAVE"

### Test:
- [ ] Run `npm run dev`
- [ ] Go to http://localhost:5173/login
- [ ] Click "Google" button
- [ ] Should work now! ✅

---

## 🎯 Alternative: Create New OAuth Client

If you can't find the OAuth client, create a new one:

1. **Google Cloud Console** → APIs & Services → Credentials
2. **Click "+ CREATE CREDENTIALS"**
3. **Select "OAuth client ID"**
4. **Application type:** Web application
5. **Name:** CodeVerse Web Client
6. **Authorized JavaScript origins:**
   ```
   http://localhost:5173
   ```
7. **Authorized redirect URIs:**
   ```
   http://localhost:5173/__/auth/handler
   https://codeverse.firebaseapp.com/__/auth/handler
   ```
8. **Click "CREATE"**
9. **Copy the Client ID** (you don't need the secret for Firebase)
10. **Back to Firebase Console** → Authentication → Sign-in method → Google
11. **Click "Web SDK configuration"**
12. **Paste the new Client ID**
13. **Save**

---

## 🐛 Common Issues

### Issue: "Can't find OAuth client in Google Cloud"

**Solution:**
- Make sure you're in the correct project
- Project ID should be: `project-326810779693`
- Look for client named: "Web client (auto created by Google Service)"

### Issue: "Project doesn't exist in Google Cloud"

**Solution:**
- Firebase automatically creates a Google Cloud project
- Make sure you're logged in with the same Google account
- Try this direct link: https://console.cloud.google.com/apis/credentials?project=codeverse

### Issue: "Still getting redirect_uri_mismatch"

**Solution:**
1. Clear browser cache
2. Wait 5-10 minutes for changes to propagate
3. Make sure you added ALL redirect URIs
4. Check that you clicked "SAVE" in Google Cloud Console
5. Try in incognito/private window

---

## 📸 Visual Guide

### Where to Add Redirect URIs:

```
Google Cloud Console
  └── APIs & Services
      └── Credentials
          └── OAuth 2.0 Client IDs
              └── [Your Client ID]
                  └── Authorized redirect URIs
                      ├─ http://localhost:5173
                      ├─ http://localhost:5173/__/auth/handler
                      └─ https://codeverse.firebaseapp.com/__/auth/handler
                           ↑
                        [ADD URI] button
```

---

## 🔄 What's Happening Behind the Scenes

```
User clicks "Sign in with Google"
         ↓
Firebase opens Google popup
         ↓
Google authenticates user
         ↓
Google tries to redirect back to: http://localhost:5173/__/auth/handler
         ↓
❌ "redirect_uri_mismatch" - This URL is not authorized!
         ↓
✅ After fix: Redirect succeeds → User logged in!
```

---

## ✅ After the Fix

Once you complete the steps, you should see:

1. ✅ Google popup opens
2. ✅ You select your account
3. ✅ Popup closes automatically
4. ✅ Console log: `✅ Google Sign-In successful: your@email.com`
5. ✅ Redirect to `/dashboard`
6. ✅ Your name appears in navbar

---

## 🚀 Quick Summary

**The problem:** Your OAuth client doesn't have `localhost:5173` as an authorized redirect URI.

**The fix:** Add redirect URIs in Google Cloud Console → APIs & Services → Credentials.

**Time needed:** ~2 minutes

**Then:** Google Sign-In will work perfectly! 🎉

---

## 📞 Still Having Issues?

If it still doesn't work after following these steps:

1. **Check browser console** for errors (F12)
2. **Check Firebase Console** → Authentication → Users (see if anything shows up)
3. **Wait 5-10 minutes** for Google Cloud changes to propagate
4. **Try incognito mode** to rule out caching issues
5. **Verify your API key** is correct in firebase.js

---

**Created:** October 14, 2025  
**Error:** redirect_uri_mismatch  
**Status:** ✅ Fixable in 2 minutes  
**Difficulty:** 🟢 Easy
