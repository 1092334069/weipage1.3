class ImageAction {
	constructor() {
		this.weiPageThis = undefined
	}
	init(that) {
		this.weiPageThis = that
	}
	getImageList() {
		const _this = this
		$.ajax({
			url: '/api/image/getPageList',
			type: 'get',
			data: {
				page: _this.weiPageThis.imageTabelData.page,
				size: _this.weiPageThis.imageTabelData.size
			},
			dataType: 'json',
			success: (res) => {
				if (res && res.code === 200 && res.data) {
					_this.weiPageThis.imageTabelData.list = res.data.list
					_this.weiPageThis.imageTabelData.total = res.data.total
				}
			}
		})
	}
	uploadImage() {

	}
	addImage() {

	}
	deleteImage() {

	}
}

const imageAction = new ImageAction()

export {
	imageAction
}
