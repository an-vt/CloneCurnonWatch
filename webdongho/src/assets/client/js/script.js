// let categoryListElement = document.querySelectorAll('.categoryList-item')
// let categoryListContentElement = document.querySelectorAll('.header-categoryList-content')

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

export default function handleHoverSubNav() {
    const categoryList = document.querySelectorAll('.categoryList-item')
    const categoryListContent = document.querySelectorAll('.header-left-body-content')

    categoryList.forEach((item ,index) => {
        const listContentItem = categoryListContent[index]
        item.onmouseover = function() {

            document.querySelector('.categoryList-item.hover').classList.remove('hover')
            document.querySelector('.header-left-body-content.active').classList.remove('active')
    
            this.classList.add('hover')
            listContentItem.classList.add('active')
        }    
    })
}

export function handleHoverProductInfo() {
    const productInfoList = document.querySelectorAll('.product-info__item')
    productInfoList.forEach(item => {

        item.onmouseover = () => {
            //get product-info--choose and delete it
            document.querySelector('.product-info__item.product-info__item--choose').classList.remove('product-info__item--choose')

            //add product-info--choose into product-info selecting
            item.classList.add('product-info__item--choose')
        }

    })
} 
