'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Oficinas SERNAGEOMIN por region
const OFICINAS = [
  { id: 1, nombre: 'SERNAGEOMIN Arica y Parinacota', region: 'Arica y Parinacota', ciudad: 'Arica', direccion: '7 de Junio 268', telefono: '58 2232185', servicios: ['Concesiones', 'Fiscalizacion', 'Geologia'] },
  { id: 2, nombre: 'SERNAGEOMIN Tarapaca', region: 'Tarapaca', ciudad: 'Iquique', direccion: 'Serrano 391', telefono: '57 2427422', servicios: ['Concesiones', 'Fiscalizacion', 'Seguridad Minera'] },
  { id: 3, nombre: 'SERNAGEOMIN Antofagasta', region: 'Antofagasta', ciudad: 'Antofagasta', direccion: 'Baquedano 871', telefono: '55 2451818', servicios: ['Concesiones', 'Fiscalizacion', 'Gran Mineria'] },
  { id: 4, nombre: 'SERNAGEOMIN Atacama', region: 'Atacama', ciudad: 'Copiapo', direccion: 'Los Carrera 645', telefono: '52 2212487', servicios: ['Concesiones', 'Fiscalizacion', 'Pequena Mineria'] },
  { id: 5, nombre: 'SERNAGEOMIN Coquimbo', region: 'Coquimbo', ciudad: 'La Serena', direccion: 'Matta 461', telefono: '51 2225629', servicios: ['Concesiones', 'Fiscalizacion', 'Mediana Mineria'] },
  { id: 6, nombre: 'SERNAGEOMIN Valparaiso', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Blanco 1215, piso 3', telefono: '32 2253747', servicios: ['Concesiones', 'Fiscalizacion', 'Catastro'] },
  { id: 7, nombre: 'SERNAGEOMIN Metropolitana (Central)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Av. Santa Maria 0104', telefono: '2 24825500', servicios: ['Direccion Nacional', 'Concesiones', 'Geologia', 'Laboratorio'] },
  { id: 8, nombre: 'SERNAGEOMIN OHiggins', region: 'OHiggins', ciudad: 'Rancagua', direccion: 'German Riesco 277', telefono: '72 2230137', servicios: ['Concesiones', 'Fiscalizacion', 'Cobre'] },
  { id: 9, nombre: 'SERNAGEOMIN Maule', region: 'Maule', ciudad: 'Talca', direccion: '1 Sur 980', telefono: '71 2233741', servicios: ['Concesiones', 'Fiscalizacion', 'Aridos'] },
  { id: 10, nombre: 'SERNAGEOMIN Biobio', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Barros Arana 1048', telefono: '41 2227183', servicios: ['Concesiones', 'Fiscalizacion', 'Carbon'] },
  { id: 11, nombre: 'SERNAGEOMIN Araucania', region: 'Araucania', ciudad: 'Temuco', direccion: 'Bulnes 590', telefono: '45 2211055', servicios: ['Concesiones', 'Fiscalizacion', 'Aridos'] },
  { id: 12, nombre: 'SERNAGEOMIN Los Rios', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'Arauco 475', telefono: '63 2213461', servicios: ['Concesiones', 'Fiscalizacion', 'Turba'] },
  { id: 13, nombre: 'SERNAGEOMIN Los Lagos', region: 'Los Lagos', ciudad: 'Puerto Montt', direccion: 'Urmeneta 509, piso 5', telefono: '65 2256055', servicios: ['Concesiones', 'Fiscalizacion', 'Aridos'] },
  { id: 14, nombre: 'SERNAGEOMIN Aysen', region: 'Aysen', ciudad: 'Coyhaique', direccion: 'Moraleda 369', telefono: '67 2231066', servicios: ['Concesiones', 'Fiscalizacion', 'Exploracion'] },
  { id: 15, nombre: 'SERNAGEOMIN Magallanes', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'Waldo Seguel 636', telefono: '61 2223822', servicios: ['Concesiones', 'Fiscalizacion', 'Hidrocarburos'] },
  { id: 16, nombre: 'SERNAGEOMIN Norte (Calama)', region: 'Antofagasta', ciudad: 'Calama', direccion: 'Granaderos 2980', telefono: '55 2340830', servicios: ['Fiscalizacion', 'Gran Mineria', 'Seguridad'] }
];

const REGIONES = ['Todas', 'Arica y Parinacota', 'Tarapaca', 'Antofagasta', 'Atacama', 'Coquimbo', 'Valparaiso', 'Metropolitana', 'OHiggins', 'Maule', 'Biobio', 'Araucania', 'Los Rios', 'Los Lagos', 'Aysen', 'Magallanes'];

// Tipos de concesiones mineras
const CONCESIONES = [
  { nombre: 'Concesion de Exploracion', icono: '🔍', descripcion: 'Derecho a buscar y evaluar yacimientos minerales', duracion: '2 anos (renovable 2 mas)', superficie: 'Hasta 5.000 ha', patente: '1/50 UTM por ha/ano', requisitos: ['Solicitud ante juzgado', 'Publicaciones', 'Mensura'] },
  { nombre: 'Concesion de Explotacion', icono: '⛏️', descripcion: 'Derecho a extraer y procesar minerales', duracion: 'Indefinida', superficie: 'Hasta 10 ha por pertenencia', patente: '1/10 UTM por ha/ano', requisitos: ['Concesion exploracion previa', 'Mensura', 'Inscripcion CBR'] },
  { nombre: 'Pertenencia Minera', icono: '📍', descripcion: 'Unidad basica de concesion de explotacion', duracion: 'Indefinida', superficie: '1 a 10 hectareas', patente: '1/10 UTM por ha/ano', requisitos: ['Pedimento', 'Mensura', 'Constitucion'] },
  { nombre: 'Permiso de ENAMI', icono: '🏭', descripcion: 'Autorizacion para vender a ENAMI como pequeno minero', duracion: 'Segun contrato', superficie: 'N/A', patente: 'Sin costo', requisitos: ['Registro minero', 'Produccion demostrada', 'Calidad mineral'] },
  { nombre: 'Servidumbre Minera', icono: '🛤️', descripcion: 'Derecho de paso y uso de terrenos para faenas', duracion: 'Mientras exista concesion', superficie: 'Segun necesidad', patente: 'Compensacion al dueno', requisitos: ['Concesion vigente', 'Acuerdo o sentencia', 'Indemnizacion'] },
  { nombre: 'Autorizacion Ambiental', icono: '🌿', descripcion: 'Permiso SEA para operaciones mineras', duracion: 'Segun RCA', superficie: 'Segun proyecto', patente: 'Costo evaluacion', requisitos: ['EIA o DIA', 'Participacion ciudadana', 'Resolucion SEA'] }
];

// Minerales principales de Chile
const MINERALES = [
  { mineral: 'Cobre', icono: '🔶', produccion: '5.7 M ton/ano', ranking: '#1 Mundial', regiones: ['Antofagasta', 'Atacama', 'OHiggins'], empresas: ['Codelco', 'BHP', 'Escondida'] },
  { mineral: 'Litio', icono: '🔋', produccion: '180.000 ton/ano', ranking: '#2 Mundial', regiones: ['Antofagasta', 'Atacama'], empresas: ['SQM', 'Albemarle'] },
  { mineral: 'Molibdeno', icono: '⚙️', produccion: '55.000 ton/ano', ranking: '#3 Mundial', regiones: ['Antofagasta', 'OHiggins'], empresas: ['Codelco', 'Molymet'] },
  { mineral: 'Oro', icono: '🥇', produccion: '35 ton/ano', ranking: 'Top 20', regiones: ['Atacama', 'Maule', 'Araucania'], empresas: ['Barrick', 'Kinross'] },
  { mineral: 'Plata', icono: '🥈', produccion: '1.300 ton/ano', ranking: '#7 Mundial', regiones: ['Antofagasta', 'Atacama'], empresas: ['Pan American', 'Codelco'] },
  { mineral: 'Hierro', icono: '⚫', produccion: '15 M ton/ano', ranking: 'Significativo', regiones: ['Atacama', 'Coquimbo'], empresas: ['CAP Mineria'] },
  { mineral: 'Yodo', icono: '💜', produccion: '18.000 ton/ano', ranking: '#1 Mundial', regiones: ['Tarapaca', 'Antofagasta'], empresas: ['SQM', 'Cosayach'] },
  { mineral: 'Nitratos', icono: '🧪', produccion: '900.000 ton/ano', ranking: '#1 Mundial', regiones: ['Tarapaca', 'Antofagasta'], empresas: ['SQM'] }
];

// Glosario minero
const GLOSARIO = [
  { termino: 'SERNAGEOMIN', definicion: 'Servicio Nacional de Geologia y Mineria, fiscaliza y regula la actividad minera' },
  { termino: 'Pertenencia', definicion: 'Unidad basica de concesion minera de explotacion, de 1 a 10 hectareas' },
  { termino: 'Patente Minera', definicion: 'Pago anual obligatorio para mantener vigente una concesion minera' },
  { termino: 'Mensura', definicion: 'Proceso de delimitacion topografica de una concesion minera' },
  { termino: 'Pedimento', definicion: 'Solicitud formal para constituir una concesion de exploracion' },
  { termino: 'Manifestacion', definicion: 'Solicitud para constituir una pertenencia minera de explotacion' },
  { termino: 'ENAMI', definicion: 'Empresa Nacional de Mineria, fomenta la pequena y mediana mineria' },
  { termino: 'Royalty Minero', definicion: 'Impuesto especial a la mineria sobre el margen operacional' },
  { termino: 'Cierre de Faenas', definicion: 'Plan obligatorio para restaurar el terreno al terminar operaciones' },
  { termino: 'Ley del Mineral', definicion: 'Porcentaje de metal contenido en el mineral extraido' },
  { termino: 'Tajo Abierto', definicion: 'Metodo de extraccion a cielo abierto o rajo' },
  { termino: 'Relave', definicion: 'Residuo de la concentracion de minerales, almacenado en tranques' }
];

export default function MineriaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Calculadora de patente minera
  const [tipoConcesion, setTipoConcesion] = useState('explotacion');
  const [hectareas, setHectareas] = useState('');
  const [valorUTM, setValorUTM] = useState('65000'); // UTM diciembre 2024 aprox

  const oficinasFiltradas = OFICINAS.filter(oficina => {
    const coincideBusqueda = oficina.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                             oficina.servicios.some(s => s.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideRegion = regionFiltro === 'Todas' || oficina.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularPatente = () => {
    if (!hectareas || !valorUTM) return null;

    const ha = parseFloat(hectareas);
    const utm = parseFloat(valorUTM);

    // Patente: exploracion = 1/50 UTM/ha, explotacion = 1/10 UTM/ha
    const fraccion = tipoConcesion === 'exploracion' ? 50 : 10;
    const patenteUTM = ha / fraccion;
    const patentePesos = patenteUTM * utm;

    return {
      hectareas: ha,
      patenteUTM: patenteUTM.toFixed(2),
      patentePesos: Math.round(patentePesos),
      fraccion,
      tipo: tipoConcesion === 'exploracion' ? 'Exploracion' : 'Explotacion'
    };
  };

  const resultado = calcularPatente();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">⛏️</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mineria
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Oficinas SERNAGEOMIN, concesiones mineras, calculadora de patentes y recursos para mineros
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-amber-500/20 rounded-full text-amber-300 text-sm">
                🔶 Cobre
              </span>
              <span className="px-4 py-2 bg-orange-500/20 rounded-full text-orange-300 text-sm">
                🔋 Litio
              </span>
              <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-sm">
                🥇 Oro
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Oficinas SERNAGEOMIN */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Oficinas SERNAGEOMIN
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Buscar por ciudad o servicio</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setMostrarResultados(true)}
                placeholder="Ej: Calama, concesiones, fiscalizacion..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Region</label>
              <select
                value={regionFiltro}
                onChange={(e) => setRegionFiltro(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-amber-500"
              >
                {REGIONES.map(region => (
                  <option key={region} value={region} className="bg-slate-800">{region}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setMostrarResultados(true)}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-700 transition"
          >
            🔍 Buscar Oficinas ({oficinasFiltradas.length} encontradas)
          </button>

          {mostrarResultados && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4 max-h-96 overflow-y-auto"
            >
              {oficinasFiltradas.map((oficina) => (
                <div key={oficina.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{oficina.nombre}</h3>
                      <p className="text-amber-400 text-sm">📞 {oficina.telefono}</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 text-xs">
                      {oficina.region}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">📍 {oficina.direccion}, {oficina.ciudad}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {oficina.servicios.map((servicio, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-500/20 rounded text-xs text-orange-300">
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Calculadora de Patente Minera */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-2xl p-6 border border-orange-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Patente Minera Anual
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo de Concesion</label>
                <select
                  value={tipoConcesion}
                  onChange={(e) => setTipoConcesion(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="exploracion" className="bg-slate-800">Exploracion (1/50 UTM/ha)</option>
                  <option value="explotacion" className="bg-slate-800">Explotacion (1/10 UTM/ha)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Superficie (hectareas)</label>
                <input
                  type="number"
                  value={hectareas}
                  onChange={(e) => setHectareas(e.target.value)}
                  placeholder="Ej: 100"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Valor UTM ($)</label>
                <input
                  type="number"
                  value={valorUTM}
                  onChange={(e) => setValorUTM(e.target.value)}
                  placeholder="65000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
                <p className="text-xs text-gray-500 mt-1">Valor UTM actualizado en sii.cl</p>
              </div>

              <div className="p-4 bg-amber-500/20 rounded-xl">
                <p className="text-sm text-amber-300">
                  💡 La patente se paga en marzo de cada ano en Tesoreria
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              {resultado ? (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <p className="text-gray-400 mb-2">Patente Anual Estimada</p>
                    <p className="text-5xl font-bold text-amber-400">
                      ${resultado.patentePesos.toLocaleString('es-CL')}
                    </p>
                    <p className="text-gray-500 mt-2">{resultado.tipo}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Superficie:</span>
                      <span className="text-white">{resultado.hectareas} hectareas</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Formula:</span>
                      <span className="text-white">1/{resultado.fraccion} UTM por ha</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Patente en UTM:</span>
                      <span className="text-white">{resultado.patenteUTM} UTM</span>
                    </div>
                    <div className="flex justify-between text-gray-400 border-t border-white/10 pt-2">
                      <span>Total anual:</span>
                      <span className="text-amber-400 font-bold">${resultado.patentePesos.toLocaleString('es-CL')}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-red-500/20 rounded-lg">
                    <p className="text-xs text-red-300">
                      ⚠️ No pagar la patente produce la caducidad de la concesion
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="text-4xl mb-4">📊</span>
                  <p>Ingresa la superficie para calcular la patente</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tipos de Concesiones */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📋</span> Tipos de Concesiones y Permisos Mineros
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONCESIONES.map((concesion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-amber-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{concesion.icono}</span>
                <span className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 text-xs">
                  {concesion.duracion}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{concesion.nombre}</h3>
              <p className="text-gray-400 text-sm mb-3">{concesion.descripcion}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Superficie:</span>
                  <span className="text-white">{concesion.superficie}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Patente:</span>
                  <span className="text-orange-400">{concesion.patente}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-gray-500 mb-2">Requisitos:</p>
                <ul className="space-y-1">
                  {concesion.requisitos.map((req, j) => (
                    <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="text-amber-400">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Minerales de Chile */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>💎</span> Principales Minerales de Chile
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MINERALES.map((mineral, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl p-4 border border-amber-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{mineral.icono}</span>
                  <div>
                    <h3 className="font-bold text-white">{mineral.mineral}</h3>
                    <p className="text-xs text-amber-400">{mineral.ranking}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Produccion:</span>
                    <span className="text-white">{mineral.produccion}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Regiones: </span>
                    <span className="text-gray-300">{mineral.regiones.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Empresas: </span>
                    <span className="text-orange-300">{mineral.empresas.join(', ')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para obtener concesion */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📝</span> Como Obtener una Concesion Minera
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {[
            { paso: '1', titulo: 'Pedimento', desc: 'Solicitud ante juzgado civil', icono: '📋' },
            { paso: '2', titulo: 'Publicacion', desc: 'Diario Oficial y regional', icono: '📰' },
            { paso: '3', titulo: 'Oposiciones', desc: 'Plazo 30 dias para terceros', icono: '⚖️' },
            { paso: '4', titulo: 'Mensura', desc: 'Delimitacion topografica', icono: '📐' },
            { paso: '5', titulo: 'Sentencia', desc: 'Constitucion judicial', icono: '🏛️' },
            { paso: '6', titulo: 'Inscripcion', desc: 'Conservador de Minas', icono: '✅' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.icono}
              </div>
              <div className="text-xs text-amber-400 mb-1">Paso {item.paso}</div>
              <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📖</span> Glosario Minero
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOSARIO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <h3 className="font-bold text-amber-400 mb-2">{item.termino}</h3>
              <p className="text-sm text-gray-400">{item.definicion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'SERNAGEOMIN', url: 'https://www.sernageomin.cl', icono: '⛏️', desc: 'Geologia y Mineria' },
              { nombre: 'ENAMI', url: 'https://www.enami.cl', icono: '🏭', desc: 'Pequena y mediana mineria' },
              { nombre: 'Cochilco', url: 'https://www.cochilco.cl', icono: '📊', desc: 'Comision Chilena del Cobre' },
              { nombre: 'Consejo Minero', url: 'https://www.consejominero.cl', icono: '🏛️', desc: 'Gremio gran mineria' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
              >
                <span className="text-2xl mb-2 block">{recurso.icono}</span>
                <h3 className="font-bold text-white text-sm">{recurso.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Mineria - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-amber-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion basada en datos oficiales de SERNAGEOMIN
          </p>
        </div>
      </footer>
    </div>
  );
}
