var section = document.getElementsByTagName('section')[0]
var main = document.getElementsByTagName('main')[0]
var closePopup = document.getElementsByTagName('p')[0]
var cart = []
closePopup.addEventListener('click', function () {
    main.style.display = "none"
    closePopup.style.display = "none"
    main.innerHTML = ""

})
function totalprice() {
    var tot = 0
    cart.forEach(ele => {
        tot += ele.product.price * ele.quantity
    })
    const pricediv=document.getElementById('price')

    if(pricediv){
        pricediv.remove()
    }
    var price = document.createElement('h3')
    price.id="price"
    
    price.textContent = tot
    main.appendChild(price)

}

document.getElementById('orders').addEventListener('click', function () {
    main.style.display = "flex"
    closePopup.style.display = "block"
    cart.forEach(ele => {
        const box = createBox(ele.product)
        var plus = document.createElement("button")
        var moin = document.createElement("button")
        plus.textContent = "+"
        moin.textContent = "-"

        var quantity = document.createElement('h4')
        quantity.textContent = ele.quantity
        box.appendChild(plus)
        box.appendChild(quantity)
        box.appendChild(moin)

        main.appendChild(box)
        plus.addEventListener('click', function () {
            ele.quantity+=1
            totalprice()
            quantity.textContent=ele.quantity
        })

    })
    totalprice()


})

function handleAddToCart(product) {//{id:1,title:"title"}
    console.log(product);
    var existProduct = cart.find((ele) => ele.product.id == product.id)
    if (existProduct) {
        return;
    }
    cart.push({ product: product, quantity: 1 })

}


function createBox(element) {

    var productBox = document.createElement('div')
    productBox.className = "product-box"
    //creation d e l'image
    var productImage = document.createElement('img')
    productImage.src = element.image
    var productTitle = document.createElement('h2')
    productTitle.textContent = element.title
    var productPrice = document.createElement('h3')
    productPrice.textContent = `${element.price} $`
    productBox.appendChild(productImage)
    productBox.appendChild(productTitle)
    productBox.appendChild(productPrice)
    return productBox
}
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            var productBox = createBox(element)
            var addToCardButton = document.createElement('button')
            addToCardButton.textContent = 'add to cart'
            productBox.appendChild(addToCardButton)
            section.appendChild(productBox)
            addToCardButton.addEventListener('click', () => handleAddToCart(element))//{id:1,title:"title"}
        });
    })

