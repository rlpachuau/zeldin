// Toggle Mobile Menu
function toggleMenu() {
    document.getElementById("navBar").classList.toggle("active");
}

// Back to Top Scroll Logic
window.onscroll = function() {
    let btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Open Video Modal (Vimeo)
function openVideo(element) {
    const videoId = element.getAttribute('data-video-id');
    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("vimeoPlayer");
    iframe.src = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    modal.style.display = "flex";
}

// Open Image Modal
function openImage(element) {
    const imgSrc = element.getAttribute('data-image-src');
    const modal = document.getElementById("videoModal");
    const contentArea = modal.querySelector('.modal-content-container');
    contentArea.innerHTML = `<img src="${imgSrc}" style="width:100%; max-height:85vh; object-fit:contain; border:1px solid #333;">`;
    modal.style.display = "flex";
}

// Close Modal and Reset Iframe
function closeVideo() {
    const modal = document.getElementById("videoModal");
    const contentArea = modal.querySelector('.modal-content-container');
    modal.style.display = "none";
    // Reset to iframe layout for next time
    contentArea.innerHTML = `<div class="vimeo-container"><iframe id="vimeoPlayer" src="" frameborder="0" allow="autoplay; fullscreen"></iframe></div>`;
}

// Copy Email Utility
function copyEmail() {
    navigator.clipboard.writeText('info@zeldinstudio.com');
    alert('Email Copied!');
}

function filterSelection(category) {
    const items = document.querySelectorAll('.portfolio-item');
    const buttons = document.querySelectorAll('.filter-btn');

    // Update active button state
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category.toLowerCase() || 
           (category === 'all' && btn.innerText === 'ALL')) {
            btn.classList.add('active');
        }
    });

    // Filter items
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