document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');
  const darkToggleBtn = document.getElementById('darkToggle');
  const darkModeCheckbox = document.getElementById('darkModeToggle');
  const settingsBtn = document.getElementById('openSettingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const closeSettingsBtn = document.getElementById('closeSettings');
  const overlay = document.getElementById('overlayBlur');
  const saveNameBtn = document.getElementById('saveName');
  const nameInput = document.getElementById('changeName');
  const profileText = document.querySelector('.profile-container h1');
  const changePicInput = document.getElementById('changePic');
  const profileImage = document.querySelector('.profile-img');
  const logoutBtn = document.getElementById('logoutBtn');
  const profileBtn = document.querySelector('a[href="#profile"]');
  const profilePanel = document.getElementById('profilePanel');
  const closeProfileBtn = document.getElementById('closeProfile');
  const profileOverlay = document.getElementById('profileOverlay');
  const profileImgLarge = profilePanel.querySelector('.profile-img-large');
  const profileNameHeading = profilePanel.querySelector('h3');

  // Hamburger menu toggle with accessibility
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('show');

    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
    menu.setAttribute('aria-hidden', !expanded);
  });

  // Dark mode toggle by button and checkbox, synced
  function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    darkToggleBtn.textContent = enabled ? '☀️' : '🌙';
    darkModeCheckbox.checked = enabled;
  }

  darkToggleBtn.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });

  darkModeCheckbox.addEventListener('change', e => {
    setDarkMode(e.target.checked);
  });

  // Open Settings Panel
  settingsBtn?.addEventListener('click', e => {
    e.preventDefault();
    settingsPanel.classList.add('open');
    overlay.classList.add('active');
  });

  // Close Settings Panel
  function closeSettings() {
    settingsPanel.classList.remove('open');
    overlay.classList.remove('active');
  }
  closeSettingsBtn?.addEventListener('click', closeSettings);
  overlay?.addEventListener('click', () => {
    // Close both panels if open
    closeSettings();
    closeProfilePanel();
  });

  // Change Name
  saveNameBtn?.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName) {
      profileText.innerHTML = `I’m ${newName}, <span class="typewrite" data-words='["Developer.", "Designer.", "Creator."]'></span>`;
      profileNameHeading.textContent = newName;
      nameInput.value = '';
      alert('Name updated!');
    } else {
      alert('Please enter a valid name.');
    }
  });

  // Change Profile Picture
  changePicInput?.addEventListener('change', function () {
    const file = this.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => {
        profileImage.src = e.target.result;
        profileImgLarge.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Logout
  logoutBtn?.addEventListener('click', () => {
    alert('You have been logged out.');
    window.location.reload();
  });

  // Profile panel open/close
  profileBtn?.addEventListener('click', e => {
    e.preventDefault();
    profilePanel.classList.add('open');
    profileOverlay.classList.add('active');
  });

  function closeProfilePanel() {
    profilePanel.classList.remove('open');
    profileOverlay.classList.remove('active');
  }

  closeProfileBtn?.addEventListener('click', closeProfilePanel);
  profileOverlay?.addEventListener('click', closeProfilePanel);

  // Form validation (contact form)
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\+251\d{9}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    const nameRegex = /^[A-Z][a-zA-Z]*$/;

    if (!nameRegex.test(firstName)) {
      errorDiv.textContent = 'First name must start with a capital letter and contain only letters.';
      return;
    }
    if (!nameRegex.test(lastName)) {
      errorDiv.textContent = 'Last name must start with a capital letter and contain only letters.';
      return;
    }
    if (!emailRegex.test(email)) {
      errorDiv.textContent = 'Please enter a valid email address.';
      return;
    }
    if (!phoneRegex.test(phone)) {
      errorDiv.textContent = 'Phone number must start with +251 and contain exactly 9 digits after.';
      return;
    }
    if (!passwordRegex.test(password)) {
      errorDiv.textContent = 'Password must be at least 6 characters and include uppercase, lowercase, number, and special character.';
      return;
    }

    alert('Form submitted successfully!');
    form.reset();
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const settingsPanel = document.getElementById('settingsPanel');
  const profilePanel = document.getElementById('profilePanel');
  const overlayBlur = document.getElementById('overlayBlur');
  const profileOverlay = document.getElementById('profileOverlay');

  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const settingsCloseBtn = document.getElementById('closeSettings');

  const profileLink = [...document.querySelectorAll('.menu a')].find(a => a.getAttribute('href') === '#profile');
  const profileCloseBtn = document.getElementById('closeProfile');

  // Open Settings panel
  openSettingsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    settingsPanel.classList.add('active');
    overlayBlur.classList.add('active');
  });

  // Close Settings panel
  settingsCloseBtn.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
    overlayBlur.classList.remove('active');
  });

  // Open Profile panel
  profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    profilePanel.classList.add('active');
    profileOverlay.classList.add('active');
  });

  // Close Profile panel
  profileCloseBtn.addEventListener('click', () => {
    profilePanel.classList.remove('active');
    profileOverlay.classList.remove('active');
  });

  // Clicking outside (overlay) closes the panels
  overlayBlur.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
    overlayBlur.classList.remove('active');
  });

  profileOverlay.addEventListener('click', () => {
    profilePanel.classList.remove('active');
    profileOverlay.classList.remove('active');
  });

  // Optional: Save Name button logic example
  document.getElementById('saveNameBtn').addEventListener('click', () => {
    const newName = document.getElementById('displayName').value.trim();
    if (newName) {
      // Change the name in the header
      const headerName = document.querySelector('.profile-container h1');
      headerName.innerHTML = `I’m ${newName}, <span class="typewrite" data-words='["Developer.", "Designer.", "Creator."]'></span>`;
      alert('Name updated!');
    }
  });

  // You can add logic for profile pic upload, logout, etc., similarly
});
document.addEventListener("DOMContentLoaded", function () {
  const saveNameBtn = document.getElementById("saveNameBtn");
  const displayNameInput = document.getElementById("displayName");
  const profileImages = document.querySelectorAll(".profile-img, .profile-img-large");

  const uploadInput = document.getElementById("profilePicUpload");
  const uploadBtn = document.getElementById("uploadPicBtn");

  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const closeSettingsBtn = document.getElementById("closeSettings");
  const settingsPanel = document.getElementById("settingsPanel");
  const overlayBlur = document.getElementById("overlayBlur");

  const openProfileBtn = document.getElementById("openProfileBtn");
  const closeProfileBtn = document.getElementById("closeProfile");
  const profilePanel = document.getElementById("profilePanel");
  const profileOverlay = document.getElementById("profileOverlay");

  // Save name
  saveNameBtn.addEventListener("click", () => {
    const name = displayNameInput.value.trim();
    if (name !== "") {
      document.querySelector("h1").innerHTML = `I’m ${name}, <span class="typewrite" data-words='["Developer.", "Designer.", "Creator."]'></span>`;
      document.querySelector("#profilePanel h3").textContent = name;
      saveNameBtn.textContent = "Saved ✅";
      setTimeout(() => {
        saveNameBtn.textContent = "Save Name";
      }, 2000);
    }
  });

  // Upload image
  uploadBtn.addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImages.forEach(img => {
          img.src = e.target.result;
        });
        uploadBtn.textContent = "Uploaded ✅";
        setTimeout(() => {
          uploadBtn.textContent = "Upload";
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  });

  // Slide panels toggle
  openSettingsBtn.addEventListener("click", () => {
    settingsPanel.style.right = "0";
    overlayBlur.style.display = "block";
  });

  closeSettingsBtn.addEventListener("click", () => {
    settingsPanel.style.right = "-400px";
    overlayBlur.style.display = "none";
  });

  openProfileBtn.addEventListener("click", () => {
    profilePanel.style.right = "0";
    profileOverlay.style.display = "block";
  });

  closeProfileBtn.addEventListener("click", () => {
    profilePanel.style.right = "-400px";
    profileOverlay.style.display = "none";
  });
});

