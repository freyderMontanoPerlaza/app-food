
function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);


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
        console.log(url);
    }

}




//Iniciar app
document.addEventListener('DOMContentLoaded', iniciarApp);