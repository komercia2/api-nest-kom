interface IOrderHookEntityProps {
	readonly storeId: number
	readonly orderId: number
	readonly paymentMethod: string
	readonly amount: number
}

export class OrderHookEntity implements IOrderHookEntityProps {
	readonly storeId: number
	readonly orderId: number
	readonly paymentMethod: string
	readonly amount: number

	private constructor(props: IOrderHookEntityProps) {
		this.storeId = props.storeId
		this.orderId = props.orderId
		this.paymentMethod = props.paymentMethod
		this.amount = props.amount
	}

	static create(props: IOrderHookEntityProps): OrderHookEntity {
		return new OrderHookEntity(props)
	}
}
