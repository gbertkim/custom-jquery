function $$(selector) {
    let elements = document.querySelectorAll(selector)
    return { elements, selector }
}
$$().__proto__.html = function(innerHTML) {
    
    this.elements.forEach(el=>{
        el.innerHTML = innerHTML
    })
}
$$().__proto__.hide = function() {

    this.elements.forEach((el)=>{
        el.style.display = 'none'
    })
}
$$().__proto__.on = function(eventType, cb) {
    this.elements.forEach((el)=>{
        el.addEventListener(eventType, cb)
    })
}
$$().__proto__.show = function(){
    this.elements.forEach((el)=>{
        el.style.display = ''
    })
}
$$.__proto__.ajax = async function(obj){
    try {
        let results = await fetch(obj.url)
        obj.success(results)
    } catch (e) {
        console.log(e)
    }
}

// Tests
$$('button.continue').html('Next Step...')
var hiddenBox = $$( "#banner-message" );
hiddenBox.hide()
$$( "#button-container button" ).on( "click", function( event ) {
  hiddenBox.show();
})
$$.ajax({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    success: function (result) {
      console.log('$.ajax:', result);
    }
})

const btns = $$('button.continue')
const btns2 = $$('button.continue')
console.log(btns.html === btns2.html)