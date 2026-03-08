# AVAJAZ - Gamified Verification App: User Guide

Welcome to the AVAJAZ platform! This application allows you to verify environmental impact tasks and earn AVAX test tokens and XP by participating in a gamified verification process.

## 🚀 Getting Started
1. The app runs locally. Open your preferred web browser.
2. Navigate to `http://localhost:8080/guide/index.html`.
3. You will land on the **Daily Tasks** dashboard.

---

## 📸 The 3-Step Verification Process

The core gameplay loop centers around verifying images submitted by farmers.

### Step 1: Select a Task & Annotate
1. Check the categories across the top: **Nursery**, **Agroforestry**, **Bee Keeping**, and **Ecotourism**.
2. Click on any image card to open it in the Verification Panel.
3. You will see the **Image Annotation UI**. Use the floating toolbar at the bottom of the image:
   - **🔲 Box Tool**: Click and drag to draw a bounding box around the key subject (e.g., a seedling, a beehive).
   - **📍 Point Tool**: Click to drop a pin on points of interest.
   - **🏷️ Label Tool**: Click anywhere to type a text label (e.g., "healthy canopy").
   - **🗑️ Clear**: Erase your current annotations if you make a mistake.
4. Once you have marked the important features, click **"Proceed to AI Check →"**.

### Step 2: AI Check Verification
1. The simulated AI engine will scan your image and annotations.
2. It looks for relevant keywords and bounding boxes that match the current category.
   *(Tip: For a Nursery task, use labels like "seedling" or "tree" to score higher!)*
3. You will receive a **Confidence Score**:
   - **85% - 100%**: High confidence. Yields bonus XP.
   - **60% - 84%**: Partial match. 
   - **Below 60%**: Low confidence. May require manual admin review.
4. Click **"Proceed to Submit →"**.

### Step 3: View Rewards & Submit
1. Review the calculated rewards. You will see the base AVAX + XP, amplified by your current **Combo Multiplier**.
2. You can type optional observations in the text field.
3. Click the bright orange **"Submit & Earn"** button.
4. Watch the confetti burst and check your top HUD to see your XP and AVAX balances increase!

---

## 🎮 Gamification Mechanics (How to maximize rewards)

To make verification fun, the app features several built-in gameplay mechanics:

* **⚡ The Combo Multiplier (Speed Bonus)**
  * If you verify a task and then quickly verify another one within **10 seconds**, you build a combo snippet.
  * Combos multiply your earned AVAX and XP: 1× (Default) ➔ 2× ➔ 3× ➔ 4× ➔ **5× (Max)**.
  * Work fast but accurately to maximize your daily earnings!

* **📈 XP & Leveling Up**
  * Every successful verification gives you XP. 
  * High AI accuracy scores grant a **Precision Bonus** of up to +25 XP.
  * As you accumulate XP, the bar at the top fills up. Reach the threshold to see a spectacular Level-Up animation!

* **🔥 Daily Streaks**
  * The flame icon in the top header represents your streak.
  * Verify at least one task a day to keep the flame lit and increase your streak number.

* **🎯 Daily Challenges**
  * Check the golden strip below the header. It lists your daily goals (e.g., "Verify 5 Tasks", "Achieve 3x Combo").
  * The progress bars fill up as you play. Completing them grants massive XP payouts.

* **🏆 Badges & Achievements**
  * Certain actions trigger hidden achievements. Try diversifying your verifications across all categories or getting a perfect 98% AI score to unlock rare badges that pop up on the bottom right of your screen.
