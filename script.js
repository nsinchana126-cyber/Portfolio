/**
 * SINCHANA N - PORTFOLIO INTERACTIVITY
 * Features:
 * - Active section tracking for Vertical Navigation Rail
 * - Smooth scroll with keyboard accessibility
 * - Interactive Q&A chat simulator in the Chats section
 * - Interactive contact form confirmation
 */

document.addEventListener('DOMContentLoaded', () => {

  // =================================================================
  // 1. ACTIVE SECTION TRACKING IN VERTICAL NAVIGATION RAIL
  // =================================================================
  const navLinks = document.querySelectorAll('.rail-link');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-section') === currentId) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // =================================================================
  // 2. SMOOTH SCROLL FOR RAIL LINKS
  // =================================================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
          targetElement.focus({ preventScroll: true });
        }
      }
    });
  });

  // =================================================================
  // 3. INTERACTIVE CHAT WIDGET (#chats section)
  // =================================================================
  const chatStream = document.getElementById('chat-stream');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const promptChips = document.querySelectorAll('.prompt-chip');

  const botResponses = {
    "open for internships": "Yes! I am actively looking for software engineering internships and junior developer opportunities for 2026/2027. I'd love to contribute to impactful engineering teams!",
    "internship": "I am open and eager for internships! Feel free to reach out directly via email at sinchana@example.com or connect with me on LinkedIn.",
    "technologies": "I love full-stack development! My primary stack includes React, Node.js, Express, PostgreSQL/MySQL, Java, Python, and C++. I'm passionate about clean architectures and data structures.",
    "love": "I am most passionate about building human-centered web tools and writing efficient algorithms. Making software intuitive and fast is my primary goal!",
    "collaborate": "You can connect with me via the contact form right below, send an email to sinchana@example.com, or check out my repositories on GitHub! I'm always up for interesting discussions.",
    "contact": "You can reach me via email at sinchana@example.com or through LinkedIn and GitHub. Feel free to send a message!",
    "default": "Thank you for reaching out! I'm always eager to learn, build, and collaborate on interesting software projects. Feel free to leave a note in the Contact section below!"
  };

  function appendMessage(text, isOutgoing = false) {
    if (!chatStream) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${isOutgoing ? 'msg-outgoing' : 'msg-incoming'}`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;

    const time = document.createElement('span');
    time.className = 'msg-time';
    const now = new Date();
    time.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    chatStream.appendChild(msgDiv);

    // Scroll to latest message
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function handleBotReply(userText) {
    const lower = userText.toLowerCase();
    let reply = botResponses.default;

    if (lower.includes('intern') || lower.includes('available') || lower.includes('hire')) {
      reply = botResponses["open for internships"];
    } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('language') || lower.includes('framework')) {
      reply = botResponses["technologies"];
    } else if (lower.includes('collaborate') || lower.includes('contact') || lower.includes('reach') || lower.includes('touch')) {
      reply = botResponses["collaborate"];
    }

    // Typing simulation delay
    setTimeout(() => {
      appendMessage(reply, false);
    }, 600);
  }

  // Handle Form Submission
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;

      appendMessage(val, true);
      chatInput.value = '';
      handleBotReply(val);
    });
  }

  // Handle Prompt Chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const question = chip.getAttribute('data-question') || chip.textContent.trim();
      appendMessage(question, true);
      handleBotReply(question);
    });
  });

  // =================================================================
  // 4. CONTACT FORM SUBMISSION FEEDBACK
  // =================================================================
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name-input');
      const senderName = nameInput ? nameInput.value : 'friend';

      const submitBtn = contactForm.querySelector('.btn-submit');
      if (submitBtn) {
        submitBtn.textContent = 'Message Sent Successfully! :)';
        submitBtn.style.background = '#10b981';
        submitBtn.disabled = true;

        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = 'Send Message :)';
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 4000);
      }
    });
  }

});
