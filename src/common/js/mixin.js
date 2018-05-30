
export const getCommon = {
	data() {
		return {
			loading: true,
			currentPage: 1,
			list: [],
			size: 0,
			total: 0

		}
	},
	created() {
		this._getSingers({
				page: 0,
				size: this.currentSize
			});
	},
	methods: {
		queryChange(query) {
			this._getSingers({
				page: 0,
				size: this.currentSize,
				key: query
			});
		},
		handleSizeChange(page) {
			this._getSingers({
				page: page-1,
				size: this.currentSize
			});
		},
		handleCurrentChange(page) {
			console.log(page, "改变")
			this._getSingers({
				page: page-1,
				size: this.currentSize
			});
		},
		goAdd(url) {
			this.$router.push(url)
		}
	
	},
};