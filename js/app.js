
function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

    //inyectamos el id de resultados
    const resultado = document.querySelector('#resultado')


    obtenerCategorias();


    //Obtener las categorias
    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url).then(respuesta => respuesta.json())
            .then(resultado => mostrarCategorias(resultado.categories));//categories el nombre de mi enpoint
    }


    //obtener el resultado de las categorias
    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const option = document.createElement('OPTION');
            const {strCategory} = categoria;
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        })
    }

    //recuperar la seleccion del usuario
    //y poner el segundo endpoints
    function seleccionarCategoria(e) {
        const categoria = (e.target.value);
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarRecetas(resultado.meals))
    }


    //mostrar recetas
    function mostrarRecetas(recetas = []){
        
        //iterar los resultados
        recetas.forEach(receta =>{
            const {idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card','mb-4');


            //crear la imagen
            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la recta ${strMeal}`;
            recetaImagen.src = strMealThumb;

            //crear descripcion
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            //crear titulo
            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            //crear el bottom
            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';


            //ahora pasamos a inyectar en el codigo HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);

        });
    }

}




//Iniciar app
document.addEventListener('DOMContentLoaded', iniciarApp);