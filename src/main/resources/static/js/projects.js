document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const stack = card.querySelector('.stack-badge').textContent.toLowerCase();
            const technologies = Array.from(card.querySelectorAll('.tech-badge'))
                .map(tech => tech.textContent.toLowerCase());
            const link = card.querySelector('.project-link').textContent.toLowerCase();

            const isVisible = 
                title.includes(searchLower) ||
                description.includes(searchLower) ||
                stack.includes(searchLower) ||
                technologies.some(tech => tech.includes(searchLower)) ||
                link.includes(searchLower);

            if (isVisible) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterProjects(e.target.value);
        }, 300);
    });
}); 