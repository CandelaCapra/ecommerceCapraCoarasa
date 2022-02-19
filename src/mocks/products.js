const products = [
    {
        id:1, 
        title:"Wotakoi 01", 
        author:"Fujita",
        format:"rústica",
        language:"español",
        publisher:"Panini Manga Argentina",
        pages:"136",
        isbn:"978-607-548-834-9",
        price: 625, 
        pictureUrl: "https://img.assinaja.com/assets/tZ/054/img/201804_520x520.jpg",
        stock: 4,
        category:"Manga",
        plotSummary:"¿Puede un oficinista que es secretamente un empedernido gamer y una mujer que es en secreto una fujoshi salir sin que sus pasatiempos se entrometan en su relación o sin revelar su secreto? Para Narumi Momose no ha sido fácil encontrar pareja, cada novio la ha dejado cuando se enteran de sus aficiones, eso la ha llevado a ocultar que es una fujoshi. Pero cuando entra a su nuevo trabajo, encuentra a su amigo de la infancia Hirotaka Nifuji quien sabe de su secreta afición. Ella pensará en un plan para que no diga su secreto, pero él le hace una contrapropuesta, ¿Por qué no empiezan a salir?"
    }, 
    {
        id:2,
        title:"Wotakoi 10",   
        author:"Fujita",
        format:"rústica",
        language:"español",
        publisher:"Panini Manga Argentina",
        pages:"128",
        isbn:"978-607-568-516-8",
        price: 625, 
        pictureUrl: "https://ramenparados.com/wp-content/uploads/2021/06/wotakoi-10-723x1024.jpg",
        stock: 5,
        category:"Manga",
        plotSummary:"Naoya está preocupado porque no logra hablar con Ko y arreglar las cosas, así que pide consejo a sus dos amigos. Estos le sugieren estrategias, pero él lo único que quiere es hablar con ella; y por culpa de un trabajo de la universidad pronto tendrá menos tiempo para hacerlo. Mientras tanto, Hanako y Kabakura empiezan su vida de recién casados, mientras Narumi y Hirotaka siguen compartiendo momentos y problemas."
    },
    {
        id:3, 
        title: "Spiderman 14", 
        author:"Dan Slott",
        format:"rústica",
        language:"español",
        publisher:"OVNI Press Marvel",
        pages:"72",
        isbn:"978-987-185-845-3",
        price: 600, 
        pictureUrl: "https://tap-multimedia-1172.nyc3.digitaloceanspaces.com/productimage/7359/9789871858453.jpg",
        stock: 8,
        category:"Comics",
        plotSummary:"¿Spider-man destruye New York? Una máquina del tiempo revela que al día siguiente, el arácnido será responsable de la total aniquilación de la ciudad. Pero, ¿qué hizo? Peter tendrá una carrera contra el reloj para averiguarlo y evitar que destruya el mañana. Y además el recientemente resucitado Antorcha Humana llega justo a tiempo para ayudar a Spider-man en una misión en el espacio. ¿Qué tan lejos llegará la telaraña en gravedad cero?"
    },
    {
        id:4, 
        title:"Heartstopper Vol. 1", 
        author:"Alice Oseman",
        format:"rústica",
        language:"español",
        publisher:"V&R Editoras",
        pages:"296",
        isbn:"978-987-747-587-6",
        price: 1500, 
        pictureUrl: "https://contentv2.tap-commerce.com/cover/large/9789877475876_1.jpg?id_com=1113",
        stock:13,
        category:"Novelas",
        plotSummary:"Charlie y Nick van al mismo colegio, aunque nunca se habían cruzado hasta el día en que los hacen sentarse juntos en su grupo de estudio.Muy pronto se vuelven amigos y más pronto aún Charlie comienza a sentir cosas por Nick... aunque sabe que es un imposible. Pero el amor obra de formas inesperadas, y Nick está más interesado en Charlie de lo que ninguno de los dos puede llegar a creer."
    },
    {
        id:5, 
        title:"Heartstopper Vol. 3", 
        author:"Alice Oseman",
        format:"rústica",
        language:"español",
        publisher:"V&R Editoras",
        pages:"384",
        isbn:"978-987-747-697-2",
        price: 1500, 
        pictureUrl: "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4449/9781444952773.jpg",
        stock: 7,
        category:"Novelas",
        plotSummary:"¡El colegio organiza una excursión a París!Nick y Charlie van a aprovechar su visita a la ciudad del amor para contarles a sus compañeros sobre su relación, pero ¿se animarán? Charlie tiene terror de que Nick sufra el mismo bullying que le hicieron a él un año atrás al salir del armario. Y Nick está preocupado porque sospecha que algo le ocurre a Charlie y no sabe qué hacer. ¿Es normal que coma tan poco? ¿Debería hablar con él? Mientras tanto, Tao y Elle tendrán que hacerle frente a sus sentimientos, y Tara y Darcy van a contar su historia de amor para que Nick y Charlie se animen a compartir la suya con el mundo.¡Bienvenue al tercer tomo de Heartstopper!"
    }    
]

const categories = [
    {
        id:"novelas",
        catName:"Novelas gráficas"
    },
    {
        id:"comics",
        catName:"Cómics"
    },
    {
        id:"manga",
        catName:"Manga"
    }
]

const retrieveProducts = (categoryId) =>{
    return new Promise ((resolve) =>{
        const filteredProducts = categoryId ? products.filter(elem=> elem.category.toLowerCase() === categoryId) : products;
        setTimeout(()=>{
            resolve(filteredProducts)
        },2000);
   })
} 

const retrieveProduct = (id) =>{
    return new Promise ((resolve) =>{
        const product = products.find(elem=>elem.id===parseInt(id));
        setTimeout(()=>{
            resolve(product);
        },2000);
   })
} 

const retrieveCategories = () =>{
    return new Promise ((resolve) =>{
        setTimeout(()=>{
            resolve(categories);
        },1000);
    })
}

export {products, retrieveProducts, retrieveProduct, retrieveCategories}

