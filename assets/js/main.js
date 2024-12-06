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