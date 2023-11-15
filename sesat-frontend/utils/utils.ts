//date.toISOString() retorna fechas desfasadas por un dia
//https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off/31732581#31732581

import { Avance } from "../types/ISESAT";
import { fetchTesisHistory } from "./tesis.endpoint";

//Ejemplo ISO Date: 2020-12-04T06:00:00.000Z
export function formatAsISODate(dateValue: Date) {
    let day = dateValue.getDate();
    let month = dateValue.getMonth() + 1; //(Esta indexado desde 0)
    let year = dateValue.getFullYear();
    let hours = dateValue.getHours();
    let mins = dateValue.getMinutes();
    let date = year + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0') + "T" + hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0') + ":00.000Z";
    return date;
}

//Regresa dd/MMM/yyyy SIN hacer conversión a fecha y hora local(Solo se usa en PDFs)
export function shortFormatDateWithoutConversion(dateString: string): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const parts = dateString.split('T')[0].split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Los meses en JavaScript empiezan en 0
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    const formattedDay = date.getDate().toString().padStart(2, '0');
    const formattedMonth = months[date.getMonth()];

    return `${formattedDay}/${formattedMonth}/${year}`;
}
//Regresa dd/MMM/yyyy en fecha y hora local
export function shortFormatDate(dateString: string): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day.toString().padStart(2, '0')}/${month}/${year}`;
}
//Regresa HH:MM AM/PM
export function getFormattedHours(date: any): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes + ' ' + ampm;
}

//Devuelve true si NO han pasado mas de 7 dias comparando con la fecha actual
export function comparaFecha(fecha: Date): boolean {
    const hoy = new Date();
    const diferenciaEnDias = Math.ceil((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return diferenciaEnDias <= 7;
}

//Devuelve true si la fecha (start, end) esta dentro del periodo global (startPeriod, endPeriod)
export function isDateWithinGlobalPeriod(startPeriod: Date, endPeriod: Date, start: Date, end: Date): boolean {
    return startPeriod <= start && endPeriod > end;
}

/**EVITA QUE EL ADMINISTRADOR CREE MAS DE 1 PERIODO POR SEMESTRE
Se reciben como parametros 2 fechas de tipo Date, la del ultimo periodo concluido 'anterior' y la del nuevo periodo 'nuevo', se debe revisar que la
fecha 'nuevo' cumpla con las condiciones siguientes:

Primero, extraer el año de la variable 'anterior'
Si la fecha 'anterior' esta esta entre Enero-Julio del año extraido, la fecha 'nuevo' debe estar entre Agosto-Diciembre del año extraido

Si la fecha de cierre 'anterior' está entre Agosto-Diciembre del año extraido, la fecha  'nuevo' debe estar entre Enero-Julio del año extraido + 1
 */
//prevEndDate       newStartDate
export function esPeriodoValido(anterior: Date, nuevo: Date): boolean {
    const añoAnterior = anterior.getFullYear();
    const mesAnterior = anterior.getMonth();
    const añoNuevo = nuevo.getFullYear();
    const mesNuevo = nuevo.getMonth();
    //PENDING REVIEW

    if (mesAnterior >= 0 && mesAnterior <= 6) { // Enero-Julio
        if (añoNuevo - añoAnterior >= 1) {//si ha pasado mas de un año
            return true;
        } else {
            return añoNuevo === añoAnterior && mesNuevo >= 7 && mesNuevo <= 11; // Agosto-Diciembre
        }

    } else if (mesAnterior >= 7 && mesAnterior <= 11) { // Agosto-Diciembre
        if (añoNuevo - añoAnterior > 1) {//si ha pasado mas de un año
            return true;
        } else {
            return añoNuevo === añoAnterior + 1 && mesNuevo >= 0 && mesNuevo <= 6; // Enero-Julio
        }
    }

    return true;
}


export function isPeriodActive(endDate: string): boolean {

    let fechaCierrePeriodo = new Date(endDate);
    let fechaActual = new Date();

    let result = false;
    if (fechaActual > fechaCierrePeriodo) {

        result = true;
    }
    return result;
}

//Recibe una fecha en formato dd/MMM/YYYY, por ejemplo 02/Feb/2023, Devuelve el objeto Date Correspondiente
export function dateStringToDate(dateString: string): Date {    
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = months.indexOf(parts[1]);
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

export async function fetchHistoryByIdTesis(idTesis: number, idModalidadActual: number, numAvanceActual: number, token: string): Promise<Array<Avance>> {

    let modalidadActual = idModalidadActual === 1 ? 'Tiempo Completo' : 'Medio Tiempo';
    let totalMaestria1 = 4, totalMaestria2 = 7, totalDoctorado = 9;

    //obtener total del array, ordenar, luego obtener el ultimo elemento
    let history: Avance[] = await fetchTesisHistory(idTesis, token);

    let avancesEntregados = new Array<Avance>();
    if (history.length > 0) {
        history.sort((a, b) => a.id_asignacion - b.id_asignacion);

        let lastElement = history[history.length - 1];

        switch (lastElement.grado_estudio) {
            case 'Doctorado':
                
                for (let index = 0; index < totalDoctorado; index++) {                                       
                    avancesEntregados.push({ num_avance: index + 1, grado_estudio: "", id_asignacion: 0, modalidad: '' })
                }              
            
                history.map((item, i) => (
                    avancesEntregados[i] = item
                ))
                
                break;

            default://Maestria
                let assignmentsLeft = 0;

                if (modalidadActual === 'Tiempo Completo') {
                    assignmentsLeft = totalMaestria1 - numAvanceActual + 1;//el avance actual tambien esta en el conjunto de los faltantes, por eso es + 1
                } else {
                    assignmentsLeft = totalMaestria2 - numAvanceActual + 1;
                }

                //Revisar cambios de modalidad previos
                let modalidad = history[0].modalidad;

                for (let index = 0; index < history.length; index++) {

                    const element = history[index];

                    if (element.modalidad !== modalidad) {
                        modalidad = element.modalidad;
                        //Avance vacio, se usa como separador entre una modalidad y otra
                        avancesEntregados.push({ num_avance: -1, grado_estudio: element.grado_estudio, id_asignacion: -1, modalidad: element.modalidad });
                    }

                    avancesEntregados.push(element);
                }

                if (lastElement.modalidad !== modalidadActual) {
                    //Avance vacio, se usa como separador entre una modalidad y otra
                    avancesEntregados.push({ num_avance: -1, grado_estudio: lastElement.grado_estudio, id_asignacion: -1, modalidad: modalidadActual });
                }
                //avances restantes del alumno
                for (let index = numAvanceActual; index < numAvanceActual + assignmentsLeft; index++) {
                    avancesEntregados.push({ num_avance: index, grado_estudio: '', id_asignacion: 0, modalidad: '' });
                }
                break;
        }
    }    
    console.log(modalidadActual)
    console.log(avancesEntregados)
    return avancesEntregados;
}