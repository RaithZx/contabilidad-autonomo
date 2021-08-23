import "./App.css";

let salarioBrutoAnual = 34000;
let cuotasSeguridadSocialPagadas = 900;
let salarioNetoAnual = salarioBrutoAnual - cuotasSeguridadSocialPagadas;
let minoracionPorGastosSinJustificar = 2000;
let baseImponibleGeneral = salarioNetoAnual - minoracionPorGastosSinJustificar;

let tramosIRPF2021 = [
  {
    from: 0,
    to: 12450,
    porcentaje: 19,
  },
  {
    from: 12450,
    to: 20200,
    porcentaje: 24,
  },
  {
    from: 20200,
    to: 35200,
    porcentaje: 30,
  },
  {
    from: 35200,
    to: 60000,
    porcentaje: 37,
  },
  {
    from: 60000,
    to: 300000,
    porcentaje: 45,
  },
  {
    from: 300000,
    to: 0,
    porcentaje: 45,
  },
];
let restante = baseImponibleGeneral;
let procesado = 0;
let llegadoUltimoTramo = false;
tramosIRPF2021.forEach((tramo) => {
  console.log("Procesado:" + procesado);
  console.log("Restante:" + restante);
  if (!llegadoUltimoTramo) {
    let baseTramo, sujetoTramo;

    if (tramo.to <= baseImponibleGeneral) {
      console.log("es suficiente");
      baseTramo = tramo.to;
      sujetoTramo = (baseTramo * tramo.porcentaje) / 100;
    } else {
      console.log("no es suficiente");
      baseTramo = tramo.to - baseImponibleGeneral;
      sujetoTramo = (baseTramo * tramo.porcentaje) / 100;
      llegadoUltimoTramo = true;
    }
    restante -= baseImponibleGeneral - baseTramo;
    procesado += baseTramo;
    console.log("BaseTramo: " + baseTramo);
    console.log("sujetoTramo: " + sujetoTramo);
  } else {
    console.log("SKIPPPP");
  }
  console.log("--------");
});

let procesarTramoIRPF = (tramo, baseImponible) => {
  let llegadoLimiteTramos;
  let baseImponibleTramo = 0;
  if (tramo.to > baseImponible) {
    baseImponibleTramo = baseImponible;
    llegadoLimiteTramos = true;
  } else if (tramo.to < baseImponible) {
    baseImponibleTramo = tramo.to;
  } else if (tramo.to === baseImponible) {
    llegadoLimiteTramos = true;
  }

  let baseSujetaTramo = baseImponibleTramo - tramo.from;
  let aPagar = (baseSujetaTramo * tramo.porcentaje) / 100;
  return {
    aPagar: aPagar,
    baseImponibleTramo: baseImponibleTramo,
    llegadoLimiteTramos: llegadoLimiteTramos,
  };
};
function App() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <section></section>
    </div>
  );
}

export default App;
