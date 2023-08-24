document.getElementById("formulario").addEventListener("submit", function (e) {
   e.preventDefault();
   const estudiante = document.getElementById("tab1").value;
   const nota = document.getElementById("tab2").value;
   console.log(estudiante);
   console.log(nota);
   var contenido;
   if (localStorage.getItem("contenido") == null) {
      console.log("algo anda mal");
      contenido = [];
   } else {

      contenido = JSON.parse(localStorage.getItem("contenido"));
      console.log("Aqui creo que bien");
      contenido.push({
         estudiante: estudiante,
         nota: nota
      });

   }
   localStorage.setItem("contenido", JSON.stringify(contenido));
   console.log("Aqui creo que bien");
   visualizar();
});

function visualizar() {
   var contenido;
   if (localStorage.getItem("contenido") == null) {
      console.log("noo hay nada");
      contenido = [];
   } else {
      contenido = JSON.parse(localStorage.getItem("contenido"));
      console.log(contenido);
      var bloque = "";
      contenido.forEach(function (element, index) {
         console.log(element.estudiante);
         console.log(element.nota);
         bloque += "<tr>";
         bloque += "<td>" + element.estudiante + "</td>";
         bloque += "<td>" + element.nota + "</td>";
         bloque += "<td>" + index + "</td>";
         bloque += '<td> <button onclick="Delete(' + index + ')" class="btn btn-danger">Delete</button> <button onclick="Update(' + index + ')" class="btn btn-primary">Update</button> </td>';
         bloque += "</tr>";
      });
      document.getElementById("resultados").innerHTML = bloque;
   }


}
function Delete(index) {
   var contenido;
   if (localStorage.getItem("contenido") == null) {
      console.log("noo hay nada");
      contenido = [];
   } else {
      contenido = JSON.parse(localStorage.getItem("contenido"));
      contenido.splice(index, 1);

   }
   localStorage.setItem("contenido", JSON.stringify(contenido));
   visualizar();
}

function Update(index) {
   var contenido;
   if (localStorage.getItem("contenido") == null) {
      console.log("noo hay nada");
      contenido = [];
   } else {
      contenido = JSON.parse(localStorage.getItem("contenido"));
      const name = contenido[index].estudiante;
      const nota = contenido[index].nota;
      console.log(name);
      console.log(nota);
      document.getElementById("tab1").value = name;
      document.getElementById("tab2").value = nota;
      document.getElementById("botonactualizar").onclick = function () {
         const estudiante = document.getElementById("tab1").value;
         const nota = document.getElementById("tab2").value;
         contenido[index] = ({
            estudiante: estudiante,
            nota: nota
         });
         localStorage.setItem("contenido", JSON.stringify(contenido));
         visualizar();
      };
   }
}


visualizar();

async function verdatos() {
   const url = 'http://127.0.0.1:8000';
    await fetch(url + '/api/verplataforma')
         .then(res => res.json())
         .then(data => mostrardatos(data));

}
const mostrardatos = (data) => {
   console.log(data.data.plataformas);
   let variable=data.data.plataformas;
    var body = '';
    
    for (let i = 0; i < variable.length; i++) {
       body += `<tr><td>${variable[i].id}</td><td>${variable[i].NombrePlataforma}</td><td>${variable[i].Procesador}</td></tr>`;
    }
    document.getElementById('data').innerHTML = body;
    console.log("pase por ahí");

}

// let url = "http://127.0.0.1:8000/api/verplataforma";

// const obtenerUsaurios = async () => {
//   try {
//     let response = await fetch(url);

//     if(!response.ok)
//     {
//         throw new Error("Ourrio un Error al realizar la petición")
//     }

//     let data = await response.json();
//     let plataformasArray = data.data.plataformas;


//     pintarUsuarios(plataformasArray);

//   } catch (error) 
//   {
//     console.log(error);
//   }
// };


// obtenerUsaurios();

// const pintarUsuarios = (data) => 
// {
//    console.log(data);
//   let body = "";
//   for (let i = 0; i < data.length; i++) 
//   {
//    //  body += `<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`;
//     body += `<tr><td>${data[i].id}</td><td>${data[i].NombrePlataforma}</td><td>${data[i].Procesador}</td></tr>`;
//   }

//   document.getElementById("data").innerHTML = body;
// };

