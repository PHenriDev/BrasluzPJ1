// Dados dos depoimentos com múltiplas imagens por projeto
const testimonials = [
    {
        name: "Ana Silva",
        company: "Tech Solutions LTDA",
        location: "São Paulo, SP",
        rating: "★★★★★",
        images: [
            "/api/placeholder/600/400", // Substitua com o caminho da imagem 1 do projeto
            "/api/placeholder/600/400", // Substitua com o caminho da imagem 2 do projeto
            "/api/placeholder/600/400"  // Substitua com o caminho da imagem 3 do projeto
        ],
        currentImageIndex: 0,
        testimonial: "Fantástico trabalho! A equipe superou todas as nossas expectativas. O projeto foi entregue antes do prazo e com qualidade excepcional. Recomendo fortemente para qualquer empresa que busca excelência em seus projetos."
    },
    {
        name: "Carlos Santos",
        company: "Inovação Digital",
        location: "Rio de Janeiro, RJ",
        rating: "★★★★★",
        images: [
            "img/Wardiere (1).jpg", // Substitua com o caminho da imagem 1 do projeto
            "img/pexels-kindelmedia-9799757.jpg", // Substitua com o caminho da imagem 2 do projeto
            "img/pexels-kindelmedia-9799757.jpg"  // Substitua com o caminho da imagem 3 do projeto
        ],
        currentImageIndex: 0,
        testimonial: "Profissionalismo e dedicação são as palavras que definem esta equipe. Nosso projeto ganhou vida de uma maneira que não imaginávamos ser possível. O suporte pós-entrega também foi excepcional."
    },
    {
        name: "Marina Oliveira",
        company: "Creative Design Co.",
        location: "Curitiba, PR",
        rating: "★★★★★",
        images: [
            "img/pexels-kindelmedia-9799757.jpg", // Substitua com o caminho da imagem 1 do projeto
            "img/pexels-kindelmedia-9799757.jpg", // Substitua com o caminho da imagem 2 do projeto
            "/api/placeholder/600/400"  // Substitua com o caminho da imagem 3 do projeto
        ],
        currentImageIndex: 0,
        testimonial: "A atenção aos detalhes e a capacidade de entender exatamente o que precisávamos foi impressionante. O resultado final superou todas as expectativas. Já estamos planejando novos projetos juntos."
    }
];

let currentTestimonialIndex = 0;

// Função para trocar a imagem do projeto atual
function changeProjectImage(direction) {
    const testimonial = testimonials[currentTestimonialIndex];
    if (direction === 'next') {
        testimonial.currentImageIndex = (testimonial.currentImageIndex + 1) % testimonial.images.length;
    } else {
        testimonial.currentImageIndex = testimonial.currentImageIndex - 1;
        if (testimonial.currentImageIndex < 0) {
            testimonial.currentImageIndex = testimonial.images.length - 1;
        }
    }
    document.getElementById('modalImage').src = testimonial.images[testimonial.currentImageIndex];
}

// Função atualizada para atualizar o conteúdo do modal
function updateModalContent(index) {
    const testimonial = testimonials[index];
    document.getElementById('modalClientName').textContent = testimonial.name;
    document.getElementById('modalCompany').textContent = testimonial.company;
    document.getElementById('modalLocation').textContent = testimonial.location;
    document.getElementById('modalRating').textContent = testimonial.rating;
    document.getElementById('modalTestimonial').textContent = testimonial.testimonial;
    document.getElementById('modalImage').src = testimonial.images[testimonial.currentImageIndex];
    currentTestimonialIndex = index;

    // Atualiza os indicadores de imagem
    updateImageIndicators(testimonial.images.length, testimonial.currentImageIndex);
}

// Função para criar e atualizar os indicadores de imagem
function updateImageIndicators(totalImages, currentIndex) {
    const indicatorsContainer = document.getElementById('imageIndicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.className = `image-indicator ${i === currentIndex ? 'active' : ''}`;
        dot.onclick = () => {
            testimonials[currentTestimonialIndex].currentImageIndex = i;
            updateModalContent(currentTestimonialIndex);
        };
        indicatorsContainer.appendChild(dot);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('testimonialModal');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    const prevImageButton = document.getElementById('prevImage');
    const nextImageButton = document.getElementById('nextImage');

    // Modal open
    modal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const testimonialId = button.getAttribute('data-testimonial-id');
        updateModalContent(parseInt(testimonialId));
    });

    // Navegação entre depoimentos
    prevButton.addEventListener('click', function() {
        let newIndex = currentTestimonialIndex - 1;
        if (newIndex < 0) newIndex = testimonials.length - 1;
        updateModalContent(newIndex);
    });

    nextButton.addEventListener('click', function() {
        let newIndex = currentTestimonialIndex + 1;
        if (newIndex >= testimonials.length) newIndex = 0;
        updateModalContent(newIndex);
    });

    // Navegação entre imagens
    prevImageButton.addEventListener('click', function(e) {
        e.stopPropagation();
        changeProjectImage('prev');
    });

    nextImageButton.addEventListener('click', function(e) {
        e.stopPropagation();
        changeProjectImage('next');
    });

    // Navegação com teclado
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') prevButton.click();
            if (e.key === 'ArrowRight') nextButton.click();
            if (e.key === 'ArrowUp') prevImageButton.click();
            if (e.key === 'ArrowDown') nextImageButton.click();
        }
    });
});