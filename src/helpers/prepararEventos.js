import moment from "moment"

export const prepararEventos = (eventos) => {
    const eventosPreparados = eventos.map(evento => {
        return {
            ...evento,
            start: new Date(evento.start),
            end: new Date(evento.end),
        }
    })
    
    return eventosPreparados;
}