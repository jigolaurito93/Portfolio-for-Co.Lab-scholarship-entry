// ============ ABOUT ME PAGE ====================
let options = document.querySelectorAll('.tab-links');
for (let i=0; i < options.length; i++) {
  options[i].addEventListener('click', function(){

    let contents = document.querySelectorAll('.tab-contents');
    for (let i= 0; i < contents.length; i++) {
      options[i].classList.remove('active-link')
      if (contents[i].id == 'show'){
        contents[i].setAttribute('id', 'hide')
      }
      
    }

    let word = this.id
    
    console.log(options[i])
    document.querySelector('.' + word).setAttribute('id', 'show')
    this.classList.add('active-link')
    
  })
}

// ============ END OF ABOUT ME PAGE ====================