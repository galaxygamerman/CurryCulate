'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  let data = null;

  try {
    const response = await fetch('http://localhost:3000/trending-topics');
    
    if (!response.ok) {
      throw new Error('Failed to fetch trending topics');
    }
    
    data = await response.json();
    console.log('Received data:', data); // Log received data for debugging
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    // Provide dummy data in case of fetch failure
    data = {
      "Java": 25,
      "Python": 30,
      "JavaScript": 50,
      "Ruby": 15,
      "C++": 10,
      "Rust": 13,
    };
  }

  renderTrendingChart(data);
});

const renderTrendingChart = (data) => {
  const ctx = document.getElementById('trendingChart').getContext('2d');
  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      label: 'Trending Job Topics',
      data: Object.values(data),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const trendingChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

const preloader = document.querySelector("[data-preloader]");
const circle = document.querySelector("[data-circle]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  circle.style.animation = "none";
  document.body.classList.add("loaded");
});

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

const header = document.querySelector("[data-header]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", headerActive);
