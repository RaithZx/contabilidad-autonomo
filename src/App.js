import "./App.css";
import { useState } from "react";
import { tramosIRPF2021 } from "./assets/tramosIRPF.js";

function App() {
    const [salarioBrutoAnual, setSalarioBrutoAnual] = useState(0);
    const [cuotasSeguridadSocialPagadas, setCuotasSeguridadSocialPagadas] =
        useState(900);
    const [pagoIRPF, setPagoIRPF] = useState(0);

    let salarioNetoAnual = salarioBrutoAnual - cuotasSeguridadSocialPagadas;
    let minoracionPorGastosSinJustificar = 2000;
    let baseImponibleGeneral =
        salarioNetoAnual - minoracionPorGastosSinJustificar;

    // controlling variables
    let restanteProcesar = baseImponibleGeneral;
    let procesado = 0;
    let llegadoUltimoTramo = false;

    const procesarTramoIRPF = (tramo, baseImponible) => {
        let llegadoLimiteTramos = false;
        let baseImponibleTramo = 0;
        if (tramo.to > baseImponible) {
            baseImponibleTramo = baseImponible;
            llegadoLimiteTramos = true;
        } else if (tramo.to < baseImponible) {
            baseImponibleTramo = tramo.to;
        } else if (tramo.to === baseImponible) {
            llegadoLimiteTramos = true;
        }

        // Cantidad procesada en este tramos
        let baseSujetaTramo = baseImponibleTramo - tramo.from;
        // Cantidad porcentuada de este tramo
        let aPagar = (baseSujetaTramo * tramo.porcentaje) / 100;

        return {
            aPagar: aPagar,
            baseSujetaTramo: baseSujetaTramo,
            llegadoLimiteTramos: llegadoLimiteTramos,
            porcentajeTramo: tramo.porcentaje,
        };
    };

    const calcularIRPFAnual = () => {
        let pagoIRPFtmp = 0;
        tramosIRPF2021.every((tramo) => {
            let {
                aPagar,
                baseSujetaTramo,
                llegadoLimiteTramos,
                porcentajeTramo,
            } = procesarTramoIRPF(tramo, baseImponibleGeneral);

            // cantidad restante por someter a retención
            restanteProcesar -= baseSujetaTramo;
            // cantidad que ya ha sido sometida a retención
            procesado += baseSujetaTramo;
            // acumular cantidad de IRFP a pagar correspondiente a este tramo al total de IRPF
            pagoIRPFtmp += aPagar;

            // console.log("A PAGAR:" + aPagar);
            // console.log("baseSujetaTramos: " + baseSujetaTramo);
            // console.log("porcentaje: " + porcentajeTramo);
            // console.log("procesado: " + procesado);
            // console.log("restanteProcesar: " + restanteProcesar);
            // console.log("Llegado ultimo Tramos: " + llegadoLimiteTramos);
            // console.log("---------");

            return !llegadoLimiteTramos;
        });

        // set IRPF ANUal
        setPagoIRPF(pagoIRPFtmp);
        console.log("IRPF a pagar: " + pagoIRPFtmp);
    };

    const inputHandler = (event) => {
        setSalarioBrutoAnual(event.target.value);
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <section></section>
            <section>
                <input type="text" onChange={inputHandler} />
                <button onClick={calcularIRPFAnual}>calcular</button>
                IRPF TOTAL: {pagoIRPF}
            </section>
        </div>
    );
}

export default App;
