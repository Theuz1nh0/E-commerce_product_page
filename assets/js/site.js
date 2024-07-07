// functions to switch both carousels at the same time when the previous and next buttons are clicked
function prevMainCarousel(index) {
    const prev = document.querySelectorAll('.carousel-control-prev');
    prev[index].click();
}

function nextMainCarousel(index) {
    const next = document.querySelectorAll('.carousel-control-next');
    next[index].click();
}


/*  
    function so that when the thumbnail of one carousel is clicked, 
    the thumbnail of the other is modified to the same one that was clicked
*/
const thumbnails = document.querySelectorAll('.shoe-thumbnail')
thumbnails.forEach((thumb, index) => thumb.addEventListener('click', () => {
    thumbnails.forEach((thumb2, index2) => {
        let attributeThumb = thumb.getAttribute('data-bs-slide-to');
        let attributeThumb2 = thumb2.getAttribute('data-bs-slide-to');
        if (attributeThumb === attributeThumb2 && index != index2) {
            thumb2.click()
        }
    })
}))