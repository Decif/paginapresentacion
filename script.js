/**
 * Portfolio Express - Erick Decif
 * Interactive logic and smooth user experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.getElementById('contactForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const currentYearSpan = document.getElementById('currentYear');
  
  // Project modal elements
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const projectButtons = document.querySelectorAll('.btn-project-details');

  // Update current year dynamically
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------------------
     1. Sticky Header Shadow on Scroll
     ------------------------------------------------------------------------- */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* -------------------------------------------------------------------------
     2. Mobile Navigation Menu Toggle
     ------------------------------------------------------------------------- */
  const toggleMobileMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* -------------------------------------------------------------------------
     3. Active Navigation Link on Scroll (ScrollSpy)
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy, { passive: true });
  scrollSpy();

  /* -------------------------------------------------------------------------
     4. Project Details Modal Data & Interactions
     ------------------------------------------------------------------------- */
  const projectsData = {
    velometrics: {
      title: 'VeloMetrics AI',
      badge: 'Ciclismo + Inteligencia Artificial',
      description: 'Una solución concebida para ciclistas que buscan traducir miles de puntos de datos de telemetría (frecuencia cardíaca, vatios, cadencia y altimetría) en planes tácticos precisos con IA.',
      features: [
        'Análisis predictivo de fatiga y recomendaciones en tiempo real',
        'Modelos de Machine Learning entrenados para estimar FTP y umbral aeróbico',
        'Integración con sensores Bluetooth/ANT+ y exportación a formatos estándar (.fit, .gpx)',
        'Dashboard responsivo diseñado con foco en legibilidad bajo el sol'
      ],
      tech: ['Python', 'FastAPI', 'SciPy', 'JavaScript Moderno', 'WebSockets']
    },
    autoflow: {
      title: 'AutoFlow Cloud Engine',
      badge: 'Cloud & Automatizaciones',
      description: 'Plataforma empresarial de automatización que conecta webhooks, colas de mensajería y microservicios para eliminar tareas manuales repetitivas en equipos de ingeniería.',
      features: [
        'Motor de ejecución visual de flujos con lógica condicional avanzada',
        'Procesamiento asíncrono con tolerancia a fallos y reintentos inteligentes',
        'Notificaciones automatizadas vía Slack, Email y webhooks seguros',
        'Métricas de tiempo ahorrado y tasa de éxito por pipeline'
      ],
      tech: ['Node.js', 'TypeScript', 'Docker', 'Redis', 'PostgreSQL']
    },
    pulseapp: {
      title: 'PulseApp Studio',
      badge: 'Desarrollo Web Fullstack',
      description: 'Aplicación web progresiva orientada a la gestión ágil de proyectos y seguimiento de hábitos, destacando por su velocidad, fluidez y diseño de componentes limpios.',
      features: [
        'Soporte completo offline con sincronización en segundo plano',
        'Arquitectura modular basada en componentes accesibles y ligeros',
        'Animaciones fluidas a 60 FPS con rendimiento optimizado para móviles',
        'API RESTful documentada con OpenAPI y autenticación JWT segura'
      ],
      tech: ['JavaScript ES6+', 'CSS3 Vanilla', 'HTML5 Semántico', 'PWA', 'REST API']
    }
  };

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-content-inner">
        <span class="modal-badge">${data.badge}</span>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        
        <h4 style="font-size: 1rem; margin-bottom: 0.6rem; color: var(--text-main);">Aspectos destacados:</h4>
        <ul class="modal-feature-list">
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <div style="margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tech.map(t => `<span class="tech-badge" style="background: var(--bg-main);">${t}</span>`).join('')}
        </div>

        <div style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
          <a href="#contacto" class="btn btn-primary" onclick="document.getElementById('projectModal').classList.remove('active');">
            Consultar sobre este proyecto
          </a>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* -------------------------------------------------------------------------
     5. Contact Form Validation & Toast Notification
     ------------------------------------------------------------------------- */
  const showToast = (message) => {
    toastMessage.textContent = message;
    toastNotification.classList.add('visible');
    setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 4500);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (contactForm) {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      if (isValid) {
        const userName = nameInput.value.trim();
        // Feedback
        showToast(`¡Gracias ${userName}! Tu mensaje ha sido enviado con éxito.`);
        contactForm.reset();
      }
    });

    // Real-time input cleanup
    [nameInput, emailInput, messageInput].forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const associatedError = input.parentElement.querySelector('.error-msg');
        if (associatedError) {
          associatedError.classList.remove('visible');
        }
      });
    });
  }
});
