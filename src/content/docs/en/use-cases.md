---
title: Use Cases
---

# Use Cases Analysis Document

## VibeConnect - Comprehensive Use Cases

---

## 1. Authentication & Account Management

### UC-01: User Registration

**Actor:** New User (Maya/Liam)  
**Precondition:** User has not registered before  
**Primary Flow:**

1. User opens VibeConnect web app
2. User clicks "Sign Up"
3. User enters email and password
4. User confirms they are 16+ years old
5. System sends verification email
6. User clicks verification link
7. User completes profile (username, full name, avatar)
8. System creates account and logs user in

**Alternative Flow:**

- 3a. User chooses "Sign up with Google/Apple"
- 3b. System authenticates via OAuth
- 3c. Continue to step 7

**Postcondition:** User account created, logged in

---

### UC-02: Guardian Account Setup

**Actor:** Parent (David/Sarah)  
**Precondition:** Parent has registered account  
**Primary Flow:**

1. Parent navigates to "Guardian Mode" settings
2. Parent clicks "Link Child Account"
3. System generates unique pairing code
4. Parent shares code with child
5. Child enters code in their app
6. System verifies both parties are 18+ (parent) and under 18 (child)
7. Child sees notification "Your parent [name] wants to link accounts"
8. Child accepts or declines
9. If accepted, system creates guardian relationship
10. Parent gains access to Guardian Dashboard

**Alternative Flow:**

- 8a. Child declines - system notifies parent, no link created

**Postcondition:** Parent-child accounts linked, Guardian Mode active

---

### UC-03: User Login

**Actor:** Registered User  
**Precondition:** User has valid account  
**Primary Flow:**

1. User opens app
2. User enters email/username and password
3. System validates credentials
4. System generates JWT token
5. User is logged in, redirected to photo feed

**Alternative Flow:**

- 3a. Invalid credentials - show error message
- 2a. User clicks "Forgot Password" - trigger password reset flow

**Postcondition:** User authenticated and in app

---

## 2. Photo Capture & Sharing

### UC-04: Capture and Send Photo (Core Feature)

**Actor:** Teen User (Maya)  
**Precondition:** User is logged in, has at least 1 friend  
**Primary Flow:**

1. User clicks camera icon on home screen
2. Browser requests camera permission (if first time)
3. User grants camera access
4. Camera stream opens in full-screen mode
5. User positions camera and clicks capture button
6. Photo is captured and shown in preview
7. System automatically compresses photo (< 2MB)
8. System extracts EXIF data (if location enabled)
9. User optionally adds caption (max 200 characters)
10. User selects friend circle to share with
11. User clicks "Send"
12. System encrypts photo metadata
13. System uploads photo to Supabase Storage (shows progress)
14. System creates photo record in database
15. System sends real-time notification to all friends in circle
16. System shows "Photo sent!" confirmation
17. User returns to photo feed

**Alternative Flow:**

- 2a. User denies camera permission - show "Use File Upload" button
- 2b. User selects photo from gallery instead
- 13a. Upload fails (network error) - show retry button, queue for background retry

**Performance Requirement:** Steps 7-15 must complete in < 12 seconds

**Postcondition:** Photo shared with friend circle, visible on their feeds

---

### UC-05: View Photo Feed

**Actor:** Any User  
**Precondition:** User is logged in  
**Primary Flow:**

1. User opens app or navigates to home feed
2. System loads most recent 20 photos from all friend circles
3. System displays photos in reverse chronological order
4. Each photo shows:
   - Sender's name and avatar
   - Photo image
   - Timestamp (e.g., "2 hours ago")
   - Location badge (if location enabled)
   - Expiration countdown
5. User scrolls down to see more photos
6. System loads next 20 photos (infinite scroll)

**Alternative Flow:**

- 2a. No photos yet - show empty state with "Send your first Vibe!"
- 6a. User reaches end of photos - show "You're all caught up"

**Postcondition:** User sees updated photo feed

---

### UC-06: View Photo with Location on Map

**Actor:** Any User (especially Chloe)  
**Precondition:** User viewing photo that has location enabled  
**Primary Flow:**

1. User clicks on location badge on photo
2. System opens Location Map modal
3. System displays Mapbox map centered on photo location
4. System shows pin marker at exact coordinates
5. System displays location name (reverse geocoded)
6. System shows all other photos from friend circle with locations on same map
7. User can zoom/pan map to explore
8. User clicks on other photo markers to view those photos
9. User closes map modal

**Alternative Flow:**

- 1a. Photo has no location - badge not shown
- 6a. User has location sharing disabled - show only this photo's location

**Postcondition:** User sees geographic context of photo

---

### UC-07: Receive Real-time Photo Notification

**Actor:** Friend Circle Member  
**Precondition:** User is in friend circle, has notifications enabled  
**Primary Flow:**

1. Another user sends photo to shared circle
2. System triggers real-time notification via:
   - **If app is open:** WebSocket/Supabase Realtime update
   - **If app is closed:** Web Push notification
3. Notification displays:
   - Sender's name
   - Preview text: "shared a new Vibe"
   - Small thumbnail (if push notification)
4. User clicks notification
5. App opens to photo feed with new photo at top
6. New photo has subtle highlight animation

**Alternative Flow:**

- User has notifications disabled - no push sent, but photo appears in feed when they open app

**Postcondition:** User aware of new photo, can view immediately

---

## 3. Friend Circle Management

### UC-08: Invite Friend via QR Code

**Actor:** User (Maya)  
**Precondition:** User is logged in  
**Primary Flow:**

1. User navigates to "Add Friends" screen
2. User clicks "Share QR Code"
3. System generates unique QR code containing user ID
4. User shows QR code to friend in person
5. Friend opens VibeConnect app
6. Friend clicks "Scan QR Code"
7. Friend's camera opens with QR scanner
8. Friend scans user's QR code
9. System decodes QR data and loads user's profile
10. Friend clicks "Send Friend Request"
11. System creates pending friend request
12. User receives notification "Friend request from [name]"
13. User reviews friend's profile
14. User clicks "Accept"
15. System creates bidirectional friendship
16. Both users receive confirmation notification
17. Both users can now share photos with each other

**Alternative Flow:**

- 14a. User clicks "Decline" - request removed, friend notified

**Postcondition:** Users are connected as friends

---

### UC-09: Invite Friend via Link

**Actor:** User (Liam)  
**Precondition:** User is logged in  
**Primary Flow:**

1. User navigates to "Add Friends"
2. User clicks "Share Invite Link"
3. System generates unique invite URL (e.g., vibeconnect.app/invite/abc123)
4. User copies link
5. User shares link via messaging app (WhatsApp, iMessage, etc.)
6. Friend clicks link
7. Link opens VibeConnect (or app store if not installed)
8. Friend sees user's profile preview
9. Continue from step 10 of UC-08

**Postcondition:** Friend request sent via link

---

### UC-10: Create Friend Circle

**Actor:** User  
**Precondition:** User has at least 2 friends  
**Primary Flow:**

1. User navigates to "Friend Circles"
2. User clicks "Create New Circle"
3. User enters circle name (e.g., "School Squad", "Family")
4. User selects friends to add to circle (max 20)
5. System validates friend limit not exceeded
6. User clicks "Create Circle"
7. System creates circle and adds selected friends
8. All circle members receive notification
9. User can now send photos to this specific circle

**Alternative Flow:**

- 5a. User tries to add > 20 friends - show error "Circle limit is 20 members"

**Postcondition:** New friend circle created

---

### UC-11: Remove Friend

**Actor:** User  
**Precondition:** User has existing friendship  
**Primary Flow:**

1. User navigates to friend's profile
2. User clicks "Options" menu
3. User clicks "Remove Friend"
4. System shows confirmation dialog
5. User confirms removal
6. System deletes friendship relationship
7. System removes user from all shared circles
8. Both users can no longer see each other's new photos
9. Existing photos remain visible until expiration

**Postcondition:** Friendship removed

---

## 4. Location & Privacy

### UC-12: Enable Location Sharing

**Actor:** User (Chloe)  
**Precondition:** User is logged in, location currently disabled  
**Primary Flow:**

1. User navigates to Settings → Privacy → Location
2. User sees "Location Sharing: OFF"
3. User clicks toggle to enable
4. System shows explanation: "Your location will be visible to friends you share photos with"
5. User confirms "Enable Location"
6. Browser requests location permission
7. User grants permission at browser level
8. System updates user preference: location_sharing_enabled = true
9. From now on, photos will include location data

**Alternative Flow:**

- 7a. User denies browser permission - show instructions to enable in browser settings

**Postcondition:** Location sharing enabled for future photos

---

### UC-13: View Location History on Map

**Actor:** User (Chloe)  
**Precondition:** User has sent photos with location enabled  
**Primary Flow:**

1. User navigates to "My Location Map"
2. System loads all user's photos with location data
3. System displays Mapbox map with markers for each photo location
4. Markers are clustered when zoomed out
5. User clicks on cluster to zoom in
6. User clicks on individual marker
7. System displays photo thumbnail and timestamp
8. User can click to view full photo
9. User can filter by date range
10. User can export location history (optional)

**Postcondition:** User sees their location history

---

### UC-14: Adjust Location Privacy Level

**Actor:** Privacy-conscious User (Liam)  
**Precondition:** Location sharing is enabled  
**Primary Flow:**

1. User navigates to Settings → Privacy → Location
2. User sees "Location Precision" dropdown
3. User selects from options:
   - "Precise" (exact GPS coordinates)
   - "City Only" (show only city name)
   - "Hidden" (disable location)
4. User selects "City Only"
5. System updates preference
6. Future photos will only show city-level location, not exact coordinates

**Postcondition:** Location precision adjusted

---

## 5. Guardian Mode & Parental Controls

### UC-15: Set Daily Time Limit (Sarah's Use Case)

**Actor:** Parent (Sarah)  
**Precondition:** Guardian-child accounts are linked  
**Primary Flow:**

1. Parent logs into Guardian Dashboard
2. Parent navigates to "Screen Time Controls"
3. Parent sees child's current usage statistics
4. Parent clicks "Set Daily Limit"
5. Parent selects limit: 60 minutes per day
6. Parent clicks "Save"
7. System stores time limit setting
8. Child receives notification: "Your parent set a daily time limit of 60 minutes"
9. Child's app starts tracking usage time
10. When child reaches 50 minutes, system shows warning
11. At 60 minutes, system locks app for the day
12. Child sees message: "Daily limit reached. Try again tomorrow."

**Alternative Flow:**

- 11a. Parent receives notification when child reaches limit

**Postcondition:** Daily time limit enforced

---

### UC-16: Schedule Downtime (David's Use Case)

**Actor:** Parent (David)  
**Precondition:** Guardian-child accounts are linked  
**Primary Flow:**

1. Parent navigates to Guardian Dashboard → Downtime
2. Parent clicks "Add Downtime Schedule"
3. Parent configures:
   - Days: Monday-Friday
   - Start time: 21:00 (9 PM)
   - End time: 07:00 (7 AM)
4. Parent clicks "Save Schedule"
5. System stores downtime rules
6. Child receives notification about new schedule
7. At 21:00, system sends warning: "App will lock in 15 minutes"
8. At 21:15, system locks app
9. Child cannot access app until 07:00 next morning
10. App shows: "Downtime active. Available again at 7:00 AM."

**Alternative Flow:**

- Parent can create multiple schedules (weekday vs weekend)

**Postcondition:** Downtime schedule enforced

---

### UC-17: Keyword Alert Triggered (David's Primary Need)

**Actor:** Parent (David) + Child (Maya)  
**Precondition:** Guardian Mode active, keyword alerts enabled  
**Primary Flow:**

1. Maya receives photo with caption containing flagged keyword (e.g., "hate myself")
2. System's keyword scanner detects sensitive phrase
3. System classifies severity: "HIGH" (mental health concern)
4. System creates alert record in database
5. System immediately sends notification to David:
   - Push notification: "⚠️ Keyword Alert"
   - Email: "Potentially concerning content detected"
6. David opens Guardian Dashboard
7. David navigates to "Keyword Alerts"
8. David sees alert details:
   - Triggered keyword: "hate myself"
   - Context: "[Friend name] sent a photo with caption '...hate myself...'"
   - Timestamp
   - Severity: HIGH
9. David clicks "View Details"
10. System shows surrounding context (NOT full conversation)
11. David clicks "Mark as Reviewed"
12. David can choose to:
    - Talk to Maya directly
    - Ignore alert
    - Contact school counselor
13. System logs David's review action

**Alternative Flow:**

- 2a. Low-severity keyword (e.g., "skip school") - email only, no push

**Postcondition:** Parent alerted to potential concern, can take action

---

### UC-18: View Activity Report

**Actor:** Parent (David/Sarah)  
**Precondition:** Guardian Mode active  
**Primary Flow:**

1. Parent navigates to Guardian Dashboard → Activity Report
2. System displays weekly summary:
   - Total app usage time: 7.5 hours
   - Photos sent: 42
   - Photos received: 56
   - New friends added: 1
   - Keyword alerts: 0
   - Most active time: 7-9 PM
3. Parent clicks "View Detailed Report"
4. System shows daily breakdown with charts
5. Parent clicks "Download Report (PDF)"
6. System generates PDF report
7. Report downloads to parent's device

**Postcondition:** Parent has visibility into child's activity

---

### UC-19: Child Views Guardian Transparency Log

**Actor:** Teen (Maya)  
**Precondition:** Guardian Mode active on account  
**Primary Flow:**

1. Maya navigates to Settings → Guardian Mode
2. Maya sees "Your parent [David] is monitoring your account"
3. Maya clicks "View What They Can See"
4. System displays transparency log:
   - "Your parent can see:"
     - ✓ Usage time statistics
     - ✓ Friend list
     - ✓ Keyword alerts (if triggered)
     - ✗ Your photos
     - ✗ Your messages/captions
     - ✗ Your exact location (only if you share)
5. Maya clicks "Activity Log"
6. System shows what parent has accessed:
   - "Dec 1: Viewed activity report"
   - "Dec 3: Set time limit to 60 min/day"
   - "Dec 5: Reviewed 1 keyword alert"

**Postcondition:** Teen has visibility into parental monitoring

---

## 6. Privacy & Data Management

### UC-20: Automatic Photo Deletion (Liam's Core Need)

**Actor:** System (automated)  
**Precondition:** Photo has been in system for 72 hours  
**Primary Flow:**

1. Background cron job runs every 6 hours
2. System queries database for photos where `expires_at < NOW()`
3. System finds expired photos
4. For each expired photo:
   - System deletes file from Supabase Storage
   - System soft-deletes database record (sets `deleted_at`)
   - System removes photo from all caches (Redis)
5. System logs deletion in audit trail
6. One hour before expiration, system sends notification to sender:
   - "Your photo from 3 days ago will be deleted in 1 hour"

**Alternative Flow:**

- User can manually delete their own photo before expiration

**Postcondition:** Photos automatically deleted after 48-72 hours

---

### UC-21: Download Personal Data (GDPR Compliance)

**Actor:** User (Liam)  
**Precondition:** User is logged in  
**Primary Flow:**

1. User navigates to Settings → Privacy → Data Download
2. User clicks "Request My Data"
3. System shows: "We'll email you a download link within 24 hours"
4. User confirms request
5. System queues background job
6. Job compiles user's data:
   - Profile information
   - Friend list
   - Photo metadata (not actual photos, as they're deleted)
   - Account activity log
7. System generates ZIP file
8. System sends email with secure download link (expires in 7 days)
9. User clicks link and downloads ZIP

**Postcondition:** User receives copy of personal data

---

### UC-22: Delete Account Permanently

**Actor:** User  
**Precondition:** User is logged in  
**Primary Flow:**

1. User navigates to Settings → Account → Delete Account
2. System shows warning: "This will permanently delete all your data"
3. User clicks "I understand, delete my account"
4. System asks user to type username to confirm
5. User types username
6. System validates input
7. User clicks "Delete Forever"
8. System:
   - Deletes all user's photos from storage
   - Deletes all database records
   - Removes user from all friend circles
   - Notifies friends "User has left VibeConnect"
   - Invalidates all tokens
9. User is logged out
10. Account deletion confirmation email sent

**Postcondition:** Account and all data permanently deleted

---

## 7. Payment & Subscription

### UC-23: Subscribe to Guardian Mode Premium

**Actor:** Parent (David)  
**Precondition:** Parent has free account, child account linked  
**Primary Flow:**

1. Parent sees "Upgrade to Premium" prompt in Guardian Dashboard
2. Parent clicks "Upgrade"
3. System displays pricing page:
   - Guardian Mode Premium: $9.99/month
   - Features: Keyword alerts, detailed reports, advanced time limits
4. Parent clicks "Start 14-day Free Trial"
5. System redirects to Stripe checkout
6. Parent enters payment details (credit card)
7. Parent confirms subscription
8. Stripe processes payment authorization (not charged yet)
9. System creates subscription record
10. System enables Premium features immediately
11. Parent receives confirmation email
12. After 14 days, first payment charged automatically

**Alternative Flow:**

- 8a. Payment declined - show error, ask for different payment method

**Postcondition:** Parent subscribed to Premium, trial started

---

### UC-24: Subscribe to Family Add-on

**Actor:** Parent (Sarah)  
**Precondition:** Parent has Guardian Mode Premium  
**Primary Flow:**

1. Sarah sees "Connect with Grandma" upsell in dashboard
2. Sarah clicks "Add Family Add-on (+$4.99/mo)"
3. System explains Family Add-on benefits:
   - View-Only mode for elderly relatives
   - SOS button
   - Enhanced location stability
4. Sarah clicks "Add to Subscription"
5. System updates Stripe subscription
6. New total: $14.98/month ($9.99 + $4.99)
7. Sarah receives updated invoice
8. System unlocks Family Add-on features
9. Sarah can now set up View-Only mode for Grandma Chen

**Postcondition:** Family Add-on active

---

### UC-25: Cancel Subscription

**Actor:** Parent  
**Precondition:** Active paid subscription  
**Primary Flow:**

1. Parent navigates to Settings → Billing
2. Parent clicks "Cancel Subscription"
3. System shows retention offer: "Get 20% off if you stay"
4. Parent clicks "No thanks, cancel anyway"
5. System asks reason for cancellation (dropdown)
6. Parent selects reason and clicks "Confirm Cancellation"
7. System:
   - Cancels Stripe subscription (end of billing period)
   - Premium features remain active until period ends
   - Sends cancellation confirmation email
8. Parent sees: "Premium active until Dec 31. No further charges."

**Alternative Flow:**

- Parent accepts retention offer - subscription continues with discount

**Postcondition:** Subscription canceled, access remains until period end

---

## 8. View-Only Mode (Phase 2 - Flutter)

### UC-26: Setup View-Only Mode for Elderly User

**Actor:** Parent (David) setting up for Grandma Chen  
**Precondition:** Family Add-on active, has tablet/smart frame device  
**Primary Flow:**

1. David logs into VibeConnect on Grandma's tablet
2. David navigates to Settings → View-Only Mode
3. David clicks "Enable View-Only Mode"
4. System shows setup wizard:
   - Step 1: Select which circles to display (e.g., "Family" circle)
   - Step 2: Set slideshow interval (30 seconds)
   - Step 3: Enable SOS button (YES)
   - Step 4: Set emergency contacts
5. David completes wizard
6. System locks app into View-Only mode
7. App displays:
   - Full-screen photo slideshow
   - Minimal UI (just photo and timestamp)
   - Large red SOS button in corner
8. David hands tablet to Grandma Chen
9. Grandma sees photos automatically rotating
10. No interaction required

**Alternative Flow:**

- David can remotely configure View-Only settings from his phone

**Postcondition:** View-Only mode active, Grandma can view photos passively

---

### UC-27: Elderly User Triggers SOS

**Actor:** Grandma Chen  
**Precondition:** View-Only mode active with SOS enabled  
**Primary Flow:**

1. Grandma Chen feels unwell/unsafe
2. Grandma presses large red SOS button
3. System shows confirmation: "Send emergency alert to David?"
4. Grandma presses "YES" (or automatic after 10 seconds)
5. System immediately:
   - Sends push notification to David: "🚨 SOS from Grandma Chen"
   - Sends SMS to David's phone
   - Calls David's phone (if configured)
   - Shares Grandma's current location
6. David receives alert on all channels
7. David can:
   - Call Grandma directly
   - Call emergency services
   - Check Grandma's location on map
8. System logs SOS event

**Postcondition:** Emergency alert sent to family members

---

## 9. Notifications & Engagement

### UC-28: Receive Daily Photo Reminder

**Actor:** User (Maya)  
**Precondition:** User hasn't sent photo today  
**Primary Flow:**

1. System checks at 18:00 daily for users with 0 photos sent today
2. System sends push notification to Maya:
   - "Your friends are waiting for your Vibe! 📸"
3. Maya clicks notification
4. App opens to camera screen
5. Maya captures and sends photo

**Postcondition:** User engaged to maintain daily habit

---

### UC-29: Friend Birthday Reminder

**Actor:** User  
**Precondition:** Friend has birthday in profile, date is today  
**Primary Flow:**

1. System checks birthdays at 09:00 daily
2. System finds friend with birthday today
3. System sends notification:
   - "🎂 It's [Friend name]'s birthday! Send them a special Vibe"
4. User opens app
5. User sends birthday photo with "Happy Birthday" caption

**Postcondition:** User reminded to celebrate friend

---

## 10. Error Handling & Edge Cases

### UC-30: Handle Network Failure During Upload

**Actor:** User (Chloe traveling)  
**Precondition:** User captured photo, poor network connection  
**Primary Flow:**

1. Chloe captures photo and clicks "Send"
2. Upload begins but network connection drops
3. System detects upload failure
4. System shows: "Upload failed. Photo saved to queue."
5. System stores photo in local storage/IndexedDB
6. System shows retry button
7. When network restored, system shows notification:
   - "Network back! Retry sending photo?"
8. Chloe clicks "Retry"
9. Upload completes successfully

**Alternative Flow:**

- System automatically retries in background after 30 seconds

**Postcondition:** Photo eventually uploaded despite network issues

---

### UC-31: Handle Time Limit Override Emergency

**Actor:** Teen (Maya) + Parent (David)  
**Precondition:** Daily time limit reached, app locked  
**Primary Flow:**

1. Maya reaches daily limit, app is locked
2. Maya needs to coordinate emergency pickup with friends
3. Maya clicks "Request Emergency Access"
4. System shows: "Send unlock request to parent?"
5. Maya enters reason: "Need to coordinate ride home from practice"
6. Maya clicks "Send Request"
7. David receives push notification:
   - "Maya requested emergency app access: [reason]"
8. David clicks "Approve for 15 minutes"
9. System unlocks Maya's app temporarily
10. Timer shows "Emergency access: 14:32 remaining"
11. After 15 minutes, app locks again

**Alternative Flow:**

- David denies request - Maya sees "Request denied" message

**Postcondition:** Temporary access granted for genuine emergency

---

## Use Case Summary by Persona

### Maya (Intimacy Seeker) - Primary Use Cases

- UC-04: Capture and Send Photo ⭐ **CRITICAL**
- UC-05: View Photo Feed
- UC-06: View Photo with Location on Map
- UC-08: Invite Friend via QR Code
- UC-10: Create Friend Circle
- UC-19: Child Views Guardian Transparency Log
- UC-28: Receive Daily Photo Reminder

### David (Anxious Guardian) - Primary Use Cases

- UC-02: Guardian Account Setup ⭐ **CRITICAL**
- UC-15: Set Daily Time Limit
- UC-16: Schedule Downtime
- UC-17: Keyword Alert Triggered ⭐ **CRITICAL**
- UC-18: View Activity Report
- UC-23: Subscribe to Guardian Mode Premium ⭐ **CRITICAL**
- UC-26: Setup View-Only Mode for Elderly User

### Liam (Independent Vibe Sharer) - Primary Use Cases

- UC-01: User Registration
- UC-04: Capture and Send Photo
- UC-09: Invite Friend via Link
- UC-14: Adjust Location Privacy Level ⭐ **CRITICAL**
- UC-20: Automatic Photo Deletion ⭐ **CRITICAL**
- UC-21: Download Personal Data
- UC-22: Delete Account Permanently

### Chloe (Long-Distance Keeper) - Primary Use Cases

- UC-04: Capture and Send Photo
- UC-06: View Photo with Location on Map ⭐ **CRITICAL**
- UC-12: Enable Location Sharing
- UC-13: View Location History on Map ⭐ **CRITICAL**
- UC-30: Handle Network Failure During Upload

### Sarah (Hands-Off Enforcer) - Primary Use Cases

- UC-02: Guardian Account Setup
- UC-15: Set Daily Time Limit ⭐ **CRITICAL**
- UC-18: View Activity Report
- UC-24: Subscribe to Family Add-on

### Grandma Chen (Passive Observer) - Primary Use Cases

- UC-26: Setup View-Only Mode ⭐ **CRITICAL**
- UC-27: Elderly User Triggers SOS ⭐ **CRITICAL**

---

## Priority Matrix for Development

| Priority                       | Use Cases                                                            | Reason                                            |
| :----------------------------- | :------------------------------------------------------------------- | :------------------------------------------------ |
| **P0 (MVP - Must Have)**       | UC-01, UC-03, UC-04, UC-05, UC-08, UC-10, UC-20                      | Core photo sharing + authentication + auto-delete |
| **P1 (Beta - Should Have)**    | UC-02, UC-06, UC-12, UC-15, UC-17, UC-18, UC-23                      | Guardian Mode monetization + location features    |
| **P2 (Launch - Nice to Have)** | UC-07, UC-09, UC-11, UC-13, UC-14, UC-16, UC-19, UC-24, UC-25, UC-28 | Enhanced UX + retention features                  |
| **P3 (Phase 2 - Flutter)**     | UC-26, UC-27                                                         | View-Only Mode moat features                      |
| **P4 (Post-Launch)**           | UC-21, UC-22, UC-29, UC-30, UC-31                                    | GDPR compliance + edge cases                      |

---

**Total Use Cases: 31**  
**Critical Path Use Cases: 12**  
**Phase 1 Use Cases: 25**  
**Phase 2 Use Cases: 6**
