import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){ 
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        
        //console.log(urlProyecto);
        Swal.fire({
            title: 'Vas a borrar el proyecto?',
            text: "Esta accion es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero borrarlo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                //Envio peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                // console.log(url);
                axios.delete(url, { params: {urlProyecto}})
                .then(function(respuesta){
                    console.log(respuesta);
                    Swal.fire(
                        'Borrado!',
                        respuesta.data,
                        'success'
                    );
                        //Redirecciono despues de confirmar
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000);
                })
                .catch(() => {
                    Swal.fire({
                        type:'error',
                        title:'Hubo un error',
                        text:'No se pudo eliminar el Proyecto'
                    })
                })
            }
        })
    })
}
export default btnEliminar;