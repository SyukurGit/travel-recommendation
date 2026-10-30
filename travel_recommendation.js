/**
 * Travel Recommendation Web Application
 * Handles data fetching, keyword-based search, local time calculation, and DOM manipulation.
 */

let travelData = null;

// Fetch travel data from JSON API
function fetchTravelData() {
  fetch('travel_recommendation_api.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      travelData = data;
      console.log('Travel data loaded successfully:', travelData);
    })
    .catch((error) => {
      console.error('Error fetching travel data:', error);
    });
}

// Compute formatted local time for a specific IANA time zone
function getLocalTime(timeZone) {
  if (!timeZone) return '';
  try {
    const options = {
      timeZone: timeZone,
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Date().toLocaleTimeString('en-US', options);
  } catch (e) {
    console.warn(`Timezone calculation error for ${timeZone}:`, e);
    return '';
  }
}

// Search handler based on Coursera criteria (beach, temple, country)
function searchRecommendations() {
  const searchInput = document.getElementById('search') || document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results') || document.getElementById('resultsContainer');

  if (!searchInput || !resultsContainer) return;

  const query = searchInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = `
      <div class="no-results-msg">
        <p>Please enter a keyword such as <strong>"beach"</strong>, <strong>"temple"</strong>, or <strong>"country"</strong> (e.g., Australia, Japan, Brazil).</p>
      </div>
    `;
    return;
  }

  if (!travelData) {
    resultsContainer.innerHTML = `
      <div class="no-results-msg">
        <p>Loading destination data, please try again in a moment...</p>
      </div>
    `;
    return;
  }

  let matches = [];

  // Keyword check: beach / beaches
  if (query === 'beach' || query === 'beaches') {
    matches = travelData.beaches || [];
  }
  // Keyword check: temple / temples
  else if (query === 'temple' || query === 'temples') {
    matches = travelData.temples || [];
  }
  // Keyword check: country / countries
  else if (query === 'country' || query === 'countries') {
    // Return cities from all countries (at least 2)
    matches = [];
    (travelData.countries || []).forEach((c) => {
      if (c.cities) {
        matches.push(...c.cities);
      }
    });
  }
  // Keyword check: specific country name or city name
  else {
    const matchedCountry = (travelData.countries || []).find(
      (c) => c.name.toLowerCase() === query || query.includes(c.name.toLowerCase())
    );

    if (matchedCountry && matchedCountry.cities) {
      matches = matchedCountry.cities;
    } else {
      // Check city matches
      (travelData.countries || []).forEach((c) => {
        (c.cities || []).forEach((city) => {
          if (city.name.toLowerCase().includes(query)) {
            matches.push(city);
          }
        });
      });

      // Check temple matches
      (travelData.temples || []).forEach((t) => {
        if (t.name.toLowerCase().includes(query)) {
          matches.push(t);
        }
      });

      // Check beach matches
      (travelData.beaches || []).forEach((b) => {
        if (b.name.toLowerCase().includes(query)) {
          matches.push(b);
        }
      });
    }
  }

  // Render search results
  if (matches.length === 0) {
    resultsContainer.innerHTML = `
      <div class="no-results-msg">
        <p>No destinations found for <strong>"${escapeHtml(query)}"</strong>.<br>Try searching for <strong>beach</strong>, <strong>temple</strong>, or a country like <strong>Australia</strong>, <strong>Japan</strong>, or <strong>Brazil</strong>.</p>
      </div>
    `;
    return;
  }

  matches.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'rec-card';

    const localTime = item.timeZone ? getLocalTime(item.timeZone) : '';
    const timeBadge = localTime ? `<div class="time-badge">🕒 ${localTime}</div>` : '';

    card.innerHTML = `
      <div class="rec-card-image">
        <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" loading="lazy">
        ${timeBadge}
      </div>
      <div class="rec-card-body">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <button class="btn-visit" onclick="handleVisit('${escapeHtml(item.name)}')">Visit</button>
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}

// Clear search input and results container
function clearResults() {
  const searchInput = document.getElementById('search') || document.getElementById('searchInput');
  const resultsContainer = document.getElementById('results') || document.getElementById('resultsContainer');

  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }

  if (resultsContainer) {
    resultsContainer.innerHTML = '';
  }
}

// Visit button handler
function handleVisit(destinationName) {
  alert(`Thank you for choosing ${destinationName}! Our travel booking concierge will connect with you shortly.`);
}

// Book Now button handler
function handleBookNow() {
  const searchInput = document.getElementById('search') || document.getElementById('searchInput');
  if (searchInput) {
    searchInput.focus();
    searchInput.value = 'beach';
    searchRecommendations();
  }
}

// Utility function to escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
  fetchTravelData();

  const searchBtn = document.getElementById('btnSearch') || document.querySelector('button[type="search"]');
  const clearBtn = document.getElementById('btnClear') || document.querySelector('button[type="clear"]');
  const searchInput = document.getElementById('search') || document.getElementById('searchInput');

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchRecommendations();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearResults();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchRecommendations();
      }
    });
  }
});
