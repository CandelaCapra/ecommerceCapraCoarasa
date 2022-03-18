# Curso de React JS de Coderhouse

## Información del proyecto

Ecommerce para una librería online que comercializa cómics, mangas y novelas gráficas en español.

![Demo](FlowWebApp.gif)

###### Descripción

El proyecto contiene dos ramas: Master y Test. Además de la rama principal, se creó una adicional, llamada Test, donde se realizan los cambios que, una vez aprobados, se incluyen en la rama Master. 

La estructura de la aplicación incluye los archivos .json necesarios para configurar el proyecto y dos carpetas: public y src. La primera contiene el archivo index.html y la segunda, los componentes que usará la aplicación.

Algunas de las funcionalidades incluidas en el proyecto son:
- Filtrar por categoría de productos
- Ver detalle de los productos
- Agregar y borrar productos del carrito de compras
- Finalizar la compra y generar el número de orden a través de un formulario

## Dependencias descargadas:

- [Firebase:](https://firebase.google.com/?hl=es) Se incluye esta plataforma para poder tener una base de datos alojada en la nube que almacene los productos y las órdenes de compra del proyecto.

- [React Router:](https://reactrouter.com/docs/en/v6) Se utiliza esta librería para establecer la navegación entre los distintos componentes del proyecto. 

- [React Bootstrap:](https://react-bootstrap.github.io) Se incluye esta librería en el proyecto para darle estilo a los componentes de la aplicación. 

- [React Bootstrap Icons:](https://www.npmjs.com/package/react-bootstrap-icons) Todos los iconos de la aplicación se obtienen de esta librería en forma de componentes.

- [Sweet Alert:](https://sweetalert.js.org/guides/) Se incluye esta librearía para poder mostrar mensajes personalizados y no tener que recurrir al método .alert() cuando se quiere comunicar algo al usuario.

## Ejecución del proyecto
Instalar y ejecutar el proyecto seguir los siguientes pasos:

1. Abrir la terminal y usar el siguiente comando para clonar el repositorio:
```
    git clone https://github.com/CandelaCapra/ecommerceCapraCoarasa.git
```

2. Desde la terminal entrar en la carpeta root del proyecto y usar el siguiente comando para instalar todas las dependencias:
```
    npm install
```

3. Finalmente ejecutamos el proyecto con el siguiente comando:
```
    npm start
```

## Contenido

Todos los componentes del poryecto poseen, en el encabezado del archivo, una o más líneas con el comando import cuya función es incorporar componentes de otros archivos o librerías. Asímismo, al final de cada archivo se puede encontrar la declaración export que permite que el componente creado esté disponible para ser reutilizado en otros componentes. 

Todos los productos de la tienda están definidos como un objeto con las siguientes propiedades:
- id (generado por Firebase)
- author
- category (que puede ser manga, comics o novela)
- format (rústica o tapa dura)
- isbn
- language
- pages
- pictureUrl
- plotSummary
- price (este valor es un number)
- publisher
- stock (este valor también es un number)
- title

Por otro lado, los objetos del array de categorías poseen las siguientes propiedades:
- id (que puede ser comics, manga o novelas)
- catName (que define el nombre completo de la categoría, con acentos y espacios)

Los componentes principales del proyecto son:

1. **CartContext:** Ubicado dentro la carpeta 'src/context' se encuentra el archivo CartContext.js que define los estados del carrito de manera global para que puedan ser utilizados por todos los componentes de la aplicación. Este módulo contiene 7 métodos (pero solo exporta 6) y un estado. 
    - **cart:** Este estado devuelve un array con los productos que hay en el carrito. El formato de cada elemento es un objeto con las propiedades product (que contiene el objeto producto a comprar) y quantity (un número que especifica la cantidad de ejemplares a comprar).
    - **addItem:** Recibe el producto y la cantidad de este a agregar en el carrito. Evalúa si el item ya está en el array cart (usando el método isInCart detallado más adelante) y de ser así suma la cantidad nueva a la ya existente. Si el producto no está en el carrito, entonces lo agregar al array. En ambos casos las modificaciones del array cart se realizan utilizando el hook useState y la isntrucción setCart().
    - **removeItem:** Es un método que filtra el array cart y devuelve todos los elementos que no poseen el mismo Id pasado como argumento. Nuevamente se utiliza el hook useState para modificar el array cart.
    - **clear:** Este método elimina todos los elementos del array cart. Simplemente se utiliza el hook useState para setear el estado con un array vacío. 
    - **isInCart:** El método isInCart recibe como argumento el Id de un producto y, a través del método .some(), evelúa si existe en el array cart un producto con el mismo Id. Devuelve true o false.
    - **cartQuantity:** Si el carrito no está vacío, este método recorre todo el array cart y alamcena en una variable (que fue inicializada en 0) la suma de la propiedad quantity de cada elemento. Es importante recordar que la propiedad quantity es donde se alamcena la cantidad de cada producto que hay en el carrito. El método devuelve la cantidad total de productos que hay en el array cart.
    - **cartTotal:** Este método es muy similar al anterior, pero devuelve precio total en lugar de la cantidad total de productos del carrito. Multiplica el precio (almacenado en la propiedad price) de cada elemento del array por su cantidad (propiedad quantity) y luego lo suma al total acumulado en la variable "total".
    - **retrieveItemQty:** Este método recibe un Id y mediante el método .find() perimite encontrar un elemento dentro del array cart. Devuelve la propiedad quantity de dicho item. 

2. **Firebase:** Ubicado dentro de la carpeta services, el archivo firebase.js permite conenctar el proyecto con la base de datos que provee el servicio de Google Firestore donde se almacenan los productos de la tienda y la colección de órdenes de compra. Además de los datos necesarios para configurar el servicio, el archivo contiene 3 llamados a Firestore.
    - **retrieveProducts:** Este llamado recibe como argumento el Id de una categoría de productos (puede ser manga, comics o novelas) y devuelve una promesa con los productos de la tienda cuya categoría coincide con la pasada como argumento. En caso de que la categoría no esté definida se devolverá un array con todos los productos de la tienda.  
    - **retrieveProduct:** Este llamado a Firebase recibe como argumento el ID de un producto y devuelve una promesa con el producto cuyo Id coincide con el pasado por argumento. 
    - **retrieveCategory:** Este llamado busca en la base de datos la colección llamada "categories" y retorna una promesa con el array de categorías.  
    
3. **Archivo App.js:**
Este módulo contiene el primer componente del proyecto: App. El elemento contiene, a su vez, un componente NavbarCustom, un CartContextProvider y varios llamados a elementos de la librería react-router-dom que permiten establecer las rutas para navegar la aplicación. 
    - **CartContextProvider:** Es una de las funciones definidas en el archivo CartContext.js. El componente CartContextProvider se incluye en el archivo app.js pues es necesario envolver el nodo de React para permitir que sus hijos tengan acceso a los cambios del contexto (CartContext).
    - **NavbarCustom:** El componente NavbarCustom renderiza el menú de navegación superior. Contiene el nombre de la tienda virtual, que a su vez funciona como link al inicio de la aplicación, una lista con las tres categorías de productos disponibles en la tienda (cómics, manga y novelas gráficas) y un componente llamado CartWidget. A través del hook useContext (y el método cartQuantity), el CartWidget obtiene la cantidad de productos/ejemplares que hay en el carrito y, de ser distinta a cero, muestra el icono Cart4 con el número de copias agregadas a la orden de compra. 
    Por otro lado, el componente NavbarCustom utiliza el hook useState para setear las categorías obtenidas de la base de datos usando la función retrieveCategory. Luego se generan dinámicamente los botones con los nombres de las categorías y se incluye la clase text-decoration-none si el botón no está activo. De lo contrario el link se muestra subrayado. 
    - **BrowserRouter, Routes and Route:**  Son componentes necesarios para configurar las navegaciones y sus componentes asociados. Se definen las siguientes rutas: 
        - '/' que renderiza el componente ItemListContainer
        - '/category/:categoryId' que carga el mismo componente que la ruta anterior
        - '/item/:id' carga el detalle del producto de la tienda seleccionado
        - '/cart' renderiza una tabla con los productos que hay en el carrito
        - '/checkout' carga un formulario a llenar para confirmar la compra del carrito

4. **ItemListConatiner:** Este componente utiliza tres hooks: useState, useEffect y useParams. Con el useEffect se le indica al componente que, luego del renderizado inicial, deberá volver a cargar algunos componentes cuando obtenga los productos de la base de datos a través de la llamada a Firebase retrieveProducts(). Como parámetro, dicha función recibe el categoryId que se obtiene del hook useParams. Finalmente se setea el estado products con los productos obtenidos de la base de datos. Es importante recordar que si el categoryId es indefinido entonces se obtienen todos los productos de la tienda. 
Por otro lado, si el array de productos está vacío se renderiza el texto "cargando productos...", de lo contrario se llama al componente ItemList que recibe como argumento el array de productos.
    - **ItemList:** Este componente utiliza el método .map() para recorrer el array de productos recibido como argumento y, por cada elemento de dicha lista, invoca al componente Item que recibe un producto como argumento. 
    - **Item:** Este componente renderiza una card mostrando las propiedades del producto pasadas como parámetro. Cada elemento contiene, además, un botón con el componente Link (obtenido del react-router-dom) que redirecciona al componente ItemDetailContainer cuya función es mostrar el detalle del producto. 

5. **ItemDetailContainer:** Este componente, encargado de renderizar el contenedor de los detalles del producto,  utliza tres tipos de hooks: useState, para setear dos estados: loadingPage y product; useParams, para obtener el id del producto a cargar y useEffect, para indicarle a la aplicación que tiene que renderizar algunos componentes luego del render inicial.

El estado loadingPage se inicializa con el valor "true" de modo que cuando se renderice por primera vez este componente cargue el mensaje "Cargando detalles...". Luego, cuando la llamada retrieveProduct() obtiene el producto de la base de datos de Firebase cuyo id coincide con el valor obtenido con el hook useParams, el useEffect indica que se deben cargar nuevamente algunos componentes y, si el producto no puede ser encontrado renderiza un mensaje que le permite al usuario regresar a la página principal. De lo contraio se llama al componente ItemDetail que recibe como argumento el producto obtenido de la base de datos.  
    - **ItemDetail:** Este componente renderiza una card con el detalle del producto y obtiene los valores a mostrar de las propiedades del objeto product que recibe como argumento. Renderiza, también, el componente ItemCount (que será descripto más adelante) que recibe como parámetro el estado stock, el valor initial (que es 1 si hay stock o 0 si no hay) y la función addToCart().
    El estado stock se inicializa con el resultado de restarle al stock del producto la cantidad de dicho producto que hay en el carrito (valor obtenido del método retrieveItemQty() del CartContext). Es decir, si tengo 8 ejemplare de "Spiderman 11" en stock y 2 ejemplares ya fueron agregados al carrito, el estado stock se inicializará en 6 (8 - 2) pues aún tenemos 6 ejemplares disponibles para comprar. El estado quantity, por otro lado, se inicializa en 0 y su valor se setea usando la función addToCart().  
    Este método recibe como argumento un número que representa la cantidad de ejemplares de un producto que se quiere agregar al carrito. La función evalúa si la cantidad es mayor a cero y menor al stock disponible (almacenado en el estado stock), en cuyo caso se guarda un nuevo valor en el estado stock (stock - quantity), se actualiza el valor del estado quantity con la cantidad pasada como argumento al método addToCart, y se llama al método addItem obtenido del CartContext para sumar el nuevo objeto producto y su cantidad al array cart de productos. Cuando el estado quantity se modfica y es un valor mayor a cero el componente ItemCount es reemplazado por un botón "Finalizar compra" que lleva al resumen del carrito. 
    - **ItemCount:** Este componente utiliza un custom hook llamado useCounter que recibe los argumentos stock e init (pasados al componente ItemCount como argumentos). Además del estado number, se definen los métodos add y subtract. Adicionalmente, renderiza el contador llamado ItemCount que, cuando cuando se hace click en el botón +, invoca el método add y el botón - invoca el método subtract. Finalmente, cuando se hace click sobre el botón agregar al carrito el evento ejecuta la función addToCart, pasada como argumento, que recibe como parámetro el valor almacenado en el estado number y que representa la cantidad de ejemplares a agregar (y que en en componenete itemDetail serán seteados en el estado quantity). 

6. **Cart:** El componente Cart utiliza los métodos cartTotal(), cart y clear() obtenidos del CartContext mediante el uso del hook useContext. Si el array cart está vacío entoces el componente renderiza un mensaje con un link al inicio de la aplicación pues esto implica que no hay productos en el carrito. De lo contrario crea una tabla con un encabezado y pie, pero sin los elementos o filas. Para renderizar estos elementos utiliza el método .map() para recorrer el array cart y llamar, por cada producto, al componente ItemCart. 
Además, se renderizan dos botones: Confirmar compra, que lleva al formulario para completar los datos personales, y Vaciar carrito, cuyo evento onCLick() desencadena el método clear() para eliminar todos los productos del array cart. Se renderiza, finalmente, un elemento que muestra el total del carrito obtenido del método cartTotal(). 
    - **ItemCart:** Este componente renderiza las filas de la tabla que se genera en el componente Cart. Recibe como argumento un objeto producto y utiliza el método removeItem() del CartContext en la función removeFromCart() cuando es invocada por el evento onClick() del botón X. 

7. **CheckoutForm:** Este componente inicializa el estado processingOrder en false y si, además, el array cart está vacío, entonces renderiza un mensaje para volver al inicio pues no se puede realizar una compra sin productos en el carrito. Por otro lado, si el array cart no está vacío y el estado processingOrder sigue siendo false, entoces rendariza un formulario para obtener los datos del usuario: nombre, apellido, teléfono y mail. Los valores ingresados se validan con los métodos emailValidation (que evalúa si ambos mails ingresados son iguales y si cumplen con el formato de una dirección de mail) y dataValidation (que evalúa si todos los campos contienen algún valor y si cumplen con el formato requerido para dichos valores). Se setean en un estado llamado value con la función handleInput y luego se usan en el método confirmOrder(). Por el contrario, si el estado processingOrder es true, entoces se muestra el mensaje "Procesando la orden de compra...".

El método confirmOrder(), que es invocado por el evento onClick() del botón "Finalizar compra" del formulario, declara un objeto order cuyas propiedades son buyer (que contiene los valores seteados en handleInput), items (que contiene el array cart), total (que obtiene el total del carrito con el método cartTotal()) y date (que se define utilizando el componente Timestamp de Firebase).

Luego, si la validación de datos fue exitosa, se procede a generar un array vacío, llamado noStockAvailable, y un array ids que contiene todos los ids de los productos del carrito almacenados en la propiedad items del objeto order. Se declara una promesa que obtiene los productos de la base de datos cuyo id coincide con el de los productos en la lista de ids. Entonces, se evelúa si el stock en la base de datos es mayor o igual a la cantidad de producto que se desea comprar. En caso afirmativo se actualiza el stock en la base de datos. De lo contrario, se agrega el producto al array noStockAvailable. 

Finalmente, se procede a evaluar si el array noStockAvailable está vacío, en cuyo caso se realiza un commit para agregar el objeto order a la base de datos en Firebase (en la colección orders), se vacía el estado cart del CartContext, se muestra la confirmación de la compra con un mensaje que contiene el id de la orden y se navega al inicio de la app usando la instrucción navigate.

Si el array noStockAvailable contiene algún elemento se devuelve un mensaje con el nombre del producto que está en falta, se borran los elementos del carrito y se navega una vez más a la página principal.      
En el caso de que los valores introducidos en el formulario no sean válidos se devuelven dos mensajes de error distintos: si no coinciden los emails se llama la atención sobre este error, de lo contrario, se pide que revisen los datos ya que alguno de los ingresados no es correcto. 