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

// function that controls the buttons for adding or removing
// a product from the count that goes to the cart
function changeByOne(btn) {
    let amount = document.querySelector('#amount');

    switch (btn.id) {
        case 'decrease':
            // do not decrease if the value is already equal to zero
            if (amount.innerHTML > 0) {
                amount.innerHTML--
            }
            break;
        case 'increase':
            amount.innerHTML++
            break;
    }
}

function addProduct() {
    let amount = document.querySelector('#amount').innerHTML;
    amount = Number(amount);

    if (amount === 0) {
        return;
    }

    // add the informations to local storage ***
    addToBD('Fall Limited Edition Sneakers', 125, amount);
    createElements();
}

function addToBD(name, value, amount) {

    // if already exists this itms in local storage ***
    if (localStorage.getItem('shoesAmount')) {
        let amountStored = localStorage.getItem('shoesAmount');
        amountStored = Number(amountStored);
        amountStored += amount;
        localStorage.setItem('shoesAmount', amountStored)
    }

    if (localStorage.getItem('shoesName') === null) {
        localStorage.setItem('shoesName', name);
        localStorage.setItem('shoesValue', value);
        localStorage.setItem('shoesAmount', amount);
    }
}

function createElements() {
    if (localStorage.getItem('shoesName') !== null) {
        const cartProducts = document.querySelector('#cartProducts');
        cartProducts.innerText = '';

        // create the elements that will be put on the cart ***
        const mainDiv = document.createElement('div');
        const secondDiv = document.createElement('div');
        const thirdDiv = document.createElement('div');
        const imgDiv = document.createElement('div');
        const imgThumb = document.createElement('img');
        const imgRemove = document.createElement('img');
        const p = document.createElement('p');
        const spanValue = document.createElement('span');
        const spanAmount = document.createElement('span');
        const spanResult = document.createElement('span');
        const btnRemove = document.createElement('button');
        const btnCheckout = document.createElement('button');

        // get the informations of the local storage ***
        const shoesValue = localStorage.getItem('shoesValue');
        const shoesAmount = localStorage.getItem('shoesAmount');

        const result = shoesValue * shoesAmount;

        // adding classes to the new elements
        mainDiv.className = 'row mb-2'
        imgDiv.className = 'col-2 p-0 py-2 rounded-3'
        imgThumb.className = 'img-fluid rounded-1'
        secondDiv.className = 'col-9 p-0 ps-3 d-flex flex-column justify-content-center text-dark-grayish-blue  '
        p.className = 'm-0'
        spanResult.className = 'ms-2 fw-bold text-very-dark-blue'
        btnRemove.className = 'btn col-1 p-0';
        btnCheckout.className = "btn bg-orange mt-auto w-100 py-3 fw-bold rounded-3";
        cartProducts.classList.remove('fw-bold');

        imgRemove.src = './assets/images/icon-delete.svg';
        btnRemove.appendChild(imgRemove);
        btnRemove.addEventListener('click', () => {
            cleanDB(cartProducts)
        })

        // adding informations tho the new elements
        p.innerHTML = localStorage.getItem('shoesName');
        spanValue.innerHTML = `$${shoesValue}.00 `
        spanAmount.innerHTML = `x ${shoesAmount}`;
        spanResult.innerHTML = `$${result}.00`;
        btnCheckout.innerHTML = "Checkout";
        imgThumb.src = './assets/images/image-product-1-thumbnail.jpg';

        // conecting the new elements
        imgDiv.appendChild(imgThumb)
        mainDiv.appendChild(imgDiv);
        secondDiv.appendChild(p);
        thirdDiv.appendChild(spanValue);
        thirdDiv.appendChild(spanAmount);
        thirdDiv.appendChild(spanResult);
        secondDiv.appendChild(thirdDiv);
        mainDiv.appendChild(secondDiv);
        mainDiv.appendChild(btnRemove)

        cartProducts.appendChild(mainDiv)
        cartProducts.appendChild(btnCheckout)
    }
}

// function to clean the cart and local storage
function cleanDB(div) {
    localStorage.removeItem('shoesName');
    localStorage.removeItem('shoesValue');
    localStorage.removeItem('shoesAmount');

    div.innerHTML = 'Your cart is empty.';
    div.classList.add('fw-bold');
}