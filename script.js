// 🔊 Audio setup
const clickSound = new Audio("assets/beep.mp3");
clickSound.volume = 0.2;

// 💾 Track open/close state
let currentPortfolio = null;
let boxIsOpen = false;

// 📁 Project metadata (static)
const projects = [
  { id: 'calculatto', title: 'CalcuLatto', type: 'mobile' },
  { id: 'billant', title: 'Billant', type: 'mobile' },
  { id: 'syncertica-enterprise', title: 'Syncertica Enterprise', type: 'website' },
  { id: 'syncertica-vitalis-lite', title: 'Syncertica Vitalis Lite', type: 'website' },
  { id: 'separator', title: 'Other project', type: 'separator' },
  { id: 'jdih', title: 'JDIH', type: 'website' }
];

// 🎯 Active category filters
let activeCategories = ['mobile', 'website'];

// 🔘 Toggle category filters
function toggleCategory(type) {
  const index = activeCategories.indexOf(type);
  const toggleBtn = document.getElementById(type === 'mobile' ? 'mobileToggle' : 'webToggle');

  if (index !== -1) {
    activeCategories.splice(index, 1);
    toggleBtn.classList.remove('active');
  } else {
    activeCategories.push(type);
    toggleBtn.classList.add('active');
  }

  updateProjectList();
}

// 🔁 Update portfolio list based on filters
function updateProjectList() {
  const list = document.querySelector('.portfolio-list');
  list.innerHTML = '';

  projects.forEach(p => {
    if (p.type === 'separator') {
      // Add separator - always visible, non-clickable
      const li = document.createElement('li');
      li.textContent = p.title;
      li.className = 'separator';
      list.appendChild(li);
    } else if (activeCategories.includes(p.type)) {
      // Add regular project item
      const li = document.createElement('li');
      li.textContent = p.title;
      li.onclick = () => showPortfolio(p.id, li);
      list.appendChild(li);
    }
  });
}

// 📦 Load and show portfolio content
function showPortfolio(name, element) {
  const leftPanel = document.getElementById('leftPanel');
  const rightPanel = document.getElementById('rightPanel');
  const content = document.getElementById('portfolioContent');

  const isSame = currentPortfolio === name;

  // Clear selection from all list items
  document.querySelectorAll('.portfolio-list li').forEach(li => li.classList.remove('active'));

  if (isSame) {
    // 🔒 Close the box
    leftPanel.classList.remove('shifted');
    rightPanel.classList.remove('visible');
    currentPortfolio = null;
    boxIsOpen = false;
    return;
  }

  // 🔊 Only beep when box is opening from closed state
  if (!boxIsOpen) {
    clickSound.currentTime = 0;
    clickSound.play();
    boxIsOpen = true;
  }

  // ✅ Show box and load content
  currentPortfolio = name;
  element.classList.add('active');
  leftPanel.classList.add('shifted');
  rightPanel.classList.add('visible');

  // 🎨 Get tech stack icon URL from various CDNs
  function getTechIconUrl(tech) {
    const iconUrls = {
      'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'React (Next.js)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'JSX': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'GraphQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
      'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
      'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'Chart.js': 'https://www.chartjs.org/img/chartjs-logo.svg',
      'Android': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
      'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'Express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'Vue.js (Nuxt.js)': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
      'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      'Tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'Tailwind CSS': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
      'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'GitHub': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'Github Repository': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'GitHub Actions': 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'Sass': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
      'Webpack': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
      'Babel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg',
      'Jest': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
      'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
      'Expo': 'https://static.expo.dev/static/brand/square-228x228.png',
      'Terraform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg',
      'Google Maps API': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      'Google Play Billing': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      'Google AI Studio (Gemini)': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
      'Atlas Search': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'ExchangeRate API': 'https://www.softwareworld.co/assets/software/logo/exchangerate-api.jpg',
      'Apache Commons Math': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
      'AsyncStorage': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'Geolocation API': 'https://www.svgrepo.com/show/13671/placeholder.svg',
      'Microservices': 'https://www.svgrepo.com/show/374111/services.svg'
    };
    
    return iconUrls[tech] || 'https://www.svgrepo.com/show/361346/code.svg';
  }

  fetch(`contents/${name}/data.json`)
    .then(res => res.json())
    .then(data => {
      const screenshotClass = data.type === "mobile" ? "mobile" : "website";

      content.innerHTML = `
        <h2>${data.title}</h2>
        <div class="screenshot-container ${screenshotClass}">
          <img src="contents/${name}/screenshot.webp?v=${Date.now()}" alt="Screenshot" />
        </div>
        <div class="logo-container">
          <img src="contents/${name}/logo.webp?v=${Date.now()}" alt="${data.title} Logo" class="project-logo" />
        </div>
        <div class="meta"><strong>Release date:</strong> ${data.releaseDate}</div>
        <div class="description">${data.description}</div>

        <div class="media">
          <div>
            <div class="tech-stack">
              <strong>Tech stacks:</strong><br>
              ${data.techStack.map(t => `<span><img src="${getTechIconUrl(t)}" alt="${t}" class="tech-icon">${t}</span>`).join('')}
            </div>
            <a class="visit-btn" href="${data.buttonLink}" target="_blank">${data.buttonText}</a>
          </div>
        </div>
      `;
    })
    .catch(err => {
      content.innerHTML = `<p style="color: red;">Failed to load project data.</p>`;
      console.error(err);
    });
}

// 🟢 Load portfolio list on first page load
updateProjectList();
