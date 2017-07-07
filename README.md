Objetivos:
----------
La finalidad de esta página, es simular una búsqueda de hoteles. El usuario tiene que poder ingresar los parámetros de su reserva en la caja de búsqueda, y al hacer click en “Buscar”, los resultados deberán mostrarse en la misma página, sin hacer una recarga completa del documento principal (debe funcionar como una “Single Page Application”), realizando un request Ajax a un servicio ficticio de búsqueda de hoteles. Esta página también tiene que implementar un filtro por cantidad de estrellas, para permitirle al usuario mostrar/ocultar, los hoteles según este parámetro. Si lo considera necesario, se pueden usar bibliotecas o frameworks desarrollados por terceros (JQuery, Angular, React, Backbone, Mustache, Handlebars, Grunt, Gulp, WebPack, etc.). Se valorará si se aclaran los motivos para la elección las librerías o frameworks usados. Para este ejercicio, no es necesario implementar el servicio que responda los requests Ajax con los resultados de las búsquedas. Por lo que se pueden usar servicios como [http://myjson.com/](http://myjson.com/) que permiten subir JSONs consumibles via Ajax.


Requerimientos:
---------------
Validaciones de la caja de búsqueda:

- Validar que los campos no estén vacíos.
- Validar que las fechas ingresadas sean válidas (formato “dd/mm/aaaa”).
- Validar que la fecha de entrada sea menor a la de salida.
- Validar que la fecha de entrada sea dentro de los próximos 365 dias.
- Validar que la fecha de salida, esté dentro de los 30 días posteriores a la fecha de entrada.
- Validar que la cantidad total de huéspedes (adultos + menores) no sea mayor a 8, y que por lo menos haya un adulto por habitación (que la cantidad de adultos no sea menor que la de habitaciones)

Funcionamiento general:
-----------------------

Al hacer click en “Buscar”, se deben realizar las validaciones de los datos ingresados, y si estos contienen errores, mostrárselos al usuario para que los corrija. Si los datos ingresados son correctos realizar un request Ajax con los parámetros ingresados por el usuario, y mostrar los resultados.

Al seleccionar diferentes opciones en el filtro de estrellas, se deberán actualizar los resultados con los parámetros seleccionados.

Obtención de hoteles:

El formato utilizado para el servicio de hoteles, deberá ser JSON. Como se comenta en la introducción, para simular el servicio que responderá a las búsquedas, se pueden usar servicios como [http://myjson.com/](http://myjson.com/). En el caso de MyJson, los parámetros QueryString que le enviemos serán ignorados por este, por lo que siempre se retornará el mismo resultado, pero igual es importante que se envíen correctamente los parámetros, ya que es parte de lo que se evaluará en el examen.

El formato de la url para los request Ajax deberá ser el siguiente:

    https://[dominio]/[path del servicio]?origin=[ciudad de origen]&start=[fecha de entrada con el formato: “aaaa-mm-dd”]&end=[fecha de salida con el formato: “aaaa-mm-dd”]&rooms=[cantidad de habitaciones]&adults=[cantidad de adultos]&minors=[cantidad de menores]

Ej:
> https://api.myjson.com/bins/keb4h?origin=Buenos+Aires&start=2017-06-25&end=2017-07-02&rooms=2&adults=3&minors=1

La respuesta del servicio tendrá el siguiente formato:

    [
      {
        "id":12345,
        "name":"Unique Excecutive Chateau",
        "rating":7.6,
        "stars":4,
        "recomendations":"80%",
        "availableRooms":2,
        "availabilityTime":"2:20",
        "freeCancelation":true,
        "price":1162.57,
        "oldPrice":2113.77,
        "distanceFromDowntown":1350
      },
      {
        "id":12346,
        "name":"Two Hotel Buenos Aires",
        "rating":8.1,
        "stars":3,
        "recomendations":"85%",
        "availableRooms":null,
        "availabilityTime":null,
        "freeCancelation":true,
        "price":925.93,
        "oldPrice":1234.58,
        "distanceFromDowntown":1350
      },
      {
        "id":12347,
        "name":"Aspen Suites Hotel",
        "rating":7.9,
        "stars":3,
        "recomendations":"82%",
        "availableRooms":1,
        "availabilityTime":null,
        "freeCancelation":true,
        "price":1233.02,
        "oldPrice":null,
        "distanceFromDowntown":987
      }
    ]


Solución
--------
La página fue desarrollada en JavaScript utilizando como soporte la biblioteca ReactJS. Se eligió utilizar ReactJS para poder dividir la página en componentes y aprovechar la reutilización de los mismos. Además de esto, también facilita el desarrollo de aplicaciones de tipo Single Web Application (pedido como requerimiento).
Junto con ReactJS se utilizaron las siguientes librerias para simplificar funcionalidades específicas:

 - `react-datepicker`: Para implementar un selector de fechas en los campos Entrada y Salida.
 - `superagent`: Para realizar llamadas AJAX.
 - `moment`: Para el manejo de fechas.
 - `react-addons-css-transition-group`: Para realizar animaciones.
 - `halogen`: Para implementar un loader que aparece mientras se buscan los resultados de la busqueda.
 - `rc-collapse`: Para implementar un acordeón.

Para el maquetado se utilizó Bootstrap para facilitar el diseño responsive. Se utilizaron también iconos de Font Awesome.

Instalación
-----------
Dentro de los archivos se encuentran por un lado el código fuente y por otro lado la aplicación empaquetada (dentro de la carpeta build). Para correr la aplicación se puede utilizar cualquier servidor estático.

En mi caso utilicé `npm` y `serve`.
Pasos para la instalación de `npm` y `serve`:
1. Instalar NodeJS (puede ser descargado de acá [https://nodejs.org/es/](https://nodejs.org/es/)).
2. Correr el comando `npm install -g serve` para instalar serve.
3. Ingresar a la carpeta build y correr el comando `serve -s`.
4. Ingresando a la dirección indicada en consola se podrá utilizar la aplicación (corre por defecto en [http://localhost:5000/](http://localhost:5000/)).