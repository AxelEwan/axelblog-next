export interface ToDoXMoment {
	id: number
	title: string
	url: string
	created: number
	modified: number
	html: string
	text: string
	comments: number
	likes: number
	shares: number
	category: string
	countdownId: string
}

export interface ToDoXMomentResponse {
	success: boolean
	updated: number
	items: ToDoXMoment[]
	message?: string
}
