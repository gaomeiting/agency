<template>
	<transition name="fade" transition-mode="out-in">
 	<div class="nav-wrap">
		<nav-menu @selectNav="changeNavMenu" @signOut="signOut" :currentIndex="currentIndex"></nav-menu>
 	</div>
 	<div class="table-wrap">
 		<table-list></table-list>
 	</div>
 	</transition>
</template>
<script>
import NavMenu from 'base/nav-menu/nav-menu';
import TableList from 'base/table-list/table-list';
export default {
	data() {
		return {
			currentIndex: 0
		}
	},
	methods: {
		changeNavMenu(index) {
			console.log(index)
			this.currentIndex = index;
		},
		signOut() {
			console.log("退出")
		}	
	
	},
	components: {
		NavMenu,
		TableList
	}
}
</script>

<style scoped lang="scss">
.nav-wrap {
	width: 100%;
	background: #24292e;
}
</style>