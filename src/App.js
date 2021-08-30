import "./App.css";
import { tramosIRPF2021 } from "./assets/tramosIRPF.js";

let salarioBrutoAnual = 34000;
let cuotasSeguridadSocialPagadas = 900;
let salarioNetoAnual = salarioBrutoAnual - cuotasSeguridadSocialPagadas;
let minoracionPorGastosSinJustificar = 2000;
let baseImponibleGeneral = salarioNetoAnual - minoracionPorGastosSinJustificar;

let restante = baseImponibleGeneral;
let procesado = 0;
let llegadoUltimoTramo = false;

tramosIRPF2021.forEach((tramo) => {
  console.log("Procesado:" + procesado);
  console.log("Restante:" + restante);

  if (!llegadoUltimoTramo) {
    // cantidad de la que descontar en este tramo
    let baseTramo;
    // cantidad porcentuada de la base a descontar (esto es lo que te quitan dentro de este tramo)
    let sujetoTramo;

    // Averiguar si la baseImponible es mayor o menor que la cantidad maxima de este tramo. Es decir, llenamos el tramo entero o nos quedamos a medias.
    if (tramo.to <= baseImponibleGeneral) {
      // Este tramo está por debajo que la base general. Aun quedará por procesar en el siguiente tramo.
      console.log("el tramo es menor que la base imponible");
      baseTramo = tramo.to;
      sujetoTramo = (baseTramo * tramo.porcentaje) / 100;
    } else {
      // El tramo es más alto que la base general. Por lo tanto no se habra más procesamientos en el siguiente tramo
      console.log("el tramo es más alto que la base imponible");
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

tramosIRPF2021.forEach((tramo) =)

const procesarTramoIRPF = (tramo, baseImponible) => {
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
      <div><pre>{JSON.stringify(tramosIRPF2021, null, 2) }</pre></div>;
    </div>
  );
}

export default App;
