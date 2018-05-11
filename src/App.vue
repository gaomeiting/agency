<template>
	<div id="app">
		<div class="nav-wrap">
			<nav-menu @selectNav="changeNavMenu" @signOut="signOut" :currentIndex="currentIndex"></nav-menu>
	 	</div>
		<keep-alive>
		 <router-view></router-view>
		</keep-alive>
		
	</div>
</template>

<script>
import NavMenu from 'base/nav-menu/nav-menu';

export default {
	data() {
		return {
			currentIndex: 0,
		}
	},
	methods: {
		changeNavMenu(index) {
			this.currentIndex = index;
		},
		signOut() {
			console.log("退出")
		}
	},
	watch: {
		currentIndex(newVal, oldVal) {
			if(newVal === oldVal) return;
			switch(newVal) {
				case 0:
					break;
				case 1:
					this.$router.push("/singer")
					break;
				case 2:
					break;
				case 3:
					this.$router.push("/stories")
					break;
				case 4:
					break;	
			}
		}
	},
	components: {
		NavMenu
	}
}
</script>

<style lang="scss" scoped>
.nav-wrap {
	width: 100%;
	background: #24292e;
}
</style>
