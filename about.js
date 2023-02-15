// all code is my own unless otherwise stated 

// as user scrolls down about page text boxes appear 

// initialise intersection observer object to monitor which elements intersect the viewport
const observer = new IntersectionObserver((entries)=>{
    // function called when observed element intersects viewport
    entries.forEach((entry)=>{
        console.log(entry)
        if (entry.isIntersecting){
            // if the observed object is intersecting then add show class
            entry.target.classList.add('show');
        } else {
            // if it isnt then remove show class
            entry.target.classList.remove('show'); 
        //show class changes CSS properties to make the element transition in and be visible    
        }
    });
});

// selects all objects with class para
// calls observer object for each of them
const hiddenItems = document.querySelectorAll('.para');
hiddenItems.forEach((el) => observer.observe(el));
