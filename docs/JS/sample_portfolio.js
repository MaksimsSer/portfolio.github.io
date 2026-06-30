// These functions open and close the contact form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// This function displays the first image in the slideshow when the page loads
var slideIndex = 1;
showSlides(slideIndex);

// This function changes the slide when the left or right arrows are clicked
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// This function changes the slide when the dots are clicked
function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides"); // This takes all elements with the class name "mySlides" and stores them in the variable array "slides"
    var dots = document.getElementsByClassName("dot"); // This takes all elements with the class name "dot" and stores them in the variable array "dots"
    if (n > slides.length) {slideIndex = 1}; // If n (the number passed into the function) is greater than the length of the array "slides", the slideIndex is set to 1
    if (n < 1) {slideIndex = slides.length}; // If n (the number passed into the function) is less than 1, te slideIndex is set to the length of the array "slides"
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // This for loop takes each item in the array "slides" and sets the display to none
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // This for loop takes each item in the array "dots" and removes "active" which removes the active styling
    }
    slides[slideIndex - 1].style.display = "block"; // This displays the image in the slideshow
    dots[slideIndex - 1].className += " active"; // This adds the active styling to the dot associated with the image
}

// This code will create close the contact form when the user clicks off of it
// The first step is to add an event listener for any clicks on the website
document.addEventListener("click", function(event){
    // Here we state that if the click happens on the cancel button OR anywhere that is not the contact form AND the click does not happen on any element with the contact class then call the closeForm() function
    if (event.target.matches(".cancel") || !event.target.closest(".form-popup") && !event.target.closest(".Pop_Up_Button") && !event.target.closest(".contact")){
        closeForm()
    }
}, false )

// Assistant chat widget interactions
const assistantToggle = document.getElementById("assistantToggle");
const assistantClose = document.getElementById("assistantClose");
const assistantPanel = document.getElementById("assistantPanel");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");
const assistantMessages = document.getElementById("assistantMessages");

function toggleAssistant(forceOpen) {
    if (!assistantPanel) return;
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !assistantPanel.classList.contains("open");
    assistantPanel.classList.toggle("open", shouldOpen);
    if (assistantToggle) {
        assistantToggle.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    }
}

function addAssistantMessage(text, isUser) {
    if (!assistantMessages) return;
    const message = document.createElement("div");
    message.className = "assistant-message " + (isUser ? "assistant-user" : "assistant-bot");
    message.textContent = text;
    assistantMessages.appendChild(message);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function getAssistantReply(question) {
    const q = question.toLowerCase();

    if (q.includes("skill") || q.includes("technology") || q.includes("stack") || q.includes("lang")) {
        return "I work with HTML, CSS, JavaScript, MySQL, .NET, and C#.";
    }
    if (q.includes("project") || q.includes("portfolio")) {
        return "I have built a portfolio website and a polished contact experience integrated with Formspree.";
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone")) {
        return "You can open the Contact form from the button on the page or use the form section below.";
    }
    if (q.includes("about") || q.includes("who")) {
        return "I am a software developer in training focused on building clean, modern web experiences.";
    }
    if (q.includes("github")) {
        return "You can view my GitHub profile in the GitHub section or here: https://github.com/MaksimsSer";
    }
    if (q.includes("price") || q.includes("cost")) {
        return "Project pricing depends on scope and timeline. Feel free to contact me with your idea.";
    }

    return "You can ask me about my skills, projects, experience, GitHub, or how to get in touch.";
}

if (assistantToggle) {
    assistantToggle.addEventListener("click", function() {
        toggleAssistant();
    });
}

if (assistantClose) {
    assistantClose.addEventListener("click", function() {
        toggleAssistant(false);
    });
}

if (assistantForm) {
    assistantForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const value = assistantInput.value.trim();
        if (!value) return;

        addAssistantMessage(value, true);
        assistantInput.value = "";
        setTimeout(function() {
            addAssistantMessage(getAssistantReply(value), false);
        }, 350);
    });
}