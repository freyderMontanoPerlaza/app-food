
function iniciarApp() {

    const seleectCategorias = document.querySelector('#categorias');

    obtebnerCategorias();

    //Obtener las categorias
    function obtebnerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url).then(respuesta => respuesta.json())
            .then(resultado => mostrarCategorias(resultado.categories));//categories el nombre de mi enpoint
    }


    //tome el resultado de las categorias
    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria =>{
            //generar las opciones
            const  {strCategory} = categoria;
            const option = document.createElement('OPTION');
            option.value = strCategory;
            option.textContent = strCategory;

            //agregar los elementos a nuestro formulario
            seleectCategorias.appendChild(option);

        })
    }


}




//Iniciar app
document.addEventListener('DOMContentLoaded', iniciarApp);