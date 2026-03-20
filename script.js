/* ============================================================
   EYITAYO PORTFOLIO — script.js
   Author: Olaseinde Timileyin "Eyitayo"
   ============================================================ */

// ---- INIT LUCIDE ICONS ----
lucide.createIcons();

// ---- NAV: SCROLL BEHAVIOUR ----
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
  highlightActiveNavLink();
});

// ---- NAV: ACTIVE LINK HIGHLIGHT ----
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 130) {
      current = section.id;
    }
  });

  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === "#" + current;
    a.style.color = isActive ? "var(--cream)" : "";
    a.style.fontWeight = isActive ? "500" : "";
  });
}

// ---- NAV: HAMBURGER MENU ----
let menuOpen = false;

function toggleMenu() {
  menuOpen = !menuOpen;
  const links = document.getElementById("navLinks");
  const hb1 = document.getElementById("hb1");
  const hb2 = document.getElementById("hb2");
  const hb3 = document.getElementById("hb3");

  links.classList.toggle("open", menuOpen);
  hb1.style.transform = menuOpen ? "translateY(6px) rotate(45deg)" : "";
  hb2.style.opacity = menuOpen ? "0" : "1";
  hb3.style.transform = menuOpen ? "translateY(-6px) rotate(-45deg)" : "";
}

function closeMenu() {
  menuOpen = false;
  const links = document.getElementById("navLinks");
  const hb1 = document.getElementById("hb1");
  const hb2 = document.getElementById("hb2");
  const hb3 = document.getElementById("hb3");

  links.classList.remove("open");
  hb1.style.transform = "";
  hb2.style.opacity = "1";
  hb3.style.transform = "";
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navEl = document.getElementById("nav");
  if (menuOpen && !navEl.contains(e.target)) {
    closeMenu();
  }
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  },
);

revealEls.forEach((el) => revealObserver.observe(el));

// ---- WHATSAPP BUTTON ----
/**
 * Opens a WhatsApp chat with the portfolio owner.
 * Phone: +234 811 537 4962
 * A prefilled message is included for the visitor's convenience.
 */
function openWhatsApp() {
  const phone = "2348115374962"; // international format, no + or spaces
  const message = encodeURIComponent(
    "Hello Eyitayo! I came across your portfolio and I'd love to discuss a project with you.",
  );
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

// ---- CV DOWNLOAD ----
/**
 * Triggers a download of the CV PDF file.
 * Make sure "olaseinde_Timileyin_Resume.pdf" is in the same folder as index.html.
 */
function downloadCV() {
  const link = document.createElement("a");
  link.href = "olaseinde_Timileyin_Resume.pdf";
  link.download = "Olaseinde_Timileyin_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ---- CONTACT FORM VALIDATION & SUBMISSION ----

/**
 * Validates a single field.
 * Returns true if valid, false + shows error if not.
 */
function validateField(id, errId, message) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  const val = el ? el.value.trim() : "";

  if (!val) {
    if (err) err.textContent = message;
    if (el) el.style.borderColor = "#ff6b6b";
    return false;
  }

  if (err) err.textContent = "";
  if (el) el.style.borderColor = "";
  return true;
}

/**
 * Validates the email format.
 */
function validateEmail() {
  const el = document.getElementById("femail");
  const err = document.getElementById("femailErr");
  const val = el ? el.value.trim() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!val) {
    if (err) err.textContent = "Email address is required.";
    if (el) el.style.borderColor = "#ff6b6b";
    return false;
  }

  if (!emailRegex.test(val)) {
    if (err) err.textContent = "Please enter a valid email address.";
    if (el) el.style.borderColor = "#ff6b6b";
    return false;
  }

  if (err) err.textContent = "";
  if (el) el.style.borderColor = "";
  return true;
}

/**
 * Validates select field.
 */
function validateSelect(id, errId, message) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  const val = el ? el.value : "";

  if (!val) {
    if (err) err.textContent = message;
    if (el) el.style.borderColor = "#ff6b6b";
    return false;
  }

  if (err) err.textContent = "";
  if (el) el.style.borderColor = "";
  return true;
}

/**
 * Main form submission handler.
 * Validates all fields, shows feedback, and composes a WhatsApp message
 * so the sender's info lands directly in your chat.
 */
function submitForm() {
  // Clear previous errors
  ["fnameErr", "femailErr", "fsubjectErr", "fmessageErr"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });

  // Validate
  const nameOk = validateField("fname", "fnameErr", "Your name is required.");
  const emailOk = validateEmail();
  const subjectOk = validateSelect(
    "fsubject",
    "fsubjectErr",
    "Please select a subject.",
  );
  const msgOk = validateField(
    "fmessage",
    "fmessageErr",
    "Please write a message.",
  );

  if (!nameOk || !emailOk || !subjectOk || !msgOk) return;

  // Collect values
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const phone = document.getElementById("fphone").value.trim();
  const subject = document.getElementById("fsubject").value;
  const message = document.getElementById("fmessage").value.trim();

  // Loading state
  const btn = document.querySelector(".btn-submit");
  const submitText = document.getElementById("submitText");
  btn.classList.add("loading");
  submitText.textContent = "Sending...";

  // Simulate a short delay (replace with actual backend/EmailJS call if needed)
  setTimeout(() => {
    btn.classList.remove("loading");
    submitText.textContent = "Send Message";

    // Show success message
    const successEl = document.getElementById("formSuccess");
    if (successEl) {
      successEl.style.display = "flex";
      lucide.createIcons(); // re-render icons inside success block
    }

    // Reset form fields
    ["fname", "femail", "fphone", "fmessage"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    const selectEl = document.getElementById("fsubject");
    if (selectEl) selectEl.value = "";

    // Compose and open WhatsApp message with the submitted info
    const waPhone = "2348115374962";
    const waMessage = encodeURIComponent(
      `📬 New Portfolio Contact\n` +
        `────────────────────\n` +
        `👤 Name: ${name}\n` +
        `📧 Email: ${email}\n` +
        (phone ? `📞 Phone: ${phone}\n` : "") +
        `📌 Subject: ${subject}\n` +
        `────────────────────\n` +
        `💬 Message:\n${message}`,
    );
    const waUrl = `https://wa.me/${waPhone}?text=${waMessage}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Hide success message after 6 seconds
    setTimeout(() => {
      if (successEl) successEl.style.display = "none";
    }, 6000);
  }, 1200);
}

// ---- REAL-TIME INLINE VALIDATION ----
// Clear error styling as soon as user starts correcting a field
["fname", "femail", "fphone", "fsubject", "fmessage"].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("input", () => {
    el.style.borderColor = "";
    const errMap = {
      fname: "fnameErr",
      femail: "femailErr",
      fsubject: "fsubjectErr",
      fmessage: "fmessageErr",
    };
    if (errMap[id]) {
      const err = document.getElementById(errMap[id]);
      if (err) err.textContent = "";
    }
  });
});
