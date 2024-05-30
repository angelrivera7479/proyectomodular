const Estados = [
  {
    id: "agu",
    name: "Aguascalientes",
    image: "Aguascalientes.jpeg",
    description:
      "Reconocido por la Feria Nacional de San Marcos, una de las ferias más antiguas y grandes de México. Aguascalientes también cuenta con hermosos parques y jardines.",
  },
  {
    id: "bcn",
    name: "BajaCalifornia",
    image: "BajaCalifornia.jpeg",
    description:
      "Con playas espectaculares en Tijuana y Ensenada, Baja California destaca por su escena artística en Tijuana y los viñedos del Valle de Guadalupe. Además, el Parque Nacional Sierra de San Pedro Mártir ofrece impresionantes paisajes montañosos y observación de estrellas.",
  },
  {
    id: "bcs",
    name: "BajaCaliforniaSur",
    image: "BajaCaliforniaSur.jpeg",
    description:
      "Con playas impresionantes como la Playa Balandra en La Paz y el famoso Arco de Cabo San Lucas. Además, es un destino ideal para el avistamiento de ballenas.",
  },
  {
    id: "cam",
    name: "Campeche",
    image: "Campeche.jpeg",
    description:
      "Con impresionantes murallas y fuertes, la ciudad de Campeche es un tesoro colonial. Además, ofrece reservas naturales como Calakmul y playas como Playa Bonita.",
  },
  {
    id: "coa",
    name: "Coahuila",
    image: "Coahuila.jpeg",
    description:
      "Destaca por la belleza natural de la Sierra de Arteaga y la Zona del Desierto. Saltillo, la capital, es conocida por sus textiles y su arquitectura colonial.",
  },
  {
    id: "col",
    name: "Colima",
    image: "Colima.jpeg",
    description:
      "Hogar del Volcán de Colima, uno de los más activos de México. La ciudad de Colima cuenta con un centro histórico encantador y la Universidad de Colima es un referente educativo.",
  },
  {
    id: "chp",
    name: "Chiapas",
    image: "Chiapas.jpeg",
    description:
      "Con una biodiversidad única, Chiapas es hogar de selvas, cascadas como Agua Azul y sitios arqueológicos mayas como Palenque. San Cristóbal de las Casas ofrece una experiencia colonial encantadora.",
  },
  {
    id: "chh",
    name: "Chihuahua",
    image: "Chihuahua.jpeg",
    description:
      "El estado más grande de México, Chihuahua, combina el árido Desierto de Chihuahua con la majestuosidad de la Sierra Madre Occidental. La ciudad de Chihuahua exhibe arquitectura histórica, mientras que la Barranca del Cobre atrae a los amantes del senderismo con su sistema de cañones impresionante.",
  },
  {
    id: "dur",
    name: "Durango",
    image: "Durango.jpeg",
    description:
      "Con su imponente geografía montañosa, Durango es famoso por el teleférico de El Púlpito y la ciudad colonial de Durango. Además, es conocido por ser escenario de varias películas de Hollywood.",
  },
  {
    id: "cmx",
    name: "CDMX",
    image: "CDMX.jpeg",
    description:
      "Como la capital vibrante de México, la CDMX ofrece una mezcla de historia, cultura y modernidad. Desde el Zócalo y el Bosque de Chapultepec hasta la ecléctica escena gastronómica y cultural, la ciudad es un centro cosmopolita lleno de vida y diversidad.",
  },
  {
    id: "gua",
    name: "Guanajuato",
    image: "Guanajuato.jpeg",
    description:
      "Conocido por su arquitectura colonial y callejones empedrados en la ciudad de Guanajuato. Además, el Festival Internacional Cervantino atrae a amantes de las artes de todo el mundo.",
  },
  {
    id: "gro",
    name: "Guerrero",
    image: "Guerrero.jpeg",
    description:
      "Famoso por Acapulco y sus playas, Guerrero también alberga la zona arqueológica de Xochicalco y la ciudad colonial de Taxco, famosa por la orfebrería.",
  },
  {
    id: "hid",
    name: "Hidalgo",
    image: "Hidalgo.jpeg",
    description:
      "Hogar de la impresionante zona arqueológica de Tula y el Santuario de las Luciérnagas en Nanacamilpa. Pachuca, la capital, cuenta con un reloj monumental icónico.",
  },
  {
    id: "jal",
    name: "Jalisco",
    image: "Jalisco.jpeg",
    description:
      "Conocido como la tierra del tequila y el mariachi. Guadalajara ofrece una rica historia en su centro histórico, la majestuosidad de la Catedral y eventos culturales en el Instituto Cultural Cabañas. Además, la zona de Tequila es imperdible para los amantes de esta bebida.",
  },
  {
    id: "mex",
    name: "Mexico",
    image: "Mexico.jpeg",
    description:
      "Con la imponente Pirámide del Sol en Teotihuacán y la belleza natural del Nevado de Toluca. Toluca, su capital, es conocida por sus festivales y eventos culturales.",
  },
  {
    id: "mic",
    name: "Michoacan",
    image: "Michoacan.jpeg",
    description:
      "Celebrado por la artesanía, la cultura indígena y las festividades como el Día de los Muertos. Morelia, su capital, es famosa por su arquitectura colonial.",
  },
  {
    id: "mor",
    name: "Morelos",
    image: "Morelos.jpeg",
    description:
      "Con lugares históricos como Tepoztlán y Cuernavaca, conocida como la Ciudad de la Eterna Primavera. Además, alberga el Jardín Borda y las Lagunas de Zempoala.",
  },
  {
    id: "nay",
    name: "Nayarit",
    image: "Nayarit.jpeg",
    description:
      "Con playas exquisitas en destinos como Sayulita y la Riviera Nayarit. La ciudad de Tepic ofrece una mezcla de tradición y modernidad.",
  },
  {
    id: "nle",
    name: "NuevoLeon",
    image: "NuevoLeon.jpeg",
    description:
      "Conocido por su dinamismo industrial, Monterrey también ofrece bellezas naturales como el Parque Nacional Cumbres de Monterrey. El Museo de Historia Mexicana y el Parque Fundidora son puntos clave para entender su pasado y disfrutar del presente.",
  },
  {
    id: "oax",
    name: "Oaxaca",
    image: "Oaxaca.jpeg",
    description:
      "Este estado es famoso por su rica tradición culinaria, artesanías y celebraciones culturales como la Guelaguetza. La ciudad de Oaxaca cuenta con arquitectura colonial, mientras que lugares como Monte Albán revelan la antigua historia zapoteca.",
  },
  {
    id: "pue",
    name: "Puebla",
    image: "Puebla.jpeg",
    description:
      "Conocida por su arquitectura barroca y la impresionante Catedral de Puebla, así como por la gastronomía, destacando el mole poblano. Cholula cuenta con la pirámide más grande del mundo en términos de volumen.",
  },
  {
    id: "que",
    name: "Queretaro",
    image: "Queretaro.jpeg",
    description:
      "Famoso por su acueducto, Querétaro tiene un centro histórico declarado Patrimonio de la Humanidad. También es conocido por sus viñedos y la Ruta del queso y vino",
  },
  {
    id: "roo",
    name: "QuintanaRoo",
    image: "QuintanaRoo.jpeg",
    description:
      "Famoso por sus impresionantes playas, como Playa Delfines y Playa Norte en Isla Mujeres. Además, ofrece experiencias culturales en sitios arqueológicos como Tulum y Coba. Destinos populares como Xcaret y Xel-Há lo convierten en un atractivo turístico destacado.",
  },
  {
    id: "slp",
    name: "SanLuisPotosi",
    image: "SanLuisPotosi.jpeg",
    description:
      "Con sitios históricos como el Centro Histórico de San Luis Potosí y la zona arqueológica de Tamtoc. También ofrece bellezas naturales como la Huasteca Potosina.",
  },
  {
    id: "sin",
    name: "Sinaloa",
    image: "Sinaloa.jpeg",
    description:
      "Con playas hermosas y un ambiente festivo, Sinaloa es famoso por su música y cultura. Mazatlán es un destino turístico con encanto y tradiciones arraigadas.",
  },
  {
    id: "son",
    name: "Sonora",
    image: "Sonora.jpeg",
    description:
      "Famoso por su desierto y playas, Sonora es también conocido por la celebración del Día de la Raza en Ciudad Obregón y el Festival Alfonso Ortiz Tirado en Álamos.",
  },
  {
    id: "tab",
    name: "Tabasco",
    image: "Tabasco.jpeg",
    description:
      "Rico en recursos naturales, Tabasco cuenta con la reserva ecológica Pantanos de Centla y es famoso por la producción de cacao. La ciudad de Villahermosa ofrece museos y parques.",
  },
  {
    id: "tam",
    name: "Tamaulipas",
    image: "Tamaulipas.jpeg",
    description:
      "Destaca por sus playas en la costa del Golfo de México y el Parque Nacional Cañón de Santa Elena. Ciudad Victoria, su capital, ofrece una mezcla de historia y naturaleza.",
  },
  {
    id: "tla",
    name: "Tlaxcala",
    image: "Tlaxcala.jpeg",
    description:
      "La ciudad de Tlaxcala es rica en historia colonial, con la Basílica de Nuestra Señora de la Caridad y el exconvento de San Francisco. También es conocida por sus tradiciones y festivales.",
  },
  {
    id: "ver",
    name: "Veracruz",
    image: "Veracruz.jpeg",
    description:
      "Con una ubicación estratégica en el Golfo de México, Veracruz tiene una rica herencia cultural y gastronómica. El malecón de Veracruz y la ciudad de Xalapa son destinos culturales destacados.",
  },
  {
    id: "yuc",
    name: "Yucatan",
    image: "Yucatan.jpeg",
    description:
      "La península de Yucatán destaca por su riqueza cultural y arqueológica, como las ruinas de Chichén Itzá y Uxmal. Mérida, la capital, ofrece una mezcla única de tradiciones mayas y coloniales, con plazas encantadoras y mercados vibrantes.",
  },
  {
    id: "zac",
    name: "Zacatecas",
    image: "Zacatecas.jpeg",
    description:
      "Con su arquitectura barroca y la Mina El Edén, Zacatecas es reconocido por su rica historia minera. El Cerro de la Bufa proporciona vistas impresionantes de la ciudad.",
  },
];
export default Estados;
