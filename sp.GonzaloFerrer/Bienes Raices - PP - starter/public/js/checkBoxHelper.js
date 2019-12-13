//  function crearBoxes(array, seccion) {
//      var divBox = document.getElementById(seccion);
//      for (atributo in array[0]) {
//          if (atributo != "id") {
//              let div = document.createElement("div");
//              div.classList.add("box");
//              let labelA = document.createElement("label");
//              labelA.htmlFor = "chk" + atributo;
//              labelA.appendChild(document.createTextNode(atributo));
//              let checkbox = document.createElement("input");
//              checkbox.type = "checkbox";
//              checkbox.name = "chk" + atributo;
//              checkbox.id = "chk" + atributo;
//              checkbox.value = atributo;
//              checkbox.checked = true;
//              checkbox.onclick = filtrarDatos;
//              div.appendChild(labelA);
//              div.appendChild(checkbox);
//              divBox.appendChild(div);
//          } else {
//              let div = document.createElement("div");
//              divBox.appendChild(div);
//          }
//      }
//      return divBox;
//  }

 function crearBoxes(array, seccion) {
     var divBox = document.getElementById(seccion);
     for (atributo in array[0]) {
         if (atributo != "id" && checkType(atributo) == '0' && atributo != 'constructor') {
             let div = document.createElement("div");
             div.classList.add("form-check");
             div.classList.add("box");
             let labelA = document.createElement("label");
             labelA.htmlFor = "chk" + atributo;
             labelA.appendChild(document.createTextNode(atributo));
             let checkbox = document.createElement("input");
             checkbox.type = "checkbox";
             checkbox.name = "chk" + atributo;
             checkbox.id = "chk" + atributo;
             checkbox.value = atributo;
             checkbox.checked = true;
             checkbox.onclick = filtrarDatos;
             div.appendChild(labelA);
             div.appendChild(checkbox);
             divBox.appendChild(div);
         } else {
             let div = document.createElement("div");
             divBox.appendChild(div);
         }
     }
     return divBox;
 }