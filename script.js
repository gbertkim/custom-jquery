class customJquery {
    constructor(selector){
        if (selector === document || selector === window){
            this.elements = [selector]
        } else {
            this.elements = document.querySelectorAll(selector)
        }
    }
    static ajax({url, success}) {
        return fetch(url).then((res)=>res.json())
        .then(success)
    }
    html(innerHTML){
        this.elements.forEach((el)=> {
            el.innerHTML = innerHTML
        })
    }
    hide(){
        console.log(this.elements)
        this.elements.forEach((el)=>{
            el.style.display = 'none'
        })
    }
    on(eventType, cb){
        this.elements.forEach((el)=>{
            el.addEventListener(eventType, cb)
        })
    }
    show(){
        this.elements.forEach((el)=>{
            el.style.display = ''
        })
    }
    addClass(className) {
        let classNames
        if (typeof className === 'string') {
            classNames = className.split(' ')
        } else if(className instanceof Array){
            classNames = className
        }
        this.elements.forEach((el)=>{
            classNames.forEach((itemClassName) => {
                el.classList.add(itemClassName)
            })
        })
    }
    removeClass(className) {
        let classNames
        if (typeof className === 'string') {
            classNames = className.split(' ')
        } else if(className instanceof Array){
            classNames = className
        }
        this.elements.forEach((el)=>{
            classNames.forEach((itemClassName) => {
                el.classList.remove(itemClassName)
            })
        })
    }
    toggleClass(className, bool){
        let classNames
        if (typeof className === 'string') {
            classNames = className.split(' ')
        } else if(className instanceof Array){
            classNames = className
        }
        if (bool === undefined) {
            this.elements.forEach(el => {
                classNames.forEach((itemClassName)=> {
                    if (el.classList.contains(itemClassName)) {
                        this.removeClass(itemClassName)
                    } else {
                        this.addClass(itemClassName)
                    }
                })
            })
        } else if (bool === true){
            this.elements.forEach(el => {
                classNames.forEach((itemClassName)=> {
                    this.addClass(itemClassName)
                })    
            }) 
        } else if (bool === false){
            this.elements.forEach(el => {
                classNames.forEach((itemClassName)=> {
                    this.removeClass(itemClassName)
                })
            })
        }
    }
    unwrap(string) {
        this.elements.forEach((el)=>{
            if(el.parentNode === document.querySelector(string)) {
                el.parentNode.replaceWith(...el.parentNode.childNodes)
            } else if (string === undefined && el.parentNode) {
                el.parentNode.replaceWith(...el.parentNode.childNodes)
            }
        })
    }
}

const $$ = (selector) => {
    return new customJquery(selector)
}    
$$.ajax = customJquery.ajax

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
// $$('.blue').removeClass('square blue')
$$('#squareId').removeClass(['square', 'blue'])
$$('#squareId').addClass(['square', 'blue'])
$$('#squareId').on('click', () => {
    $$('#squareId').toggleClass('blue')
})
$$('#pContent').unwrap('#pContainer')