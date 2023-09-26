<template>
	<div id="view-container">
		<div @click="toggleEditor" class="edit-btn"></div>
		<img id="nwjns-logo" src="@/assets/img/nwjns-logo.png">
		<ModelView/>
		<RewardDrawer/>
	</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { useEditModeStore } from './store/editMode';
import ModelView from './components/ModelView.vue'
import RewardDrawer from './components/RewardDrawer.vue'

export default defineComponent({
    name: 'App',
	methods: {
		toggleEditor() {
			const editStore = useEditModeStore();
			editStore.toggleMode();
		}
	},
	components: {
		ModelView: ModelView,
		RewardDrawer: RewardDrawer
	}
})
</script>

<style lang="scss">
	html, body {
		background-color: rgb(253, 253, 253);
		background-image: linear-gradient(0deg, rgba(85, 129, 232, 0.774) 0%, rgba(207,219,248,1) 64%, rgba(255,255,255,1) 100%);
		height: 100%;
	}

	#app {
		padding: 0;
		height: 100vh;
	}

	.edit-btn {
		position: fixed;
		width: 50px;
		height: 50px;
		z-index: 999;
		border-radius: 50%;
		right: 25px;
		top: 25px;
		border: 1px solid #7e93ba;
		background-color: #dce7fc;
		background-image: url("@/assets/img/pencil.png");
		background-size: 50%;
		background-repeat: no-repeat;
		background-position: center center;
	}

	#view-container {
		position: relative;
		height: 100%;
		overflow: hidden;
		width: 100vw;
		
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