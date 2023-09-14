
function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);
    const resultado = document.querySelector('#resultado');
    const modal = new bootstrap.Modal('#modal', {});



    obtenerCategorias();

    //inyectamos el id de resultados



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
            const { strCategory } = categoria;
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
    function mostrarRecetas(recetas = []) {

        //function limpiar html
        limpiarCodigoHtml(resultado);

        //crear resultado
        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No Hay resultado';
        resultado.appendChild(heading);





        //iterar los resultados
        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');


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
            //ventana modal
            //recetaButton.dataset.bsTarget = "#modal";
            //recetaButton.dataset.bsToggle = "modal";
            recetaButton.onclick = function () {
                seleccionarRecetaPorId(idMeal);
            }


            //ahora pasamos a inyectar en el codigo HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);

        });
    }


    //funcion seleccionar recetas por el id en base a la solucion del usuario
    function seleccionarRecetaPorId(id) {
        const url = ` https://themealdb.com/api/json/v1/1/lookup.php?i=${id} `;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]));
    }

    function mostrarRecetaModal(receta) {

        const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

        //añadir contenido al modal
        const modalTiltle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTiltle.textContent = strMeal;
        modalBody.innerHTML = ` 
        <img class="img-fluid" src="${strMealThumb}" alt="receta  ${strMeal}" /> 
        <h3 class="my-3">Instrucciones</h3>  
        <p>${strInstructions}</p>
        <h3 class="my-3">Ingredientes y Cantidades</h3>  
        `;




        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        //iterar Ingredientes
        for (let i = 1; i <= 20; i++) {

            if (receta[`strIngredient${i}`]) {
                const ingredientes = receta[`strIngredient${i}`];
                const cantidad = receta[`strIngredient${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingredientes} - ${cantidad}`;

                listGroup.appendChild(ingredienteLi);
            }
        }

        modalBody.appendChild(listGroup);


        const modalFooter = document.querySelector('.modal-footer');
        limpiarCodigoHtml(modalFooter);





        //Botones de cerrar y favorito
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = 'Guardar Favorito';


        btnFavorito.onclick = function () {

            if(existeEnLocalStorage(idMeal)){
                return
            }
            
            agregarComidaFavorita({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb
            });
        }




        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';

        //function cerrar
        btnCerrarModal.onclick = function () {
            modal.hide();
        }


        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);





        //mostrar el modal
        modal.show();
    }



    //function agregar Favorito
    function agregarComidaFavorita(objecReceta){
       const favoritos =  JSON.parse(localStorage.getItem('favoritos')) ?? [];
       localStorage.setItem('favoritos', JSON.stringify([...favoritos, objecReceta]));
    }

    //registro duplicados
    function existeEnLocalStorage(id){
        const favoritos =  JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }




    //limpiar los resultado de la consulta
    function limpiarCodigoHtml(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}






//Iniciar app
document.addEventListener('DOMContentLoaded', iniciarApp);