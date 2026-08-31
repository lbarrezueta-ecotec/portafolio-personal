/**
 * script.js - Interactividad para el Portafolio Personal
 * Actividad Integradora 2
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Portafolio interactivo cargado correctamente.");

    // --- 1. VARIABLES Y ELEMENTOS DEL DOM ---
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const closeBtn = document.querySelector('.modal-close');
    const contactForm = document.querySelector('.contact-form');
    const navLinks = document.querySelectorAll('.nav-links a');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // --- 2. FUNCIONES ---

    /**
     * Función para abrir el modal de detalles del proyecto
     * @param {string} img - Ruta de la imagen
     * @param {string} title - Título del proyecto
     * @param {string} desc - Descripción del proyecto
     */
    function openProjectModal(img, title, desc) {
        modal.style.display = 'flex';
        modalImg.src = img;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        document.body.style.overflow = 'hidden';
    }

    /**
     * Función para cerrar el modal
     */
    function closeProjectModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    /**
     * Función para validar el formulario de contacto
     * @param {Object} formData - Datos del formulario
     * @returns {boolean} - true si es válido, false si no
     */
    function validateForm(formData) {
        // Estructura condicional (Requisito 4)
        if (formData.name.trim() === "" || formData.email.trim() === "" || formData.message.trim() === "") {
            return false;
        }

        // Validación básica de formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            return false;
        }

        return true;
    }

    /**
     * Filtrar proyectos por categoría
     * @param {string} category - Categoría a filtrar (todos, en-vivo, detalles, proximamente)
     */
    function filterProjects(category) {
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;

            if (category === 'todos' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /**
     * Guardar el filtro seleccionado en localStorage
     * @param {string} category - Categoría seleccionada
     */
    function saveFilter(category) {
        localStorage.setItem('filtroProyectos', category);
    }

    /**
     * Recuperar el filtro guardado en localStorage
     * @returns {string} - Categoría guardada o 'todos' por defecto
     */
    function getSavedFilter() {
        const saved = localStorage.getItem('filtroProyectos');
        return saved || 'todos';
    }

    /**
     * Aplicar el filtro guardado al cargar la página
     * (Recupera el dato de localStorage y lo usa para un cambio visible)
     */
    function restoreFilter() {
        const savedFilter = getSavedFilter();

        // Marcar el botón correspondiente como activo
        filterButtons.forEach(btn => {
            const isActive = btn.dataset.filter === savedFilter;
            btn.classList.toggle('active', isActive);
        });

        // Aplicar el filtro guardado a los proyectos
        filterProjects(savedFilter);
    }

    // --- 3. EVENTOS (addEventListener) ---

    // Restaurar el filtro guardado en localStorage al cargar (Requisito 7)
    restoreFilter();

    // Filtro de proyectos (DOM manipulation + eventos click)
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar estado activo de botones
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrar proyectos y guardar la selección en localStorage
            const filter = btn.dataset.filter;
            filterProjects(filter);
            saveFilter(filter);
        });
    });

    // Efecto de Aparición al Hacer Scroll (Requisito 2 y 3)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // Eventos para los botones de abrir modal (Requisito 2)
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const img = btn.getAttribute('data-image');
            const title = btn.getAttribute('data-title');
            const desc = btn.getAttribute('data-desc');
            openProjectModal(img, title, desc);
        });
    });

    // Evento para cerrar modal
    closeBtn.addEventListener('click', closeProjectModal);

    // Evento para cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Evento Submit del Formulario (Requisito 2 y 5)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const errorElement = document.getElementById('form-error');

            // Recopilación de datos en variables
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('msg').value
            };

            // Uso de la función de validación y condicional
            if (validateForm(formData)) {
                if (errorElement) errorElement.style.display = 'none';
                alert("¡Gracias " + formData.name + "! Tu mensaje ha sido validado y enviado correctamente.");
                contactForm.reset();
            } else {
                if (errorElement) {
                    errorElement.textContent = "Por favor, revisa que todos los campos estén llenos y el correo sea válido.";
                    errorElement.style.display = 'block';
                }
            }
        });
    }

    // Evento Mouseover para interactividad en el menú (Requisito 2 y 3)
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = 'var(--accent)';
            link.style.fontWeight = 'bold';
        });

        link.addEventListener('mouseout', () => {
            link.style.color = 'var(--text-muted)';
            link.style.fontWeight = '500';
        });
    });
});