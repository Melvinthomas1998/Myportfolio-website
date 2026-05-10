// Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i * 0.05) + 's';
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => io.observe(el));

    // Form
    function handleSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#1A7A4A';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
      }, 3500);
    }

    // Nav active states
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.style.color = '');
          const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (active) active.style.color = 'var(--teal-bright)';
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });
    sections.forEach(s => navObs.observe(s));