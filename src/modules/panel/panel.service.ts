import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Carritos, DeliveryStatus, Productos, ProductosInfo } from "src/entities"
import { Like, Repository } from "typeorm"

import { GetProductsDtos } from "./dtos/get-productos.dtos"

@Injectable()
export class PanelService {
	constructor(
		@InjectRepository(Productos) private productosRepository: Repository<Productos>,
		@InjectRepository(ProductosInfo) private productosInfoRepository: Repository<ProductosInfo>,
		@InjectRepository(DeliveryStatus) private deliveryStatus: Repository<DeliveryStatus>,
		@InjectRepository(Carritos) private carritosRepository: Repository<Carritos>
	) {}

	async updateDeliveryStatus(deliveryStatusID: number, cartID: number) {
		const cart = await this.carritosRepository.findOne({ where: { id: cartID } })

		if (!cart) throw new NotFoundException("Carrito no encontrado")

		const deliveryStatus = await this.deliveryStatus.findOne({
			where: { id: deliveryStatusID.toString() }
		})

		if (!deliveryStatus) throw new NotFoundException("Estado de entrega no encontrado")

		cart.deliveryStatus = deliveryStatus
		cart.deliveryStatusId = deliveryStatusID.toString()

		await this.carritosRepository.save(cart)
	}

	async getDeliveryStatus() {
		return this.deliveryStatus.find()
	}

	async getShortAuxDescription(productID: number) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")

		return { shortAuxDescription: product.descripcionCortaAuxiliar }
	}

	async updateShortAuxDescription(productID: number, shortAuxDescription: string) {
		const product = await this.productosInfoRepository.findOne({ where: { id: productID } })

		if (!product) throw new NotFoundException("Producto no encontrado")
		if (shortAuxDescription.length > 150) {
			throw new BadRequestException(
				"La descripción auxiliar corta no puede tener más de 150 caracteres"
			)
		}

		product.descripcionCortaAuxiliar = shortAuxDescription

		await this.productosInfoRepository.save(product)
	}

	async getProductos(storeID: number, getProductsDtos: GetProductsDtos) {
		const { name, page, limit, categoryID, freeShipping, withVariants, favorite } = getProductsDtos

		const query = this.productosRepository
			.createQueryBuilder("productos")
			.where("productos.tienda = :storeID", { storeID })
			.andWhere("productos.activo = 1")
			.andWhere("productos.deletedAt IS NULL")
			.orderBy("productos.createdAt", "DESC")
			.skip((page - 1) * limit)
			.take(limit)

		if (name) query.where({ nombre: Like(`%${name}%`) })
		if (categoryID) query.andWhere("productos.categoriaProducto = :categoryID", { categoryID })
		if (freeShipping) query.andWhere("productos.envioGratis = :freeShipping", { freeShipping })
		if (withVariants) query.andWhere("productos.conVariante = :withVariants", { withVariants })
		if (favorite) query.andWhere("productos.favorito = :favorite", { favorite })

		const [products, total] = await query.getManyAndCount()

		return {
			data: products,
			pagination: {
				total: Math.ceil(total / limit),
				page: +page,
				limit: +limit,
				hasPrev: page > 1,
				hasNext: page < Math.ceil(total / limit)
			}
		}
	}
}
