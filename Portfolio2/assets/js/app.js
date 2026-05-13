        document.addEventListener("DOMContentLoaded", () => {
        
            function reveal() {
                var reveals = document.querySelectorAll(".reveal");

                for (var i = 0; i < reveals.length; i++) {
                    var windowHeight = window.innerHeight;
                    var elementTop = reveals[i].getBoundingClientRect().top;
                    var elementVisible = 100;

                    if (elementTop < windowHeight - elementVisible) {
                        reveals[i].classList.add("active");
                    }
                }
            }
            

            window.addEventListener("scroll", reveal);

            reveal();


            const navLinks = document.querySelectorAll('.nav-link');
            const menuToggle = document.getElementById('navbarNav');
            navLinks.forEach((l) => {
                l.addEventListener('click', () => {
                    if(menuToggle.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(menuToggle);
                        bsCollapse.hide();
                    }
                })
            })

            // Initialize Graphic Designs Slider
            if(typeof $.fn.slick !== 'undefined') {
                $('.graphic-slider').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    prevArrow: $('.slick-prev-custom'),
                    nextArrow: $('.slick-next-custom'),
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }

            // Scroll to Top Button
            const scrollTopBtn = document.getElementById("scrollTopBtn");
            if (scrollTopBtn) {
                window.addEventListener("scroll", () => {
                    if (window.scrollY > 300) {
                        scrollTopBtn.classList.add("show");
                    } else {
                        scrollTopBtn.classList.remove("show");
                    }
                });

                scrollTopBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                });
            }

            // Contact Form AJAX Submission
            const contactForm = document.getElementById('contactForm');
            const formToast = document.getElementById('formToast');
            const toastMessage = document.getElementById('toastMessage');
            
            if (contactForm && formToast) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const btn = contactForm.querySelector('button[type="submit"]');
                    const originalBtnText = btn.innerHTML;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
                    btn.disabled = true;

                    const formData = new FormData(contactForm);

                    fetch('https://formsubmit.co/ajax/itathagatasanyal01@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json'
                        },
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success || data.success === "true") {
                            // Show success toast
                            toastMessage.innerHTML = '<i class="fas fa-check-circle text-glow-cyan me-2"></i> Message sent successfully!';
                            formToast.style.borderLeft = '4px solid var(--neon-cyan)';
                            contactForm.reset();
                        } else {
                            // Show error toast
                            toastMessage.innerHTML = '<i class="fas fa-times-circle text-danger me-2"></i> Failed to send message. Try again.';
                            formToast.style.borderLeft = '4px solid red';
                        }
                        const toast = new bootstrap.Toast(formToast);
                        toast.show();
                    })
                    .catch(error => {
                        toastMessage.innerHTML = '<i class="fas fa-times-circle text-danger me-2"></i> Failed to send message. Please try again later.';
                        formToast.style.borderLeft = '4px solid red';
                        const toast = new bootstrap.Toast(formToast);
                        toast.show();
                        console.error(error);
                    })
                    .finally(() => {
                        btn.innerHTML = originalBtnText;
                        btn.disabled = false;
                    });
                });
            }
        });