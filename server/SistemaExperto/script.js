let bancoDatos;

import FormatDB from "./FormatDB.js";

export async function cargarBD() {
  try {
    bancoDatos = await FormatDB();
  } catch (error) {
    console.log("Error cargando banco de datos: ", error);
  }
}
cargarBD();

//----------------------------------Reglas del Sistema Experto------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const reglasTemperatura = [
  {
    condicion: (lugar) => lugar.temperatura < 16,
    respuesta:
      "Si prefieres temperaturas más frescas, podrías explorar lugares como ",
  },
  {
    condicion: (lugar) => lugar.temperatura >= 35,
    respuesta:
      "Te recomendaría visitar lugares con temperaturas muy altas, como ",
  },
  {
    condicion: (lugar) => lugar.temperatura >= 16 && lugar.temperatura <= 34,
    respuesta:
      "Te recomendaría visitar lugares con temperaturas cálidas, como ",
  },
];

const reglasSinonimosClima = [
  {
    condicion: (sinonimo) =>
      ["frio", "fria", "helado", "helada", "baja", "bajo"].includes(sinonimo),
    respuesta: 22,
  },
  {
    condicion: (sinonimo) =>
      [
        "calida",
        "calido",
        "templado",
        "caliente",
        "caluroso",
        "alta",
        "alto",
      ].includes(sinonimo),
    respuesta: 23,
  },
];

const reglasUbicacion = [
  {
    condicion: (sinonimo) =>
      [
        "cerca",
        "cercano",
        "cercana",
        "centrico",
        "centrica",
        "dentro",
        "adentro",
      ].includes(sinonimo),
    respuesta: 15,
  },
  {
    condicion: (sinonimo) =>
      [
        "lejos",
        "alejado",
        "alejada",
        "fuera",
        "afueras",
        "lejano",
        "lejana",
        "apartado",
        "apartada",
        "alejada",
      ].includes(sinonimo),
    respuesta: 16,
  },
];

// Obtener la respuesta de la entrada del usuario
export default function obtenerRespuesta(userInput) {
  // Manda a llamar a la función de procesamiento de entrada del usuario
  let recomendacion = procesarConsulta(userInput);

  return recomendacion;
}

function estadosSinonimo(consulta) {
  let consultaMin = consulta.toLowerCase();
  // Sinonimos
  var quintanaRoo = ["cancun", "tulum", "playa del carmen", "chetumal"];
  var jalisco = ["guadalajara", "gdl"];
  // se remplaza la plabra por el estado (ejemplo: cancun -> quintana roo)
  if (quintanaRoo.some((palabra) => consulta.includes(palabra))) {
    //Quintana Roo
    for (var i = 0; i < quintanaRoo.length; i++) {
      var palabra = quintanaRoo[i];
      consultaMin = consultaMin.replace(
        new RegExp(palabra, "gi"),
        "quintana roo"
      );
    }
    return consultaMin;
  } else if (jalisco.some((palabra) => consulta.includes(palabra))) {
    //Jalisco
    for (var i = 0; i < jalisco.length; i++) {
      var palabra = jalisco[i];
      consultaMin = consultaMin.replace(new RegExp(palabra, "gi"), "jalisco");
    }
    return consultaMin;
  }
}

//Procesa el input del usuario (consulta es lo que puso el usuario)
function procesarConsulta(consulta) {
  // Convertir la consulta a minúsculas para hacerla insensible a mayúsculas
  let consultaMin = consulta
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  var palabrasPermitidas = [
    "cancun",
    "tulum",
    "playa del carmen",
    "guadalajara",
    "gdl",
    "chetumal",
  ]; // lista de sinonimos de estados
  if (palabrasPermitidas.some((palabra) => consultaMin.includes(palabra))) {
    // Si tiene un sinonimo se remplaza por el estado
    consultaMin = estadosSinonimo(consultaMin);
  }
  // Verificar si la consulta se refiere a playas o lagos
  if (
    consultaMin.includes("lugar") ||
    consultaMin.includes("lugares") ||
    consultaMin.includes("sitios") ||
    consultaMin.includes("sitio")
  ) {
    return obtenerInformacionLugar(consultaMin);
  } else if (consultaMin.includes("playa") || consultaMin.includes("playas")) {
    return obtenerInformacionPlaya(consultaMin);
  } else if (
    consultaMin.includes("lago") ||
    consultaMin.includes("lagos") ||
    consultaMin.includes("laguna") ||
    consultaMin.includes("lagunas")
  ) {
    return obtenerInformacionLago(consultaMin);
  } else {
    return "Lo siento, no puedo responder a esa pregunta. ¿Puedes preguntar solamente sobre lugares playas o lagos?";
  }
}

function obtenerInformacionLugar(consulta) {
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre lugares
  const lugaresEnEstado = bancoDatos.lugares[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto un lugar sin estado en específico, devuelve un lugar aleatorio. ejemplo: dime un lugar
  if (!lugaresEnEstado) {
    const estadosConLugares = Object.keys(bancoDatos.lugares);
    let estadoAleatorio =
      estadosConLugares[Math.floor(Math.random() * estadosConLugares.length)];
    let lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
    if (ubicacion == 16) {
      // Ubicacion lejana
      let ubicacionesLejanas = lugaresEnEstado.filter(
        (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
      );
      let hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLugares[
            Math.floor(Math.random() * estadosConLugares.length)
          ];
        //console.log(estadoAleatorio);
        lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        ubicacionesLejanas = lugaresEnEstado.filter(
          (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
        );
        hastaQueEncuentreUnEstado = ubicacionesLejanas.length;
      }
      // Seleccionar un lugar aleatorio entre los lugares lejanos
      const lugarSeleccionado =
        ubicacionesLejanas[
          Math.floor(Math.random() * ubicacionesLejanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    } else if (ubicacion == 15) {
      // Ubicacion cercana
      let ubicacionesCercanas = lugaresEnEstado.filter(
        (lugar) => lugar.ubicacionCentroCiudad <= ubicacion
      );
      let hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLugares[
            Math.floor(Math.random() * estadosConLugares.length)
          ];
        //console.log(estadoAleatorio);
        lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        ubicacionesCercanas = lugaresEnEstado.filter(
          (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
        );
        hastaQueEncuentreUnEstado = ubicacionesCercanas.length;
      }
      // Seleccionar un lugar aleatorio entre los lugares cercanos
      const lugarSeleccionado =
        ubicacionesCercanas[
          Math.floor(Math.random() * ubicacionesCercanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    if (clima == 23) {
      // temperatura caliente
      let lugaresCalientes = lugaresEnEstado.filter(
        (lugar) => lugar.temperatura >= clima
      );
      let hastaQueEncuentreUnEstado = lugaresCalientes.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLugares[
            Math.floor(Math.random() * estadosConLugares.length)
          ];
        //console.log(estadoAleatorio);
        lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        lugaresCalientes = lugaresEnEstado.filter(
          (lugar) => lugar.temperatura >= clima
        );
        hastaQueEncuentreUnEstado = lugaresCalientes.length;
      }
      // Seleccionar un lugar caleinte entre los lugares calientes
      const lugarSeleccionado =
        lugaresCalientes[Math.floor(Math.random() * lugaresCalientes.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    } else if (clima == 22) {
      // temperatura fria
      let lugaresFrios = lugaresEnEstado.filter(
        (lugar) => lugar.temperatura <= clima
      );
      let hastaQueEncuentreUnEstado = lugaresFrios.length;
      console.log(lugaresFrios.length);
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLugares[
            Math.floor(Math.random() * estadosConLugares.length)
          ];
        //console.log(estadoAleatorio);
        lugaresEnEstado = bancoDatos.lugares[estadoAleatorio];
        lugaresFrios = lugaresEnEstado.filter(
          (lugar) => lugar.temperatura >= clima
        );
        hastaQueEncuentreUnEstado = lugaresFrios.length;
      }
      // Seleccionar un lugar aleatorio entre los lugares frios
      const lugarSeleccionado =
        lugaresFrios[Math.floor(Math.random() * lugaresFrios.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoAleatorio}`;
    }
    const lugarAleatorio =
      lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    return `Te recomendaría visitar ${lugarAleatorio.nombre} en ${estadoAleatorio}`;
  } else {
    if (clima == 23) {
      //aqui entra si se busco un lugar con clima caliente con estado, ejemplo: dime una lugar caliente en colima
      const lugaresCalientes = lugaresEnEstado.filter(
        (lugar) => lugar.temperatura >= clima
      );
      if (lugaresCalientes.length === 0) {
        return "No hay lugares con temperatura mayor a 23 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima caliente, ejemplo: dime un lugar caliente y lejos en colima
        const ubicacionesLejanas = lugaresCalientes.filter(
          (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo lugares calientes y lejos de la ciudad (mas de 16 km) para recomendar en este estado.";
        }
        // Seleccionar un lugar aleatorio entre los lugares calientes y lejanos
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];

        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        // Ubicacion cercana en clima caliente, ejemplo: dime un lugar caliente y cerca en colima
        const ubicacionesCercanas = lugaresCalientes.filter(
          (lugar) => lugar.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay lugares cercanos de la ciudad y calientes a 15km a la redonda.";
        }
        // Seleccionar una lugar aleatorio entre las lugares calientes y cercanos
        const lugarSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar un lugar aleatorio entre los lugares solo calientes
      const lugarSeleccionado =
        lugaresCalientes[Math.floor(Math.random() * lugaresCalientes.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    } else if (clima == 22) {
      //aqui entra si se busco un lugar con clima frio con estado, ejemplo: dime una lugar frio en colima
      const lugaresFrios = lugaresEnEstado.filter(
        (lugar) => lugar.temperatura <= clima
      );
      if (lugaresFrios.length === 0) {
        return "No hay lugares con temperatura menor a 22 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima frio, ejemplo: dime un lugar frio y lejos en colima
        const ubicacionesLejanas = lugaresFrios.filter(
          (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo lugares frios y lejos de la ciudad (mas de 16 km) para recomendar en este estado.";
        }
        // Seleccionar un lugar aleatro entre los lugares frios y lejanos
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        // Ubicacion cercana en clima frio, ejemplo: dime un lugar frio y cerca en colima
        const ubicacionesCercanas = lugaresFrios.filter(
          (lugar) => lugar.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay lugares cercanos de la ciudad y frios a 15km a la redonda.";
        }
        // Seleccionar un lugar aleatro entre los lugares frios y cercanos
        const lugarSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar un lugar aleatrio entre lugares solo frios
      const lugarSeleccionado =
        lugaresFrios[Math.floor(Math.random() * lugaresFrios.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    if (ubicacion == 16) {
      //SOLO LUGAR CON UBICACION LEJANA
      const ubicacionesLejanas = lugaresEnEstado.filter(
        (lugar) => lugar.ubicacionCentroCiudad >= ubicacion
      );
      if (ubicacionesLejanas.length === 0) {
        return "No tengo lugares lejanos (mas de 16 km) para recomendar en este estado.";
      }
      // Seleccionar un lugar aleatrio entre los lugares lejanos
      const lugarSeleccionado =
        ubicacionesLejanas[
          Math.floor(Math.random() * ubicacionesLejanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    } else if (ubicacion == 15) {
      //SOLO LUGAR CON UBICACION CERCANA
      const ubicacionesCercanas = lugaresEnEstado.filter(
        (lugar) => lugar.ubicacionCentroCiudad <= ubicacion
      );
      if (ubicacionesCercanas.length === 0) {
        return "No hay lugares cercanos a 15km a la redonda.";
      }
      // Seleccionar una lugar aleatrio entre los lugares cercanos
      const lugarSeleccionado =
        ubicacionesCercanas[
          Math.floor(Math.random() * ubicacionesCercanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    const lugarSeleccionado =
      lugaresEnEstado[Math.floor(Math.random() * lugaresEnEstado.length)];
    return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
  }
}

// Función para obtener información cuando en la consulta hay alguna playa
function obtenerInformacionPlaya(consulta) {
  const pregEstado = buscarEstado(consulta);
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);
  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const playasEnEstado = bancoDatos.playas[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!playasEnEstado) {
    //En consulta: Si hay estado pero no hay playas en ese estado seleccionado
    const estadosConPlayas = Object.keys(bancoDatos.playas);
    let estadoAleatorio =
      estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];
    let playasEnEstado = bancoDatos.playas[estadoAleatorio];
    if (clima == 23) {
      //aqui entra si se busco una playa con clima caliente, sin especificar el estado, ejemplo: dime una playa caliente
      let playasCalientes = playasEnEstado.filter(
        (playa) => playa.temperatura >= clima
      );

      let hastaQueEncuentreUnEstado = playasCalientes.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];

        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasCalientes = playasEnEstado.filter(
          (playa) => playa.temperatura >= clima
        );
        hastaQueEncuentreUnEstado = playasCalientes.length;
      } // Seleccionar una playa aleatoria entre las playas calientes
      const playaSeleccionada =
        playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      if (pregEstado !== "undefined") {
        // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria
        return `No hay playas calientes en este estado, pero te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      } else {
        return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }
    } else if (clima == 22) {
      //aqui entra si se busco una playa con clima frio, sin especificar el estado, ejemplo: dime una playa fria
      let playasFrias = playasEnEstado.filter(
        (playa) => playa.temperatura <= clima
      );
      let hastaQueEncuentreUnEstado = playasFrias.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConPlayas[Math.floor(Math.random() * estadosConPlayas.length)];

        playasEnEstado = bancoDatos.playas[estadoAleatorio];
        playasFrias = playasEnEstado.filter(
          (playa) => playa.temperatura >= clima
        );
        hastaQueEncuentreUnEstado = playasFrias.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada =
        playasFrias[Math.floor(Math.random() * playasFrias.length)];
      if (pregEstado !== "undefined") {
        // Si quiere una playa fria en un estado y no hay, le     recomienda una aleatoria
        return `No hay playas frias en este estado, pero te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      } else {
        return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoAleatorio}`;
      }
    } //Si en consulta: No hay estado ni menciona el clima, entonces busca una playa aleatoria
    const playaAleatoria =
      playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    if (pregEstado !== "undefined") {
      // Si quiere una playa en un estado y no hay, le recomienda una aleatoria
      return `No hay playas en este estado, pero te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}`;
    } else {
      return `Te recomendaría visitar ${playaAleatoria.nombre} en ${estadoAleatorio}`;
    }
  } else {
    // if (playasEnEstado) SI hay playas en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
    if (clima == 23) {
      //aqui entra si se busco una playa con clima caliente con estado, ejemplo: dime una playa caliente en colima
      const playasCalientes = playasEnEstado.filter(
        (playa) => playa.temperatura >= clima
      );
      if (playasCalientes.length === 0) {
        return "No hay playas con temperatura mayor a 23 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima caliente, ejemplo: dime una playa caliente y lejos en colima
        const ubicacionesLejanas = playasCalientes.filter(
          (playa) => playa.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo playas caleintes y lejos de la ciudad (mas de 16 km) para recomendar en este estado.";
        }
        // Seleccionar una playa aleatoria entre las playas calientes y lejos
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        // Ubicacion cercana en clima caliente, ejemplo: dime una playa caliente y cerca en colima
        const ubicacionesCercanas = playasCalientes.filter(
          (playa) => playa.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay playas cercanas de la ciudad y calientes a 15km a la redonda.";
        }
        // Seleccionar una playa aleatoria entre las playas calientes y cercanas
        const lugarSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar una playa aleatoria entre las playas solo calientes
      const playaSeleccionada =
        playasCalientes[Math.floor(Math.random() * playasCalientes.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    } else if (clima == 22) {
      //aqui entra si se busco una playa con clima frio con estado, ejemplo: dime una playa fria en colima
      const playasFrias = playasEnEstado.filter(
        (playa) => playa.temperatura <= clima
      );
      if (playasFrias.length === 0) {
        return "No hay playas con temperatura menor a 22 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima frio
        const ubicacionesLejanas = playasFrias.filter(
          (playa) => playa.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo playas lejanas de la ciudad (mas de 16 km) y frias para recomendar en este estado.";
        }
        // Seleccionar una playa aleatoria entre las playas calientes
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        //Ubicacion cercana en clima frio
        const ubicacionesCercanas = playasFrias.filter(
          (playa) => playa.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay playas cercanas a 15km a la redonda y frias en este estado.";
        }
        // Seleccionar una playa aleatoria entre las playas frías
        const lugarSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const playaSeleccionada =
        playasFrias[Math.floor(Math.random() * playasFrias.length)];
      return `Te recomendaría visitar ${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
    }
    if (ubicacion == 16) {
      // SOLO PLAYA CON UBICACION LEJANA
      const playasLejanas = playasEnEstado.filter(
        (playa) => playa.ubicacionCentroCiudad >= ubicacion
      );
      if (playasLejanas.length === 0) {
        return "No tengo playas lejanas (mas de 16 km) para recomendar en este estado.";
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado =
        playasLejanas[Math.floor(Math.random() * playasLejanas.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    } else if (ubicacion == 15) {
      // SOLO PLAYA CON UBICACION CERCANA
      const ubicacionesCercanas = playasEnEstado.filter(
        (playa) => playa.ubicacionCentroCiudad <= ubicacion
      );
      if (ubicacionesCercanas.length === 0) {
        return "No hay playas cercanas a 15km a la redonda.";
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lugarSeleccionado =
        ubicacionesCercanas[
          Math.floor(Math.random() * ubicacionesCercanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por una playa con estado
    const playaSeleccionada =
      playasEnEstado[Math.floor(Math.random() * playasEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(playaSeleccionada);
    return `${respuestaTemperatura}${playaSeleccionada.nombre} en ${estadoDelObjeto}`;
  } //fin else (playasEnEstado) SI hay playas en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
} //fin function obtenerInformacionPlaya(consulta)

function obtenerInformacionLago(consulta) {
  const pregEstado = buscarEstado(consulta);

  // Implementar lógica para buscar información sobre playas
  const estadoDelObjeto = obtenerEstadoDesdeConsulta(consulta);

  // Utiliza el banco de datos (bancoDatos.playas) para obtener detalles sobre playas
  const lagosEnEstado = bancoDatos.lagos[estadoDelObjeto];
  const clima = aplicarReglasSinonimosClima(consulta);
  const ubicacion = aplicarReglasSinonimosUbicacion(consulta);
  //si el usuario consulto una playa sin estado en específico, devuelve una playa aleatoria. ejemplo: dime una playa
  if (!lagosEnEstado) {
    const estadosConLagos = Object.keys(bancoDatos.lagos);
    let estadoAleatorio =
      estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];
    let lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
    if (clima == 23) {
      let lagosCalientes = lagosEnEstado.filter(
        (lago) => lago.temperatura >= clima
      );
      let hastaQueEncuentreUnEstado = lagosCalientes.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];

        lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
        lagosCalientes = lagosEnEstado.filter(
          (lago) => lago.temperatura >= clima
        );
        hastaQueEncuentreUnEstado = lagosCalientes.length;
      }
      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado =
        lagosCalientes[Math.floor(Math.random() * lagosCalientes.length)];
      if (pregEstado !== "undefined") {
        // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria
        return `No hay lagos calientes en este estado, pero te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
      } else {
        return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
      }
    } else if (clima == 22) {
      let lagosFrios = lagosEnEstado.filter(
        (lago) => lago.temperatura <= clima
      );
      let hastaQueEncuentreUnEstado = lagosFrios.length;
      while (hastaQueEncuentreUnEstado == 0) {
        estadoAleatorio =
          estadosConLagos[Math.floor(Math.random() * estadosConLagos.length)];

        lagosEnEstado = bancoDatos.lagos[estadoAleatorio];
        lagosFrios = lagosEnEstado.filter((lago) => lago.temperatura >= clima);
        hastaQueEncuentreUnEstado = lagosFrios.length;
      }

      // Seleccionar una playa aleatoria entre las playas frías
      const lagoSeleccionado =
        lagosFrios[Math.floor(Math.random() * lagosFrios.length)];
      if (pregEstado !== "undefined") {
        // Si quiere una playa caliente en un estado y no hay, le recomienda una aleatoria
        return `No hay lagos frios en este estado, pero te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
      } else {
        return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoAleatorio}`;
      }
    }
    const lagoAleatorio =
      lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
    if (pregEstado !== "undefined") {
      // Si quiere un lago en un estado y no hay, le recomienda uno aleatoria
      return `No hay lagos en este estado, pero te recomendaría visitar ${lagoAleatorio.nombre} en ${estadoAleatorio}`;
    } else {
      return `Te recomendaría visitar ${lagoAleatorio.nombre} en ${estadoAleatorio}`;
    }
  } else {
    // if (lagosEnEstado) SI hay lagos en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no

    if (clima == 23) {
      //aqui entra si se busco un lago con clima caliente con estado, ejemplo: dime un lago caliente en Jalisco
      const lagosCalientes = lagosEnEstado.filter(
        (lago) => lago.temperatura >= clima
      );
      if (lagosCalientes.length === 0) {
        return "No hay lagos con temperatura menor a 22 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima caliente, ejemplo: dime un lago caliente y lejos en colima
        const ubicacionesLejanas = lagosCalientes.filter(
          (lago) => lago.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo lagos calientes y lejos de la ciudad (mas de 16 km) para recomendar en este estado.";
        }
        // Seleccionar una lago aleatorio entre los lagos calientes y lejos
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        // Ubicacion cercana en clima caliente, ejemplo: dime una lago caliente y cerca en colima
        const ubicacionesCercanas = lagosCalientes.filter(
          (lago) => lago.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay lagos cercanos de la ciudad y calientes a 15km a la redonda.";
        }
        // Seleccionar una lago aleatorio entre los playos frios y cercanos
        const lagoSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
    } else if (clima == 22) {
      const lagosFrios = lagosEnEstado.filter(
        (playa) => playa.temperatura <= clima
      );
      if (lagosFrios.length === 0) {
        return "No hay lagos con temperatura menor a 22 grados en este estado.";
      }
      if (ubicacion == 16) {
        // Ubicacion lejana en  clima frios, ejemplo: dime un lago friios y lejos en colima
        const ubicacionesLejanas = lagosFrios.filter(
          (lago) => lago.ubicacionCentroCiudad >= ubicacion
        );
        if (ubicacionesLejanas.length === 0) {
          return "No tengo lagos frios y lejos de la ciudad (mas de 16 km) para recomendar en este estado.";
        }
        // Seleccionar una lago aleatorio entre los lagos frios y lejos
        const lugarSeleccionado =
          ubicacionesLejanas[
            Math.floor(Math.random() * ubicacionesLejanas.length)
          ];
        return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
      } else if (ubicacion == 15) {
        // Ubicacion cercana en clima frios, ejemplo: dime un lago frio y cerca en colima
        const ubicacionesCercanas = lagosFrios.filter(
          (lago) => lago.ubicacionCentroCiudad <= ubicacion
        );
        if (ubicacionesCercanas.length === 0) {
          return "No hay lagos cercanos de la ciudad y frios a 15km a la redonda.";
        }
        // Seleccionar una lago aleatorio entre los playos frios y cercanos
        const lagoSeleccionado =
          ubicacionesCercanas[
            Math.floor(Math.random() * ubicacionesCercanas.length)
          ];
        return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
      }
      // Seleccionar un lago aleatorio entre los lagos fríos
      const lagoSeleccionado =
        lagosFrios[Math.floor(Math.random() * lagosFrios.length)];
      return `Te recomendaría visitar ${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    if (ubicacion == 16) {
      // SOLO LAGO CON UBICACION LEJANA
      const lagosLejanos = lagosEnEstado.filter(
        (lago) => lago.ubicacionCentroCiudad >= ubicacion
      );
      if (lagosLejanos.length === 0) {
        return "No tengo playas lejanas (mas de 16 km) para recomendar en este estado.";
      }
      // Seleccionar un lago aleatorio entre los lagos caleintes y lejos
      const lugarSeleccionado =
        lagosLejanos[Math.floor(Math.random() * lagosLejanos.length)];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    } else if (ubicacion == 15) {
      // SOLO LAGO CON UBICACION CERCANA
      const ubicacionesCercanas = lagosEnEstado.filter(
        (lago) => lago.ubicacionCentroCiudad <= ubicacion
      );
      if (ubicacionesCercanas.length === 0) {
        return "No hay playas cercanas a 15km a la redonda.";
      }
      // Seleccionar un lago aleatorio entre los lagos fríos
      const lugarSeleccionado =
        ubicacionesCercanas[
          Math.floor(Math.random() * ubicacionesCercanas.length)
        ];
      return `Te recomendaría visitar ${lugarSeleccionado.nombre} en ${estadoDelObjeto}`;
    }
    // Entra si se pregunta por un lago con estado
    const lagoSeleccionado =
      lagosEnEstado[Math.floor(Math.random() * lagosEnEstado.length)];
    // Aplicar reglas de temperatura
    const respuestaTemperatura = aplicarReglasTemperatura(lagoSeleccionado);
    return `${respuestaTemperatura}${lagoSeleccionado.nombre} en ${estadoDelObjeto}`;
  } //fin else (lagosEnEstado) SI hay lagos en el estado consultado, recordar que ubicacion aqui si importa, y en sin estado no
} //fin function obtenerInformacionLago(consulta)

function buscarEstado(consulta) {
  // Array con los nombres de los estados
  const estados = [
    "aguascalientes",
    "baja california",
    "baja california sur",
    "campeche",
    "chiapas",
    "chihuahua",
    "coahuila",
    "colima",
    "durango",
    "estado de mexico",
    "guanajuato",
    "guerrero",
    "hidalgo",
    "jalisco",
    "michoacan",
    "morelos",
    "nayarit",
    "nuevo leon",
    "oaxaca",
    "puebla",
    "queretaro",
    "quintana roo",
    "san luis potosi",
    "sinaloa",
    "sonora",
    "tabasco",
    "tamaulipas",
    "tlaxcala",
    "veracruz",
    "yucatan",
    "zacatecas",
  ];
  // Convertir la consulta a minúsculas para hacer la comparación de manera insensible a mayúsculas
  const consultaMinuscula = consulta.toLowerCase();
  // Verificar si la consulta incluye alguno de los estados
  let estadoEnConsulta = estados.find((estado) =>
    consultaMinuscula.includes(estado)
  );
  // Devolver el estado encontrado o 'undefined' si no se encontró ninguno
  return estadoEnConsulta || "undefined";
}

function obtenerEstadoDesdeConsulta(consulta) {
  if (
    consulta.includes("lugar") ||
    consulta.includes("lugares") ||
    consulta.includes("sitios") ||
    consulta.includes("sitio")
  ) {
    const estados = Object.keys(bancoDatos.lugares);
    const estadoEnConsulta = estados.find((estado) =>
      consulta.includes(estado.toLowerCase())
    );
    return estadoEnConsulta || "undefined";
  } else if (consulta.includes("playa") || consulta.includes("playas")) {
    const estados = Object.keys(bancoDatos.playas);
    const estadoEnConsulta = estados.find((estado) =>
      consulta.includes(estado.toLowerCase())
    );
    return estadoEnConsulta || "undefined";
  } else if (
    consulta.includes("lago") ||
    consulta.includes("lagos") ||
    consulta.includes("laguna") ||
    consulta.includes("lagunas")
  ) {
    const estados = Object.keys(bancoDatos.lagos);
    const estadoEnConsulta = estados.find((estado) =>
      consulta.includes(estado.toLowerCase())
    );

    return estadoEnConsulta || "undefined";
  }
}

function aplicarReglasTemperatura(lugar) {
  // Aplicar reglas de temperatura y construir la respuesta
  const respuestaTemperatura = reglasTemperatura.reduce((acumulador, regla) => {
    if (regla.condicion(lugar)) {
      return acumulador + regla.respuesta;
    }
    return acumulador;
  }, "");

  return respuestaTemperatura;
}

function aplicarReglasSinonimosClima(consulta) {
  const sinonimosConsulta = consulta.split(/\s+/);
  // Aplicar reglas de temperatura
  const respuestaTemperatura = reglasSinonimosClima.reduce(
    (acumulador, regla) => {
      if (sinonimosConsulta.some((sinonimo) => regla.condicion(sinonimo))) {
        return regla.respuesta;
      }
      return acumulador;
    },
    "No se pudo determinar la temperatura."
  );
  return respuestaTemperatura;
}

function aplicarReglasSinonimosUbicacion(consulta) {
  const sinonimosConsulta = consulta.split(/\s+/);
  const respuestaUbicacion = reglasUbicacion.reduce((acumulador, regla) => {
    if (sinonimosConsulta.some((sinonimo) => regla.condicion(sinonimo))) {
      return regla.respuesta;
    }
    return acumulador;
  }, "No se pudo determinar la ubicacion.");
  return respuestaUbicacion;
}
