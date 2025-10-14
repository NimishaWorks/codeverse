# 🧪 Quick Testing Guide - Interview Hub

## How to Test All Features

### Server Running: ✅
**URL**: http://127.0.0.1:8080

---

## 1. **Coding Terminal** (with Camera & Timer)

### Steps to Test:
1. Navigate to "Interview Prep" tab
2. Click on "Coding Terminal" sub-tab
3. **Test Session Controls**:
   - Click "Start Session" → Should show green "Active" status
   - Timer should start counting down from 30:00
   - Click "Enable Camera" → Should request camera permission
   - Grant permission → Button should turn green "Camera Active"
   - Camera overlay should appear on screen
4. **Test Code Editor**:
   - Select language (Python/JavaScript/Java/C++/Go/Rust)
   - Code template should load
   - Type some code
   - Click "Run Code" → Should show loading then results
   - Click "Submit" → Should show success message
   - Click "Copy" → Code should be copied
   - Click "Reset" → Code should reset to template
5. **Test Tabs**:
   - Click "Solutions" tab → Should show placeholder
   - Click "Submissions" tab → Should show placeholder
   - Click "Description" → Should show problem
6. **Test Console Tabs**:
   - Click "Test Cases" → Should show 3 test cases
   - Click "Run" on individual test → Should run code
   - Click "Results" → Should show results after running
   - Click "Console" → Should show console output
7. **End Session**:
   - Click "End Session" → Camera and timer should stop
   - Status should return to "Not Started"

**Expected Result**: ✅ All buttons functional, camera and timer work

---

## 2. **AI Mock Interview** (with Webcam)

### Steps to Test:
1. Click "AI Mock Interview" sub-tab
2. **Select Configuration**:
   - Click "Technical" interview type → Should highlight blue
   - Try other types (Behavioral, System Design, HR) → Should highlight purple
   - Select experience level from dropdown
   - Click duration button (15m/30m/45m/60m) → Should highlight green
3. **Start Interview**:
   - Click "Start Interview" button
   - Grant camera/microphone permission when prompted
   - Should see your webcam feed in main panel
   - Timer should start counting (00:00, 00:01, ...)
   - Recording indicator should show (red dot)
   - Question 1 should display
4. **Test Controls**:
   - Click camera icon → Should mute/unmute video
   - Click microphone icon → Should mute/unmute audio
   - Click "Next" → Should go to question 2
   - Click "Previous" → Should go back to question 1
   - Progress bar should update (20% → 40% → ...)
5. **Type Notes**:
   - Scroll to notes section
   - Type some notes → Should save in textarea
6. **End Interview**:
   - Navigate to last question (question 5)
   - Click "Next" or "Finish" → Should end interview
   - Should show completion alert
   - Camera should stop
   - Should return to setup screen

**Expected Result**: ✅ Webcam works, timer runs, questions navigate

---

## 3. **Aptitude Tests** (with Camera & Timer)

### Steps to Test:
1. Click "Aptitude Tests" sub-tab
2. **View Categories**:
   - Should see 4 category cards (Logical, Quantitative, Verbal, Technical)
   - Hover over cards → Should scale up slightly
3. **Start Test**:
   - Click "Start Test" on Logical Reasoning
   - Camera should automatically start (if enabled in settings)
   - Timer should start countdown (10:00 for Logical)
   - Question 1 should display
4. **Answer Questions**:
   - Click an option → Should highlight blue
   - Click "Next" → Should go to question 2
   - Progress bar should update
5. **Complete Test**:
   - Answer all 10 questions
   - Should automatically finish
   - Camera and timer should stop
   - Should show results screen with:
     - Score percentage
     - Correct/Incorrect count
     - Detailed breakdown
6. **Try Another Category**:
   - Go back to category selection
   - Try Quantitative (12 questions, 15 min timer)

**Expected Result**: ✅ Camera auto-starts, timer countdown, results display

---

## 4. **Resume Builder** (with PDF Export)

### Steps to Test:
1. Navigate to "Resume Builder" tab
2. **Select Template**:
   - Click on different templates → Should highlight with blue border
3. **Choose Color**:
   - Click color circles → Should highlight with white border
4. **Select Font**:
   - Click font buttons → Should highlight
5. **Fill Information**:
   - Enter name, email, phone, etc.
   - Type in summary textarea
   - Add skills:
     - Type skill name
     - Click "Add Skill" or press Enter
     - Skill should appear as badge
     - Click badge to remove
   - Add experience:
     - Click "Add Experience"
     - Fill in job title, company, dates
   - Add education:
     - Click "Add Education"
     - Fill in degree, school, dates
6. **Live Preview**:
   - Right panel should update in real-time as you type
   - Template should reflect chosen style
7. **Export PDF**:
   - Click "Export PDF"
   - Should generate PDF (2-3 seconds)
   - PDF should download to your computer
   - Open PDF → Should match preview

**Expected Result**: ✅ Live preview works, PDF exports successfully

---

## 5. **ATS Score Checker** (with Keyword Analysis)

### Steps to Test:
1. Navigate to "ATS Checker" tab
2. **Upload Resume**:
   - Method 1: Drag and drop a PDF/DOC file
   - Method 2: Click upload box to browse
   - Method 3: Paste resume text directly
3. **(Optional) Add Job Description**:
   - Paste job description in second textarea
4. **Analyze**:
   - Click "Analyze Resume"
   - Should show loading animation
   - After 2 seconds, should display:
     - Animated score circle (0-100)
     - Color (red <60, yellow 60-80, green >80)
     - Found keywords (green badges)
     - Missing keywords (red badges)
     - 8 improvement suggestions
5. **Try Different Resume**:
   - Upload another resume
   - Score should be different based on content

**Expected Result**: ✅ Analysis works, score accurate, keywords detected

---

## 6. **Hackathons Section**

### Steps to Test:
1. Navigate to "Hackathons" tab
2. **View Guide**:
   - Should see 4-step guide with gradient cards
   - Hover over cards → Should have subtle effects
3. **Platform Cards**:
   - Should see 3 platforms (Devfolio, Unstop, MLH)
   - Hover → Should scale up
   - Click links → Should open in new tab
4. **Pro Tips**:
   - Should see 6 tip cards
   - Read through tips

**Expected Result**: ✅ All links work, UI looks polished

---

## 7. **Internships Section**

### Steps to Test:
1. Navigate to "Internships" tab
2. **Platform Cards**:
   - Should see 3 platforms (Internshala, LinkedIn, Wellfound)
   - Hover → Should scale up
   - Click "Browse Internships" → Should open platform
3. **Pro Tips**:
   - Should see 6 colorful gradient tip cards
   - Tips should have icons and descriptions

**Expected Result**: ✅ All platform links work, tips display well

---

## 🐛 Common Issues & Fixes

### Issue: Camera not working
**Fix**: 
- Check browser permissions
- Allow camera access in browser settings
- Try in Chrome/Edge (best support)

### Issue: PDF not exporting
**Fix**:
- Check browser console for errors
- Ensure jsPDF and html2canvas loaded
- Try disabling browser extensions

### Issue: Timer not counting
**Fix**:
- Refresh page
- Check console for JavaScript errors
- Ensure session started properly

### Issue: 404 Error on load
**Fix**:
- App automatically redirects to home
- Just wait 1 second
- Or manually navigate to http://127.0.0.1:8080

---

## ✅ Success Criteria

All features pass if:
1. ✅ Coding Terminal: Camera, timer, code execution work
2. ✅ AI Interview: Webcam shows, timer runs, questions navigate
3. ✅ Aptitude Tests: Auto-starts camera/timer, shows results
4. ✅ Resume Builder: Live preview updates, PDF exports
5. ✅ ATS Checker: Analyzes resume, shows score and keywords
6. ✅ Hackathons: All links work, UI polished
7. ✅ Internships: All links work, tips display

---

## 🎉 If All Tests Pass:

**CONGRATULATIONS!** 🎊

Your Interview Hub is **100% functional** and ready for:
- Student testing
- Demo presentations
- Production deployment
- Portfolio showcase

---

## 📝 Notes

- Camera requires HTTPS in production (works on localhost)
- PDF export works offline (no server needed)
- Timer accuracy: ±1 second
- Browser compatibility: Chrome/Edge recommended

---

**Happy Testing! 🚀**
