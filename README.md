<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Dogs

<p align="left">
  <img height="200" src="./dog.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node, Sequelize y Postgres.
- Afirmar y conectar los conceptos aprendidos en la carrera de Soy Henry.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.


## Enunciado

La idea general es crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

  - Buscar perros
  - Filtrarlos / Ordenarlos
  - Agregar nuevos perros

__Ruta principal__: Contiene
- [ ] Input de búsqueda para encontrar razas de perros por nombre
- [ ] Área donde se verá el listado de razas de perros. Deberá mostrar su:
  - Imagen
  - Nombre
  - Temperamento
- [ ] Botones/Opciones para filtrar por por temperamento y por raza existente o agregada por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por orden alfabético y por peso
- [ ] Paginado para ir buscando y mostrando las siguientes razas


__Ruta de detalle de raza de perro__: Contiene
- [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- [ ] Altura
- [ ] Peso
- [ ] Años de vida

__Ruta de perros Favoritos__: Contiene
- [ ] Todos los perros agregados a fovoritos y la opción de eliminarlos de esta ruta.


__Ruta de creación de raza de perro__: Contiene
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Altura (Diferenciar entre altura mínima y máxima)
  - Peso (Diferenciar entre peso mínimo y máximo)
  - Años de vida
- [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
- [ ] Botón/Opción para crear una nueva raza de perro

#### Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- [ ] Raza con las siguientes propiedades:
  - ID *
  - Nombre *
  - Altura *
  - Peso *
  - Años de vida
- [ ] Temperamento con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que una raza de perro puede tener varios "temperamentos" en simultaneo y, a su vez, un "temperamento" puede corresponder a múltiples razas de perro distintas. Por ejemplo la raza `pug` es docil, inteligente y sociable (entre otras). Pero a su vez existen otras razas de perro que también son sociables o inteligentes.


#### Backend

Se desarrolló un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /dogs__:
  - Obtiene un listado de las primeras 8 razas de perro
  
- [ ] __GET /dogs?name="..."__:
  - Obtiene un listado de las primeras 8 razas de perro que contengan la palabra ingresada como query parameter
  
- [ ] __GET /dogs/{idRaza}__:
  - Obtiene el detalle de una raza de perro en particular
  - Incluye los temperamentos asociados

- [ ] __GET /temperament__:
  - Obtiene todos los temperamentos posibles

- [ ] __POST /dog__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
  - Crea una raza de perro en la base de datos


