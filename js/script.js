// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById("navBar").classList.toggle("active");
}

// Back to Top & Parallax Scroll Logic
window.onscroll = function() {
    let btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }

    // Parallax Background Logic
    const pipelineSection = document.querySelector('.pipeline-cinematic');
    const bg = document.querySelector('.parallax-bg');
    if (pipelineSection && bg) {
        let scrollOffset = window.pageYOffset - pipelineSection.offsetTop;
        bg.style.transform = `translateY(${scrollOffset * 0.1}px)`;
    }
};

// --- PIPELINE HORIZONTAL SCROLL LOGIC ---
// This needs to run once the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const scrollContainer = document.querySelector("#pipelineScroll");

    if (scrollContainer) {
        // Mouse Wheel to Horizontal
        scrollContainer.addEventListener("wheel", (evt) => {
            evt.preventDefault();
            scrollContainer.scrollLeft += evt.deltaY;
        }, { passive: false });

        // Drag to Scroll functionality
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        });
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        scrollContainer.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; 
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
    }
});

// Portfolio Filter Logic
function filterSelection(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase() || 
           (category === 'all' && btn.innerText === 'ALL')) {
            btn.classList.add('active');
        }
    });

    items.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hide');
            item.classList.add('show');
        } else {
            if (item.getAttribute('data-category') === category) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.add('hide');
                item.classList.remove('show');
            }
        }
    });
}

// Modal Functions
function openVideo(element) {
    const videoId = element.getAttribute('data-video-id');
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("vimeoPlayer");
    iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    modal.style.display = "flex";
}

function openImage(element) {
    const imgSrc = element.getAttribute('data-image-src');
    const modal = document.getElementById("videoModal");
    const contentArea = modal.querySelector('.modal-content-container');
    contentArea.innerHTML = `<img src="${imgSrc}" style="width:100%; max-height:85vh; object-fit:contain; border:1px solid #333;">`;
    modal.style.display = "flex";
}

function closeVideo() {
    const modal = document.getElementById("videoModal");
    const contentArea = modal.querySelector('.modal-content-container');
    modal.style.display = "none";
    contentArea.innerHTML = `<div class="vimeo-container"><iframe id="vimeoPlayer" src="" frameborder="0" allow="autoplay; fullscreen"></iframe></div>`;
}

function copyEmail(btn) {
    // 1. Copy the actual email
    navigator.clipboard.writeText('info@zeldinstudio.com');
    
    // 2. Trigger the "COPIED" status message
    const msg = document.getElementById('copyMessage');
    msg.classList.add('show');
    
    // 3. Temporary button feedback
    const originalText = btn.innerText;
    btn.innerText = "COPIED";

    // 4. Reset after 2 seconds
    setTimeout(() => {
        msg.classList.remove('show');
        btn.innerText = originalText;
    }, 2000);
}