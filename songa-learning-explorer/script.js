const resources = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    category: 'JavaScript',
    description: 'Learn the core syntax, variables, functions, and logic behind JavaScript programming.',
    completed: false,
  },
  {
    id: 2,
    title: 'CSS Layout Masterclass',
    category: 'CSS',
    description: 'Build responsive layouts with flexbox, grid, spacing, and modern design patterns.',
    completed: true,
  },
  {
    id: 3,
    title: 'Git & GitHub Essentials',
    category: 'Git & GitHub',
    description: 'Understand version control, commits, branching, and how to collaborate with GitHub.',
    completed: false,
  },
  {
    id: 4,
    title: 'Career Readiness Roadmap',
    category: 'Career Skills',
    description: 'Practice building professional habits, portfolios, and job-search strategies for tech careers.',
    completed: false,
  },
  {
    id: 5,
    title: 'JavaScript DOM Guide',
    category: 'JavaScript',
    description: 'Explore how JavaScript interacts with HTML elements and updates the page dynamically.',
    completed: true,
  },
  {
    id: 6,
    title: 'Advanced CSS Animations',
    category: 'CSS',
    description: 'Create smooth transitions, interactive hover states, and polished UI effects for websites.',
    completed: false,
  },
  {
    id: 7,
    title: 'GitHub Collaboration Workflow',
    category: 'Git & GitHub',
    description: 'Learn how pull requests, issues, and reviews help teams work together efficiently.',
    completed: false,
  },
  {
    id: 8,
    title: 'Professional Communication Skills',
    category: 'Career Skills',
    description: 'Improve writing, presentations, teamwork, and communication for growth in the tech industry.',
    completed: false,
  },
];

const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const resourceList = document.getElementById('resource-list');
const resourceCount = document.getElementById('resource-count');
const completedCount = document.getElementById('completed-count');
const noResultsMessage = document.getElementById('no-results');

function getFilteredResources() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  return resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchText) ||
      resource.description.toLowerCase().includes(searchText);

    const matchesCategory =
      selectedCategory === 'All categories' || resource.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
}

function updateProgressStats() {
  const filteredResources = getFilteredResources();
  const completedTotal = resources.filter((resource) => resource.completed).length;

  resourceCount.textContent = filteredResources.length;
  completedCount.textContent = completedTotal;
}

function renderResources() {
  const filteredResources = getFilteredResources();
  updateProgressStats();

  resourceList.innerHTML = '';

  if (filteredResources.length === 0) {
    noResultsMessage.hidden = false;
    return;
  }

  noResultsMessage.hidden = true;

  filteredResources.forEach((resource) => {
    const card = document.createElement('article');
    card.className = 'resource-card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'resource-card-header';

    const title = document.createElement('h2');
    title.className = 'resource-title';
    title.textContent = resource.title;

    const categoryTag = document.createElement('span');
    categoryTag.className = 'resource-tag';
    categoryTag.textContent = resource.category;

    const description = document.createElement('p');
    description.className = 'resource-description';
    description.textContent = resource.description;

    const status = document.createElement('span');
    status.className = resource.completed ? 'resource-status complete' : 'resource-status incomplete';
    status.textContent = resource.completed ? 'Completed' : 'Incomplete';

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = resource.completed ? 'toggle-button incomplete' : 'toggle-button';
    toggleButton.dataset.id = resource.id;
    toggleButton.textContent = resource.completed ? 'Mark as Incomplete' : 'Mark as Completed';

    cardHeader.appendChild(title);
    cardHeader.appendChild(categoryTag);
    card.appendChild(cardHeader);
    card.appendChild(description);
    card.appendChild(status);
    card.appendChild(toggleButton);

    resourceList.appendChild(card);
  });
}

searchInput.addEventListener('input', renderResources);
categoryFilter.addEventListener('change', renderResources);

resourceList.addEventListener('click', (event) => {
  const clickedButton = event.target.closest('button');

  if (!clickedButton) {
    return;
  }

  const resourceId = Number(clickedButton.dataset.id);
  const selectedResource = resources.find((resource) => resource.id === resourceId);

  if (!selectedResource) {
    return;
  }

  selectedResource.completed = !selectedResource.completed;
  renderResources();
});

renderResources();
