# 🎯 EXACT FIX for Your Google Sign-In Error

## Your App Info:
- **Running on:** http://localhost:5175
- **Error:** redirect_uri_mismatch
- **Project ID:** project-326810779693

---

## ✅ THE FIX (Do This Now - 3 Steps)

### 🔥 Step 1: Complete Firebase Config (1 minute)

Your `src/firebase.js` is incomplete. You need to add 2 more values:

1. **Open Firebase Console:** https://console.firebase.google.com/project/codeverse/settings/general
2. **Scroll down to "Your apps"**
3. **Copy the complete config**
4. **Look for these two missing values:**
   - `messagingSenderId` (a number like "123456789012")
   - `appId` (looks like "1:123456789:web:abc123def")

**Update your `src/firebase.js` lines 14-15:**
```javascript
messagingSenderId: "YOUR_ACTUAL_NUMBER_HERE",  // ← Replace this
appId: "YOUR_ACTUAL_APP_ID_HERE"               // ← Replace this
```

---

### 🔥 Step 2: Add Redirect URIs in Google Cloud Console (2 minutes)

**This is the main fix for the redirect_uri_mismatch error!**

1. **Go to Google Cloud Console:**
   - Direct link: https://console.cloud.google.com/apis/credentials?project=codeverse
   - Or: https://console.cloud.google.com → Select project "codeverse" → APIs & Services → Credentials

2. **Find "OAuth 2.0 Client IDs" section**

3. **Click on the Web client** (usually named "Web client (auto created by Google Service)")

4. **Scroll to "Authorized redirect URIs"**

5. **Click "+ ADD URI"** and add these **EXACT URIs** one by one:

   ```
   http://localhost:5175
   ```
   Click "ADD URI" again:
   ```
   http://localhost:5175/__/auth/handler
   ```
   Click "ADD URI" again:
   ```
   https://codeverse.firebaseapp.com/__/auth/handler
   ```
   Click "ADD URI" again (for when you deploy):
   ```
   http://localhost:5173
   ```
   Click "ADD URI" again:
   ```
   http://localhost:5173/__/auth/handler
   ```

6. **IMPORTANT: Click "SAVE" button at the bottom!**

7. **Wait 2-3 minutes** for changes to take effect

---

### 🔥 Step 3: Verify Authorized Domains in Firebase (30 seconds)

1. **Go to Firebase Console:** https://console.firebase.google.com/project/codeverse/authentication/settings
2. **Click "Settings" tab** (next to "Sign-in method")
3. **Scroll to "Authorized domains"**
4. **Verify `localhost` is in the list**
   - If not, click "Add domain" and add `localhost`

---

## 🧪 Test It Now!

1. **Your app is already running on:** http://localhost:5175
2. **Go to:** http://localhost:5175/login
3. **Click the "Google" button**
4. **Should work now!** ✅

---

## 🔍 Troubleshooting

### Still Getting the Error?

**Wait 5 minutes and try again** - Google Cloud changes take time to propagate.

**Clear browser cache:**
- Chrome: Ctrl+Shift+Delete → Clear data
- Or use Incognito/Private window

**Verify you clicked SAVE** in Google Cloud Console after adding URIs

**Check you're logged into the correct Google account** (nimishasubhash2006@gmail.com)

---

## 📊 What Should Happen After Fix

```
✅ Click "Google" button
    ↓
✅ Google popup opens
    ↓
✅ Select your account (nimishasubhash2006@gmail.com)
    ↓
✅ Popup closes automatically
    ↓
✅ Console shows: "✅ Google Sign-In successful"
    ↓
✅ Redirect to /dashboard
    ↓
✅ Your name appears in navbar
```

---

## 🎯 Quick Reference

**Your app URL:** http://localhost:5175  
**Firebase project:** codeverse  
**Google Cloud project:** project-326810779693  

**Redirect URIs to add:**
- `http://localhost:5175`
- `http://localhost:5175/__/auth/handler`
- `https://codeverse.firebaseapp.com/__/auth/handler`
- `http://localhost:5173` (backup for default Vite port)
- `http://localhost:5173/__/auth/handler`

---

## 🚀 After You Fix This

Once Google Sign-In works, you'll be able to:
- ✅ Sign in with Google in one click
- ✅ Access dashboard with your Google profile
- ✅ See your Google profile picture
- ✅ Your email and name auto-filled
- ✅ No need to create separate password

---

**⏱️ Total time:** ~3 minutes  
**💡 Main fix:** Add redirect URIs in Google Cloud Console  
**🎯 Where:** https://console.cloud.google.com/apis/credentials?project=codeverse

---

**Go do Step 2 now! That's the main fix!** 🚀
