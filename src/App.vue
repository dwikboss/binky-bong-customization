<template>
	<div id="view-container">
		<img id="nwjns-logo" src="./assets/img/nwjns-logo.png">
		<ModelView/>
		<RewardDrawer/>
	</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import ModelView from './components/ModelView.vue'
import RewardDrawer from './components/RewardDrawer.vue'

export default defineComponent({
    name: 'App',
	components: {
		ModelView: ModelView,
		RewardDrawer: RewardDrawer
	}
})
</script>

<style lang="scss">
	html, body {
		background: rgb(253, 253, 253);
		background: linear-gradient(0deg, rgba(85, 129, 232, 0.774) 0%, rgba(207,219,248,1) 64%, rgba(255,255,255,1) 100%);
		height: 100%;
	}

	#app {
		padding: 0;
		height: 100vh;
	}

	#view-container {
		position: relative;
		height: 100%;
		
		#nwjns-logo {
			width: 350px;
			opacity: 0.25;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

</style>