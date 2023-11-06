export function shortFormatDate(dateString: string): string {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day.toString().padStart(2, '0')}/${month}/${year}`;
}

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