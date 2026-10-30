# TravelBloom - Travel Recommendation Web Application

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue.svg)](https://syukurgit.github.io/travel-recommendation/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, responsive, and interactive Travel Recommendation Web Application built with HTML5, CSS3 (Glassmorphism & Flexbox/Grid), and Vanilla JavaScript (Fetch API & DOM Manipulation).

Developed as the **Final Project** for the **IBM / Coursera Front-End Web Development** curriculum.

---

## 🧭 Live Demo
- **Live Website:** [https://syukurgit.github.io/travel-recommendation/](https://syukurgit.github.io/travel-recommendation/)
- **Repository:** [https://github.com/SyukurGit/travel-recommendation](https://github.com/SyukurGit/travel-recommendation)

---

## 🌟 Key Features

1. **Home Page (`index.html`)**:
   - Modern fixed glassmorphic navigation bar with logo, brand name, and page links.
   - Hero banner with headline, motivational copy, and an interactive "Book Now" call-to-action button.
   - Dedicated search bar with **Search** and **Clear** buttons.
   - Vertical social media bar linking to major platforms.

2. **Smart Search Functionality (`travel_recommendation.js`)**:
   - Asynchronous data fetching via **Fetch API** from `travel_recommendation_api.json`.
   - Case-insensitive search keyword normalization (`toLowerCase()`, `trim()`).
   - Keyword matching for:
     - **"beach"** or **"beaches"** &rarr; displays at least 2 tropical beach recommendations.
     - **"temple"** or **"temples"** &rarr; displays iconic ancient temples.
     - **"country"** or **"countries"** &rarr; displays premier city destinations.
     - Specific country or city names (e.g., **Australia**, **Japan**, **Brazil**, **Sydney**, **Tokyo**, **Rio de Janeiro**).
   - Dynamic recommendation cards featuring destination photos, titles, curated descriptions, and interactive "Visit" buttons.
   - **Local Destination Time Display**: Real-time local time calculated dynamically using `Intl.DateTimeFormat` / `toLocaleTimeString()` based on the destination's time zone.

3. **Reset / Clear Mechanism**:
   - One-click **Clear** button resets input field and clears rendered destination cards.

4. **About Us Page (`about_us.html`)**:
   - Overview of company background, values, and travel curation mission.
   - Team section showcasing leadership and developers with photos and designated roles.

5. **Contact Us Page (`contact_us.html`)**:
   - Company contact coordinates (address, email, phone, operational hours).
   - Fully interactive contact form (Name, Email, Message) with validation and submission feedback.

---

## 📁 Repository Structure

```text
.
├── index.html                     # Home page & search interface
├── about_us.html                  # About Us & Team showcase
├── contact_us.html                # Contact Us & feedback form
├── travel_recommendation.css      # Responsive styles & glassmorphic UI
├── travel_recommendation.js       # Fetch API, search engine, time zone calculator
├── travel_recommendation_api.json # Structured mock destination data
├── images/                        # High-resolution destination & asset images
│   ├── sydney.jpg
│   ├── melbourne.jpg
│   ├── tokyo.jpg
│   ├── kyoto.jpg
│   ├── rio.jpg
│   ├── paulo.jpg
│   ├── angkor.jpg
│   ├── taj.jpg
│   ├── bora.jpg
│   ├── cop.jpg
│   ├── hero-bg.jpg
│   ├── team1.jpg, team2.jpg, team3.jpg
│   ├── logo.svg
│   └── twitter.svg, facebook.svg, instagram.svg, youtube.svg
└── README.md                      # Project documentation
```

---

## 🛠 Local Setup & Running

1. Clone the repository:
   ```bash
   git clone https://github.com/SyukurGit/travel-recommendation.git
   cd travel-recommendation
   ```

2. Open using any static server (or directly in browser):
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js / npx
   npx serve .
   ```

3. Navigate to `http://localhost:8000` in your web browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
