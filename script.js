// JavaScript for the portfolio website

// Initialize AOS animation library
document.addEventListener("DOMContentLoaded", () => {
    // Declare AOS if it's not already available globally
    if (typeof AOS === "undefined") {
        console.warn("AOS is not defined. Make sure AOS library is included.")
    } else {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: false,
            mirror: false,
            offset: 100,
        })
    }

    // Mobile Menu Toggle
    const menuButton = document.querySelector(".menu-button")
    const mobileMenu = document.querySelector(".mobile-menu")

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden")
        })
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-menu .nav-link")
    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden")
        })
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href")
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                })
            }
        })
    })

    // Form submission
    const contactForm = document.querySelector(".contact-form")
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault()

            const nameInput = document.getElementById("name")
            const emailInput = document.getElementById("email")
            const messageInput = document.getElementById("message")

            // Simple validation
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert("لطفاً تمام فیلدها را پر کنید.")
                return
            }

            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message

            // Create a success message element
            const successMessage = document.createElement("div")
            successMessage.className = "bg-green-100 text-green-700 p-4 rounded-lg mt-4 flex items-center"
            successMessage.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.</span>
      `

            // Add the message to the form
            contactForm.appendChild(successMessage)

            // Reset form
            contactForm.reset()
        })
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll(".skill-level")

    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }

    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach((bar) => {
            if (isInViewport(bar)) {
                const width = bar.getAttribute("style").split("width:")[1].trim()
                bar.style.width = "0"
                setTimeout(() => {
                    bar.style.width = width
                }, 100)
            }
        })
    }

    // Initial check and add scroll event listener
    animateSkillBars()
    window.addEventListener("scroll", animateSkillBars)

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    function setActiveNavLink() {
        let current = ""

        sections.forEach((section) => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id")
            }
        })

        navLinks.forEach((link) => {
            link.classList.remove("text-primary")
            const href = link.getAttribute("href").substring(1)
            if (href === current) {
                link.classList.add("text-primary")
            }
        })
    }

    window.addEventListener("scroll", setActiveNavLink)

    // Typing effect for hero section
    const heroTitle = document.querySelector(".animated-text")
    if (heroTitle) {
        const originalText = heroTitle.innerHTML
        heroTitle.innerHTML = ""

        let i = 0
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i)
                i++
                setTimeout(typeWriter, 50)
            }
        }

        // Start the typing effect after a short delay
        setTimeout(typeWriter, 500)
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector("#hero")
    if (heroSection) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY
            if (scrollPosition < 600) {
                const yPos = scrollPosition * 0.2
                heroSection.style.backgroundPosition = `50% ${yPos}px`
            }
        })
    }

    // Project filtering
    const filterButtons = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card-modern")

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"))

            // Add active class to clicked button
            button.classList.add("active")

            // Get filter value
            const filterValue = button.getAttribute("data-filter")

            // Filter projects
            projectCards.forEach((card) => {
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    card.style.display = "block"
                    setTimeout(() => {
                        card.style.opacity = "1"
                        card.style.transform = "translateY(0)"
                    }, 100)
                } else {
                    card.style.opacity = "0"
                    card.style.transform = "translateY(20px)"
                    setTimeout(() => {
                        card.style.display = "none"
                    }, 300)
                }
            })
        })
    })

    // Counter animation
    const counters = document.querySelectorAll(".counter")

    function startCounters() {
        counters.forEach((counter) => {
            const target = Number.parseInt(counter.getAttribute("data-target"))
            const duration = 2000 // ms
            const step = target / (duration / 50) // Update every 50ms

            let current = 0
            const timer = setInterval(() => {
                current += step
                counter.textContent = Math.floor(current)

                if (current >= target) {
                    counter.textContent = target
                    clearInterval(timer)
                }
            }, 50)
        })
    }

    // Start counters when they come into view
    const counterSection = document.querySelector("#about")
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startCounters()
                observer.disconnect()
            }
        })
        observer.observe(counterSection)
    }

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll(".service-card-modern")
    serviceCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px)"
        })
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0)"
        })
    })

    // Add hover effect to project cards
    const projectCardImages = document.querySelectorAll(".project-card-modern img")
    projectCardImages.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            img.style.transform = "scale(1.1)"
        })
        img.addEventListener("mouseleave", () => {
            img.style.transform = "scale(1)"
        })
    })

    // Profile Image Upload Preview
    const profileImageInput = document.getElementById("profile-image")
    const imagePreview = document.getElementById("image-preview")
    const uploadIcon = document.getElementById("upload-icon")

    if (profileImageInput) {
        profileImageInput.addEventListener("change", (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0]
                const reader = new FileReader()

                reader.onload = (e) => {
                    imagePreview.src = e.target.result
                    imagePreview.classList.remove("hidden")
                    uploadIcon.classList.add("hidden")
                }

                reader.readAsDataURL(file)
            }
        })
    }
})

