//date.toISOString() retorna fechas desfasadas por un dia
//https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off/31732581#31732581

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

//Regresa dd/MMM/yyyy
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