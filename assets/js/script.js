// печать текста на главной
document.addEventListener('DOMContentLoaded', () => {
    const element = document.getElementById('typing-text');
    const textLines = [
        "Мы знаем, как воплотить",
        {text: "вашу идею в жизнь", class: "light_white"}
    ];

    let currentLine = 0;
    let currentPos = 0;
    let isTyping = true;

    function type() {
        if (currentLine < textLines.length) {
            const line = textLines[currentLine];
            let lineText = typeof line === 'string' ? line : line.text;
            
            if (currentPos <= lineText.length) {
                let currentText = '';
                
                for (let i = 0; i < currentLine; i++) {
                    const prevLine = textLines[i];
                    if (typeof prevLine === 'string') {
                        currentText += prevLine;
                    } else {
                        currentText += `<span class="${prevLine.class}">${prevLine.text}</span>`;
                    }
                    currentText += '<br>';
                }
                
                if (typeof line === 'string') {
                    currentText += lineText.substring(0, currentPos);
                } else {
                    currentText += `<span class="${line.class}">${lineText.substring(0, currentPos)}</span>`;
                }
                
                element.innerHTML = currentText;
                currentPos++;
                setTimeout(type, 80);
            } else {
                currentLine++;
                currentPos = 0;
                setTimeout(type, 50);
            }
        } else {
            let finalHTML = '';
            textLines.forEach((line, index) => {
                if (typeof line === 'string') {
                    finalHTML += line;
                } else {
                    finalHTML += `<span class="${line.class}">${line.text}</span>`;
                }
                if (index < textLines.length - 1) {
                    finalHTML += '<br>';
                }
            });
            element.innerHTML = finalHTML;
            element.classList.add('typing-complete');
        }
    }

    setTimeout(type, 500);
});


// смена блоков в портфолио
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.portfolio__header');
    const descriptions = document.querySelectorAll('.portfolio__description');
    const images = document.querySelectorAll('.portfolio__img-wrapper img');
    const circles = document.querySelectorAll('.circle');
    let currentIndex = 0;
    let interval;
    const delay = 5000;

    function showSlide(index) {
        headers.forEach(header => header.classList.remove('active'));
        descriptions.forEach(desc => desc.classList.remove('active'));
        images.forEach(img => img.classList.remove('active'));
        circles.forEach(circle => circle.classList.remove('active'));

        headers[index].classList.add('active');
        descriptions[index].classList.add('active');
        images[index].classList.add('active');
        circles[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % headers.length;
        showSlide(nextIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, delay);
    }

    circles.forEach((circle, index) => {
        circle.addEventListener('click', () => {
            clearInterval(interval);
            showSlide(index);
            startAutoSlide();
        });
    });
    startAutoSlide();
});

// бургер меню
document.querySelector('.header__burger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.header__nav').classList.toggle('open');
});

document.querySelectorAll('.header__nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.header__burger').classList.remove('active');
        document.querySelector('.header__nav').classList.remove('open');
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});