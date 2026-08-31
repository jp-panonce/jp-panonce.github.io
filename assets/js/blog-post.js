document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop();
  const thoughtsSection = document.querySelector('.thoughts-section');
  if (thoughtsSection) {
    thoughtsSection.id = 'thoughts';
    fetch('../blog-home.html')
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load blog-home.html');
        return response.text();
      })
      .then(function (html) {
        const sourceDocument = new DOMParser().parseFromString(html, 'text/html');
        const sourceTimeline = sourceDocument.querySelector('#thoughts .thoughts-timeline');
        if (!sourceTimeline) throw new Error('Could not find the Thoughts timeline');

        const timeline = Array.from(sourceTimeline.querySelectorAll('.timeline-year-group')).map(function (group) {
          const year = group.querySelector('.timeline-year').textContent.trim();
          const posts = Array.from(group.querySelectorAll('.timeline-post-link')).map(function (link) {
            const href = new URL(link.getAttribute('href'), new URL('../blog-home.html', window.location.href));
            return [href.pathname.split('/').pop(), link.textContent.trim()];
          });
          return [year, posts];
        });

        thoughtsSection.innerHTML = `
          <div class="container section-title" data-aos="fade-up">
            <h3>other thoughts</h3>
          </div>
          <div class="container" data-aos="fade-up" data-aos-delay="80">
            <div class="thoughts-timeline">
              ${timeline.map(function ([year, posts]) {
                return `
                  <div class="timeline-year-group">
                    <div class="timeline-year"><span>${year}</span></div>
                    <div class="timeline-posts">
                      ${posts.map(function ([href, label]) {
                        const destination = href === currentPage ? '#' : href;
                        return `<a href="${destination}" class="timeline-post-link">${label}</a>`;
                      }).join('')}
                    </div>
                  </div>`;
              }).join('')}
              <br>
            </div>
          </div>`;

        if (window.AOS) window.AOS.refreshHard();
      })
      .catch(function (error) {
        console.error('Could not render other thoughts:', error);
      });
  }

  const footer = document.querySelector('.site-cloud-footer');
  if (footer) {
    footer.id = 'contact';
    footer.innerHTML = `
      <div class="container" data-aos="fade-up" data-aos-delay="80">
        <div class="site-cloud-footer-grid">
          <div class="footer-contact-panel" data-aos="fade-right" data-aos-delay="120">
            <a href="../index.html" class="logo d-flex align-items-end">
              <img src="../assets/Test JP Logo (2).png" alt="JP. Panonce logo" style="width: 8%;">
              <b class="sitename" style="font-size: large; color: black;"> PANONCE</b>
            </a>
            <br>
            <p>If you have questions, ideas, or collaboration plans, feel free to reach out.</p>
            <ul class="footer-contact-list">
              <li><i class="bi bi-geo-alt"></i><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Cebu+City,+6000+Cebu/">Cebu City, Cebu, Philippines</a></li>
              <li><i class="bi bi-telephone"></i><a href="tel:+639453404489">+63 945 340 4489</a></li>
              <li><i class="bi bi-envelope"></i><a href="mailto:jpasensi13@gmail.com">jpasensi13@gmail.com</a></li>
            </ul>
            <a class="footer-email-btn" href="mailto:jpasensi13@gmail.com?subject=Hello%20JP"><i class="bi bi-send"></i> Send me an email</a>
          </div>
          <div class="footer-browse-panel" data-aos="fade-left" data-aos-delay="180">
            <div class="footer-browse-layout">
              <div class="browse-links">
                <h4 class="footer-subsection-title">EXPLORE THE SITE</h4>
                <ul>
                  <li><a href="../blog-home.html">Blog</a></li>
                  <li><a href="../portfolio-details.html">Creations</a></li>
                  <li><a href="../tools.html">Tools</a></li>
                  <li><a href="../about-me.html">About Me</a></li>
                </ul>
              </div>
              <div class="browse-links">
                <h4 class="footer-subsection-title">GENERAL</h4>
                <ul>
                  <li><a href="../about-me.html">About Me</a></li>
                  <li><a href="#">About the site</a></li>
                  <li><a href="../contact.html">Contact</a></li>
                </ul>
              </div>
              <div class="find-me-links">
                <h6 class="footer-subsection-title">You can also find me here:</h6>
                <div class="site-social-strip" data-aos="fade-up" data-aos-delay="260">
                  <a href="https://github.com/jp-panonce" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i class="bi bi-github" aria-hidden="true"></i></a>
                  <a href="https://www.linkedin.com/in/john-paul-panonce/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="bi bi-linkedin" aria-hidden="true"></i></a>
                  <a href="https://public.tableau.com/app/profile/john.paul.panonce" target="_blank" rel="noopener noreferrer" aria-label="Tableau Public"><img src="../assets/img/tableau-icon-svg.svg" alt="Tableau" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                  <a href="https://www.ultimate-guitar.com/u/jpasensi" target="_blank" rel="noopener noreferrer" aria-label="Ultimate Guitar"><img src="../assets/img/Ultimate_Guitar_Icon.svg.webp" alt="Ultimate Guitar" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                  <a href="https://www.khanacademy.org/profile/kaid_817055080752672436718813/projects" target="_blank" rel="noopener noreferrer" aria-label="Khan Academy"><img src="../assets/img/khan-academy.svg" alt="Khan Academy" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                  <a href="https://share.streamlit.io/user/jp-panonce" target="_blank" rel="noopener noreferrer" aria-label="Streamlit"><img src="../assets/img/streamlit-icon.webp" alt="Streamlit" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                  <a href="https://www.freecodecamp.org/JohnPaulPanonce" target="_blank" rel="noopener noreferrer" aria-label="freeCodeCamp"><img src="../assets/img/freecodecamp-icon.svg" alt="freecodecamp.org" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                  <a href="https://leetcode.com/u/jp-panonce/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode"><img src="../assets/img/leetcode-icon.svg" alt="Leet Code" style="width: 24px; height: 24px; object-fit: contain; display: block;"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="site-footer-meta" data-aos="fade-up" data-aos-delay="220">
          <p>&copy; 2018-present John Paul Panonce. All Rights Reserved.</p>
          <div class="site-policy-links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Code of Conduct</a>
          </div>
        </div>
      </div>`;
  }

  if (window.AOS) {
    window.AOS.refreshHard();
  }

  const sections = Array.from(document.querySelectorAll('.blogpost-section-anchor'));
  const tocLinks = Array.from(document.querySelectorAll('#blogpost-nav .blogpost-toc-link'));

  if (!sections.length || !tocLinks.length) return;

  function updateActiveHeading() {
    const scrollPosition = window.scrollY + 180;
    let currentId = sections[0].id;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPosition) currentId = section.id;
    });

    tocLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  updateActiveHeading();
});