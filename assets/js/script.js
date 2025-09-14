// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // NAVEGAÇÃO MOBILE 
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Previne scroll do body quando menu está aberto
            if (navMobile.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMobile.contains(e.target)) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Fecha menu ao redimensionar tela
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // NAVEGAÇÃO SUAVE 
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Fecha o menu mobile se estiver aberto
                if (navMobile && navMobile.classList.contains('active')) {
                    navMobile.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll suave para a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // CARROSSEL DE HISTÓRIAS 
    const stories = [
        {
            avatar: '👩‍💼',
            name: 'Maria Silva',
            age: '42 anos • Recife - PE',
            rating: '⭐⭐⭐⭐⭐',
            quote: 'Quando perdi meu emprego durante a pandemia, não sabia como alimentar meus três filhos. A ONG Coração Quentinho não apenas me ajudou com cestas básicas, mas também me ofereceu um curso de costura. Hoje tenho minha própria renda e posso sustentar minha família com dignidade.',
            impact: 'Recebeu apoio alimentar por 8 meses e se formou no curso de capacitação profissional'
        },
        {
            avatar: '👨‍🔧',
            name: 'João Santos',
            age: '35 anos • Recife - PE',
            rating: '⭐⭐⭐⭐⭐',
            quote: 'Estava desempregado há meses e com dois filhos pequenos. A ONG me ajudou com alimentos e me indicou para um curso de capacitação. Hoje trabalho como eletricista e consegui reconstruir minha vida.',
            impact: 'Participou do programa de capacitação profissional e conseguiu emprego formal'
        },
        {
            avatar: '👵',
            name: 'Dona Ana',
            age: '68 anos • Recife - PE',
            rating: '⭐⭐⭐⭐⭐',
            quote: 'Moro sozinha e minha aposentadoria mal dá para os remédios. A ONG me trouxe uma cadeira de rodas quando precisei e sempre me ajuda com alimentos. São anjos na minha vida.',
            impact: 'Recebeu equipamento de mobilidade e apoio alimentar contínuo'
        },
        {
            avatar: '👩‍🎓',
            name: 'Beatriz Lima',
            age: '28 anos • Recife - PE',
            rating: '⭐⭐⭐⭐⭐',
            quote: 'Participei das aulas de artesanato com minha filha. Além de aprendermos juntas, consegui uma renda extra vendendo os produtos que faço. A ONG mudou nossa perspectiva de vida.',
            impact: 'Desenvolveu habilidades em artesanato e gerou renda complementar'
        }
    ];
    
    let currentStory = 0;
    const storyCard = document.querySelector('.story-card');
    const prevBtn = document.getElementById('prevStory');
    const nextBtn = document.getElementById('nextStory');
    const indicators = document.querySelectorAll('.indicator');
    
    function updateStory(index) {
        if (!storyCard) return;
        
        const story = stories[index];
        
        // Atualiza o conteúdo da história
        storyCard.innerHTML = `
            <div class="story-profile">
                <div class="story-avatar">${story.avatar}</div>
                <div class="story-info">
                    <h3>${story.name}</h3>
                    <p>${story.age}</p>
                    <div class="story-rating">${story.rating}</div>
                </div>
            </div>
            <blockquote>"${story.quote}"</blockquote>
            <div class="story-impact">
                <h4>Impacto Gerado:</h4>
                <p>${story.impact}</p>
            </div>
        `;
        
        // Atualiza os indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentStory = index;
    }
    
    // Navegação das histórias
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentStory = currentStory > 0 ? currentStory - 1 : stories.length - 1;
            updateStory(currentStory);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentStory = currentStory < stories.length - 1 ? currentStory + 1 : 0;
            updateStory(currentStory);
        });
    }
    
    // Clique nos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateStory(index);
        });
    });
    
    // Rotação automática das histórias
    setInterval(function() {
        if (nextBtn) {
            currentStory = currentStory < stories.length - 1 ? currentStory + 1 : 0;
            updateStory(currentStory);
        }
    }, 8000); // Muda a cada 8 segundos
    
    // FORMULÁRIO DE CONTATO 
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Verifica se todos os campos obrigatórios estão preenchidos
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulação de envio
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>📤</span> Enviando...';
            submitBtn.disabled = true;
            
            // Simula tempo de envio
            setTimeout(function() {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // NEWSLETTER
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Por favor, insira seu email.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Cadastrando...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Email cadastrado com sucesso! Você receberá nossas novidades.');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ANIMAÇÕES DE SCROLL 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Adiciona animação aos elementos
    const animatedElements = document.querySelectorAll('.stat-card, .value-card, .project-card, .help-card, .impact-stat');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // BOTÕES DE AÇÃO 
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            // Ações específicas baseadas no texto do botão
            if (buttonText.includes('Doar') || buttonText.includes('Doação')) {
                e.preventDefault();
                alert('Redirecionando para a página de doação...\n\nPIX: (81) 98733-1912\nBanco: Banco do Brasil');
            } else if (buttonText.includes('Voluntário')) {
                e.preventDefault();
                alert('Obrigado pelo interesse em ser voluntário!\n\nEntre em contato conosco:\n📞 (81) 98733-1912\n📧 coracaoquentinhorecife@gmail.com');
            } else if (buttonText.includes('WhatsApp')) {
                e.preventDefault();
                const whatsappNumber = '5581987331912';
                const message = encodeURIComponent('Olá! Gostaria de saber mais sobre a ONG Coração Quentinho.');
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            } else if (buttonText.includes('Parceria')) {
                e.preventDefault();
                alert('Interessado em fazer parceria?\n\nEntre em contato conosco:\n📧 coracaoquentinhorecife@gmail.com\n📞 (81) 98733-1912');
            } else if (buttonText.includes('Solicitar Ajuda') || buttonText.includes('Contato Urgente')) {
                e.preventDefault();
                alert('Precisa de ajuda?\n\nEntre em contato conosco:\n📞 (81) 98733-1912 (WhatsApp 24h)\n📧 coracaoquentinhorecife@gmail.com');
            }
        });
    });
    
    // LINKS SOCIAIS 
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('instagram')) {
                window.open('https://www.instagram.com/ongcoracaoquentinhorecife/', '_blank');
            } else if (this.classList.contains('facebook')) {
                alert('Curta nossa página no Facebook: ONG Coração Quentinho\n\nEm breve, você será redirecionado para nossa página oficial.');
            } else if (this.classList.contains('whatsapp')) {
                const whatsappNumber = '5581987331912';
                const message = encodeURIComponent('Olá! Vim através do site da ONG Coração Quentinho.');
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            }
        });
    });
    
    // EFEITOS DE HOVER APRIMORADOS
    const cards = document.querySelectorAll('.stat-card, .value-card, .project-card, .help-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // CONTADOR ANIMADO PARA ESTATÍSTICAS 
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (target >= 100 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 100 ? '+' : '');
            }
        }
        
        updateCounter();
    }
    
    // Observa os elementos de estatística para animar quando visíveis
    const statNumbers = document.querySelectorAll('.stat-number, .impact-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (number > 0) {
                    animateCounter(entry.target, number);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // BOTÃO VOLTAR AO TOPO 
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--vermelho);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(208, 52, 44, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Mostra/esconde o botão quando rola a página
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // CARREGAMENTO LAZY DE IMAGENS
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // EFEITO RIPPLE PARA BOTÕES 
    document.addEventListener('click', function(e) {
        if (e.target.matches('button, .btn-primary, .btn-secondary')) {
            const button = e.target;
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            // Adiciona animação CSS se não existir
            if (!document.querySelector('#ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // SMOOTH SCROLL PARA NAVEGAÇÃO
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // INICIALIZAÇÃO FINAL
    console.log('ONG Coração Quentinho - Site carregado com sucesso!');
});

