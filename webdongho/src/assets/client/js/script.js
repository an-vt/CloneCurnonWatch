// let categoryListElement = document.querySelectorAll('.categoryList-item')
// let categoryListContentElement = document.querySelectorAll('.header-categoryList-content')

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

export default function handleHover() {
    const categoryList = document.querySelectorAll('.categoryList-item')
    const categoryListContent = document.querySelectorAll('.header-left-body-content')

    console.log(categoryList)
    console.log(categoryListContent)

    categoryList.forEach((item ,index) => {
        const listContentItem = categoryListContent[index]
    
        console.log(listContentItem)
    
        item.onmouseover = function() {
            console.log('click')
    
            document.querySelector('.categoryList-item.hover').classList.remove('hover')
            document.querySelector('.header-left-body-content.active').classList.remove('active')
    
            this.classList.add('hover')
            listContentItem.classList.add('active')
        }    
    })
}
