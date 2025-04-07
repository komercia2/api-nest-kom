import { Geolocalizacion } from "src/entities"

import { IGeolocation } from "../interfaces/zones"

export const mapGeolocation = (location: Geolocalizacion): IGeolocation => ({
	id: location.id,
	nombre_sede: location.nombreSede,
	tienda: location.tienda,
	direccion: location.direccion,
	latitud: location.latitud,
	longitud: location.longitud,
	ciudad: location.ciudad,
	foto_tienda: location.fotoTienda,
	horario: location.horario,
	telefono: location.telefono
})
