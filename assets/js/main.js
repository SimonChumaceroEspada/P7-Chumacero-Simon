window.addEventListener('load', () => {
    const listItems = document.querySelectorAll('.nav-i');
    let isScrolling = false;

    listItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            if (isScrolling) return;

            const link = item.querySelector('a');
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                isScrolling = true;
                smoothScroll(targetSection, () => {
                    isScrolling = false;
                });
            }
        });
    });
});

function smoothScroll(target, callback) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const progressPercentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * progressPercentage);
        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            callback();
        }
    }

    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.list-nav');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Opcional: Animar el ícono hamburguesa
        navToggle.classList.toggle('active');
    });

    // Funcionalidad del switch de idioma
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'es';
    
    // Establecer idioma inicial
    setLanguage(currentLang);
    
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            setLanguage(lang);
            localStorage.setItem('language', lang);
        });
    });
});

function setLanguage(lang) {
    // Actualizar textos del menú
    document.querySelector('a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('a[href="#about-me"]').textContent = translations[lang].aboutMe;
    document.querySelector('a[href="#my-skills"]').textContent = translations[lang].skills;
    document.querySelector('a[href="#experience"]').textContent = translations[lang].experience;
    document.querySelector('a[href="#portafolio"]').textContent = translations[lang].portfolio;
    document.querySelector('a[href="#contact"]').textContent = translations[lang].contact;

    // Actualizar textos principales
    document.querySelector('.h2-presentation').textContent = translations[lang].hello;
    document.querySelector('.h1-web-title').textContent = translations[lang].webTitle;
    document.querySelector('.p-mi').textContent = translations[lang].aboutMeText;
    
    // Actualizar títulos de secciones
    document.querySelector('.h2-mi').textContent = translations[lang].aboutMe;
    document.querySelector('.h3-skills').textContent = translations[lang].skills;
    document.querySelector('.h3-experiencia').textContent = translations[lang].experience;
    document.querySelector('.h3-portafolio').textContent = translations[lang].portfolio;
    document.querySelector('.h3-contacto').textContent = translations[lang].contact;

    // Actualizar habilidades
    const skills = document.querySelectorAll('.icon-descriptio');
    skills[0].textContent = translations[lang].responsiveDesign;
    skills[1].textContent = translations[lang].cssSkills;
    skills[2].textContent = translations[lang].communication;
    skills[3].textContent = translations[lang].webDev;

    // Actualizar experiencia
    const expTitles = document.querySelectorAll('.job-title');
    const expCompanies = document.querySelectorAll('.company');
    const expDates = document.querySelectorAll('.date');

    // Experiencia 1
    expTitles[0].textContent = translations[lang].exp1.title;
    expCompanies[0].textContent = translations[lang].exp1.company;
    expDates[0].textContent = translations[lang].exp1.period;

    // Experiencia 2
    expTitles[1].textContent = translations[lang].exp2.title;
    expCompanies[1].textContent = translations[lang].exp2.company;
    expDates[1].textContent = translations[lang].exp2.period;

    // Experiencia 3
    expTitles[2].textContent = translations[lang].exp3.title;
    expCompanies[2].textContent = translations[lang].exp3.company;
    expDates[2].textContent = translations[lang].exp3.period;

    // Actualizar contacto
    document.querySelectorAll('.contact-label')[0].textContent = translations[lang].phone;
    document.querySelectorAll('.contact-label')[1].textContent = translations[lang].email;

    // Actualizar proyectos
    const projectTitles = document.querySelectorAll('.project-title');
    const projectDescriptions = document.querySelectorAll('.project-description');

    // Proyecto 1 - Tourism Guide
    projectTitles[0].textContent = translations[lang].projects.tourism.title;
    projectDescriptions[0].textContent = translations[lang].projects.tourism.description;

    // Proyecto 2 - API
    projectTitles[1].textContent = translations[lang].projects.api.title;
    projectDescriptions[1].textContent = translations[lang].projects.api.description;

    // Proyecto 3 - Rick & Morty
    projectTitles[2].textContent = translations[lang].projects.rickAndMorty.title;
    projectDescriptions[2].textContent = translations[lang].projects.rickAndMorty.description;
}