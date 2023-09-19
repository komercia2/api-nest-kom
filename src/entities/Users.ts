import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm"

import { Carritos } from "./Carritos"
import { CarritosWhatsapp } from "./CarritosWhatsapp"
import { Ciudades } from "./Ciudades"
import { Clientes } from "./Clientes"
import { DireccionesUsuario } from "./DireccionesUsuario"
import { LogTiendas } from "./LogTiendas"
import { MensajeOrden } from "./MensajeOrden"
import { Mensajes } from "./Mensajes"
import { SubscriptionPayments } from "./SubscriptionPayments"
import { Subscriptions } from "./Subscriptions"
import { TiendaPromociones } from "./TiendaPromociones"
import { Tiendas } from "./Tiendas"
import { TiendasUsuarios } from "./TiendasUsuarios"
import { UserAdmins } from "./UserAdmins"
import { UserCreditCard } from "./UserCreditCard"
import { UsersInfo } from "./UsersInfo"
import { UsersSubscriptions } from "./UsersSubscriptions"
import { Vacantes } from "./Vacantes"

@Index("users_email_unique", ["email"], { unique: true })
@Index("users_identificacion_unique", ["identificacion"], { unique: true })
@Index("users_tienda_foreign", ["tienda"], {})
@Index("users_ciudad_foreign", ["ciudad"], {})
@Entity("users", { schema: "komercia_prod" })
export class Users {
	@PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
	id: number

	@Column("char", { name: "id_facebook", nullable: true, length: 80 })
	idFacebook: string | null

	@Column("varchar", { name: "nombre", length: 60 })
	nombre: string

	@Column("varchar", {
		name: "email",
		nullable: true,
		unique: true,
		length: 255
	})
	email: string | null

	@Column("varchar", { name: "password", length: 255 })
	password: string

	@Column("varchar", { name: "foto", length: 90, default: () => "'user.jpeg'" })
	foto: string

	@Column("int", { name: "ciudad", unsigned: true })
	ciudad: number

	@Column("int", { name: "tienda", unsigned: true })
	tienda: number

	@Column("int", { name: "rol", default: () => "'1'" })
	rol: number

	@Column("tinyint", { name: "activo", width: 1, default: () => "'1'" })
	activo: boolean

	@Column("varchar", { name: "remember_token", nullable: true, length: 100 })
	rememberToken: string | null

	@Column("timestamp", { name: "created_at", nullable: true })
	createdAt: Date | null

	@Column("timestamp", { name: "updated_at", nullable: true })
	updatedAt: Date | null

	@Column("varchar", {
		name: "tipo_identificacion",
		nullable: true,
		length: 255
	})
	tipoIdentificacion: string | null

	@Column("varchar", {
		name: "identificacion",
		nullable: true,
		unique: true,
		length: 255
	})
	identificacion: string | null

	@Column("tinyint", {
		name: "panel",
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	panel: boolean | null

	@Column("tinyint", {
		name: "editor",
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	editor: boolean | null

	@Column("tinyint", {
		name: "app",
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	app: boolean | null

	@Column("varchar", { name: "foto_facebook", nullable: true, length: 255 })
	fotoFacebook: string | null

	@Column("varchar", {
		name: "mercado_libre_client",
		nullable: true,
		length: 255
	})
	mercadoLibreClient: string | null

	@Column("tinyint", {
		name: "opt_in",
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	optIn: boolean | null

	@Column("longtext", { name: "fcm_token", nullable: true })
	fcmToken: string | null

	@OneToMany(() => Carritos, (carritos) => carritos.reseller)
	carritos: Carritos[]

	@OneToMany(() => Carritos, (carritos) => carritos.usuario2)
	carritos2: Carritos[]

	@OneToMany(() => CarritosWhatsapp, (carritosWhatsapp) => carritosWhatsapp.users)
	carritosWhatsapps: CarritosWhatsapp[]

	@OneToMany(() => Clientes, (clientes) => clientes.user)
	clientes: Clientes[]

	@OneToMany(() => DireccionesUsuario, (direccionesUsuario) => direccionesUsuario.user)
	direccionesUsuarios: DireccionesUsuario[]

	@OneToMany(() => LogTiendas, (logTiendas) => logTiendas.usuario)
	logTiendas: LogTiendas[]

	@OneToMany(() => MensajeOrden, (mensajeOrden) => mensajeOrden.user)
	mensajeOrdens: MensajeOrden[]

	@OneToMany(() => Mensajes, (mensajes) => mensajes.user2)
	mensajes: Mensajes[]

	@OneToMany(() => SubscriptionPayments, (subscriptionPayments) => subscriptionPayments.consultant)
	subscriptionPayments: SubscriptionPayments[]

	@OneToMany(() => SubscriptionPayments, (subscriptionPayments) => subscriptionPayments.user)
	subscriptionPayments2: SubscriptionPayments[]

	@OneToMany(() => Subscriptions, (subscriptions) => subscriptions.consultant)
	subscriptions: Subscriptions[]

	@OneToMany(() => Subscriptions, (subscriptions) => subscriptions.user)
	subscriptions2: Subscriptions[]

	@OneToMany(() => TiendaPromociones, (tiendaPromociones) => tiendaPromociones.user)
	tiendaPromociones: TiendaPromociones[]

	@OneToMany(() => TiendasUsuarios, (tiendasUsuarios) => tiendasUsuarios.users)
	tiendasUsuarios: TiendasUsuarios[]

	@OneToMany(() => UserAdmins, (userAdmins) => userAdmins.user)
	userAdmins: UserAdmins[]

	@OneToMany(() => UserCreditCard, (userCreditCard) => userCreditCard.users)
	userCreditCards: UserCreditCard[]

	@ManyToOne(() => Ciudades, (ciudades) => ciudades.users, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "ciudad", referencedColumnName: "id" }])
	ciudad2: Ciudades

	@ManyToOne(() => Tiendas, (tiendas) => tiendas.users, {
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION"
	})
	@JoinColumn([{ name: "tienda", referencedColumnName: "id" }])
	tienda2: Tiendas

	@OneToOne(() => UsersInfo, (usersInfo) => usersInfo.idUser2)
	usersInfo: UsersInfo

	@OneToMany(() => UsersSubscriptions, (usersSubscriptions) => usersSubscriptions.users)
	usersSubscriptions: UsersSubscriptions[]

	@OneToMany(() => Vacantes, (vacantes) => vacantes.users)
	vacantes: Vacantes[]
}
