const products = [
    {id:1, title:"Wotakoi 01", price: 625, pictureUrl: "https://http2.mlstatic.com/D_NQ_NP_875778-MLA40940712791_022020-O.webp"}, 
    {id:2, title:"Wotakoi 10", price: 625, pictureUrl: "https://ramenparados.com/wp-content/uploads/2021/06/wotakoi-10-723x1024.jpg"},
    {id:3, title: "Spiderman 14", price: 600, pictureUrl: "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/7359/9789871858453.jpg"},
    {id:4, title:"Heartstopper Vol. 3", price: 1500, pictureUrl: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4449/9781444952773.jpg"}, 
    {id:5, title:"Heartstopper Vol. 1", price: 1500, pictureUrl: "https://contentv2.tap-commerce.com/cover/large/9789877475876_1.jpg?id_com=1113"}    
]

const retrieveProducts = () =>{
    return new Promise ((resolve) =>{
        setTimeout(()=>{
            resolve(products);
        },2000)
   })
} 

export {products, retrieveProducts}

