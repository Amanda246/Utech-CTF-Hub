// UTech CTF Hub - App Utilities

// Determine path prefix based on current page depth
function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/training/') || path.includes('/admin/')) return '../';
  return '';
}

function renderNav() {
  const session = getSession();
  const prefix = getPathPrefix();
  let userLinks = '';
  if (session) {
    const user = getCurrentUser();
    const pts = user ? user.totalPoints : 0;
    userLinks = `
      <li class="nav-item">
        <span class="nav-link text-success"><i class="bi bi-star-fill"></i> ${pts} pts</span>
      </li>
      <li class="nav-item">
        <span class="nav-link text-info"><i class="bi bi-person"></i> ${session.username}</span>
      </li>
      ${session.role === 'admin' ? `<li class="nav-item"><a class="nav-link text-warning" href="${prefix}admin/dashboard.html"><i class="bi bi-gear"></i> Admin</a></li>` : ''}
      <li class="nav-item">
        <a class="nav-link" href="#" onclick="handleLogout()"><i class="bi bi-box-arrow-right"></i> Logout</a>
      </li>`;
  } else {
    userLinks = `
      <li class="nav-item"><a class="nav-link" href="${prefix}login.html"><i class="bi bi-box-arrow-in-right"></i> Login</a></li>
      <li class="nav-item"><a class="nav-link" href="${prefix}register.html"><i class="bi bi-person-plus"></i> Register</a></li>`;
  }

  const quizJeopardyLinks = session ? `
    <li class="nav-item"><a class="nav-link" href="${prefix}quizzes.html"><i class="bi bi-patch-question"></i> Quizzes</a></li>
    <li class="nav-item"><a class="nav-link" href="${prefix}jeopardy.html"><i class="bi bi-grid-3x3"></i> Jeopardy</a></li>` : '';

  document.getElementById('nav-placeholder').innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-success">
      <div class="container">
        <a class="navbar-brand text-success fw-bold" href="${prefix}index.html">
          <i class="bi bi-terminal-fill"></i> UTech CTF Hub
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" href="${prefix}learn.html"><i class="bi bi-book"></i> Learn</a></li>
            <li class="nav-item"><a class="nav-link" href="${prefix}challenges.html"><i class="bi bi-flag"></i> Challenges</a></li>
            <li class="nav-item"><a class="nav-link" href="${prefix}scoreboard.html"><i class="bi bi-trophy"></i> Scoreboard</a></li>
            ${quizJeopardyLinks}
          </ul>
          <ul class="navbar-nav">${userLinks}</ul>
        </div>
      </div>
    </nav>`;
}

function handleLogout() {
  logoutUser();
  const prefix = getPathPrefix();
  window.location.href = prefix + 'index.html';
}

function showAlert(message, type = 'success', containerId = 'alert-container') {
  const container = document.getElementById(containerId);
  if (!container) return;
  const div = document.createElement('div');
  div.className = `alert alert-${type} alert-dismissible fade show`;
  div.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
  container.appendChild(div);
  setTimeout(() => { if (div.parentNode) div.parentNode.removeChild(div); }, 5000);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function difficultyBadge(difficulty) {
  const map = { Beginner: 'success', Intermediate: 'warning text-dark', Advanced: 'danger' };
  return `<span class="badge bg-${map[difficulty] || 'secondary'}">${difficulty}</span>`;
}

function initPage() {
  seedAdmin(); // Ensure admin user exists
  renderNav();
  // Re-render nav after seedAdmin completes (async)
  setTimeout(renderNav, 100);
}
