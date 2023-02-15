// all code is my own unless otherwise stated 

let cart = [];

//-----------------------------------------------------------------------------------
// add items to the cart
function addToCart(item, price, image) {
  //get arguments from html when function is called and store in product object
    const product = {
        item: item,
        price: price,
        image: image,
        quantity: 1
    };

// checks if this item is already in the cart by comparing new product object to existing items in the cart array
    var duplicate = false
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].item == product.item){
          duplicate = true
        }
      }
      if (duplicate == false){
        //call functions to display the item in the cart and update the total below
        displayCart(product);
        updateTotal(); 
      }else{
        alert("This item is already in the cart")
      }

    }

//------------------------------------------------------------------------------------
// display the contents of the cart
function displayCart(product) {

// display the following information in the html container with the id cartItems
  const cartDisplay = document.getElementById("cartItems");
      //adds item to the cart
        cartDisplay.insertAdjacentHTML("beforeend",`
        <div class = "cart-items">
            <div class="d-flex align-items-center card flex-row cart-row card cartBorder cart-items mt-2 mb-3 animated flipInX col-sm-3">
            
                <div class="p-1 cart-item-image">
                    <img src="${product.image}" alt= "${product.item}" style="max-width: 50px;"/>
                </div>

                <div class="p-1 mt-3">
                    <p class="cart-item-name">${product.item}</p>
                </div>

                <div class="p-1 mt-3">
                    <p class="cart-item-price">${product.price}</p>
                </div>

                <div class="p-1 mt-3">
                <button class="btn badge btn-warning decrease" type="button" data-action="decrease-item">&minus;
                </div>

                <div class="">
                <p class="cart-item-quantity">${product.quantity}</p>
                </div>

                <div class="p-1 mt-3 ml-auto">
                    <button class="btn badge btn-success increase" type="button" data-action="increase-item">&plus;
                </div>

                <div class="p-1 mt-3">
                <button class="btn badge badge-danger btn-danger" type="button" data-action="remove-item">&times;
                </div>
            </div> 
        </div>`);

        // adds item to cart array
        cart.push(product);
        
    //-----------------------------------------------------------------------------------
    //adds listener to the remove item button 
    var removeCartItemBtns = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemBtns)

    for (var i = 0; i < removeCartItemBtns.length; i++){
        var button = removeCartItemBtns[i]
        // prevent cart buttons, pay and clear, from being deleted
        if (!button.classList.contains("dontDelete")) {          
          
          //when the button is pressed the parent of the parent element of the button is removed
          //ie the item the button belongs to is removed
          button.addEventListener('click',function(event){            
              
              var buttonClicked =  event.target
              //records the item name for comparison in the array
              var removeItem = buttonClicked.parentElement.parentElement.querySelector(".cart-item-name");
              
              //removes item from the cart array
              cart = cart.filter(function(value){
                return value.item !== removeItem.innerHTML;
              });

              //removes item from the cart on screen
              buttonClicked.parentElement.parentElement.remove()          

              updateTotal() 

          })
        }
    }

    //-----------------------------------------------------------------------------------
    //adds listener to the increase quantity buttons
    var increaseQuantityBtns = document.getElementsByClassName('increase')

    // ensures only the most recent item added gets a listener, so there are no duplicates 
      var button = increaseQuantityBtns[increaseQuantityBtns.length - 1]

      //add listener to increase quantity button for the last item in the list
        button.addEventListener('click',function(event){

          var buttonClicked =  event.target
          //finds the current quantity and increases it by 1
          const quantityElement = buttonClicked.parentElement.parentElement.querySelector(".cart-item-quantity")
          let currentQuantity = parseInt(quantityElement.textContent); //changed the string to an integer so it can be manipulated
          currentQuantity++;
          // updates quantity in cart
          quantityElement.textContent = currentQuantity;  

          updateTotal()
        });
      


    //-----------------------------------------------------------------------------------
    //adds listener to decrease quantity buttons
    var decreaseQuantityBtns = document.getElementsByClassName('decrease')

      //add listener to last item in the cart
      var button = decreaseQuantityBtns[decreaseQuantityBtns.length - 1]

      button.addEventListener('click',function(event){
        var buttonClicked =  event.target

        const quantityElement = buttonClicked.parentElement.parentElement.querySelector(".cart-item-quantity")
        let currentQuantity = parseInt(quantityElement.textContent);
        currentQuantity--; //decreases quantity by one
        quantityElement.textContent = currentQuantity;

        //if the quantity is 0 then the item is removed from the cart
        if (currentQuantity == 0){
          
          //removes item from the cart array
          var removeItem = buttonClicked.parentElement.parentElement.querySelector(".cart-item-name");
          cart = cart.filter(function(value){
            return value.item !== removeItem.innerHTML;
          });
          //remove item row in cart
          buttonClicked.parentElement.parentElement.remove()
        }      

        updateTotal()
      })

  }

  
  function updateTotal(){
    let Total = 0  
    let formatTotal = 0
    // find the html container holding the cart
    var cartItemContainer = document.getElementsByClassName('cart-items')
    // for each row in the container
      for (let j = 0; j < cartItemContainer.length; j++) {

        var cartRows = cartItemContainer[j].getElementsByClassName('cart-row')
        // finds the price and quantity on each row
        for (var i = 0; i < cartRows.length; i++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-item-quantity')[0]
            // convert both values to integers so they can be manipulated
            var quantity = parseFloat(quantityElement.innerText)
            var price = parseFloat(priceElement.innerText)

            // calculates the total price of all of the rows
            Total += price*quantity
            formatTotal = Total.toFixed(2);
        }   
            //output the total below the cart 
        document.getElementById("cart-total-price").innerHTML = "£ " + formatTotal          
      }
  }

function clearCart(){
  //removes all items from the array
  cart.length = 0;
  //removes items from cart
  document.getElementById('cartItems').innerHTML=``;
  //reduces total to £0
  document.getElementById("cart-total-price").innerHTML = "£ 0"
}

//press button on the lower right of the screen to scroll down
// finds button element and adds click listener
document.getElementById("scrollBtn").addEventListener("click", function() {
  // find container we want to scroll to, cart
  var container = document.getElementById("cart");
  // get position of cart relative to the top of the document
  var containerPosition = container.offsetTop;
  // get the current window scroll position
  var currentPosition = window.pageYOffset;
  
  // If the container is not already in view (i.e. its position is greater than the current scroll position)
  if (containerPosition > currentPosition) {
    // Smoothly scroll to the container
    window.scroll({
      top: containerPosition,
      left: 0,
      behavior: "smooth"
    });
  }
});
