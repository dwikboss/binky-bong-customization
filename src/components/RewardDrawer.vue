<template>
    <div class="drawer-container">
        <div class="drawer">
            <div class="eye-toggle">
                <div @click="switchEye" class="toggle-btn left" :class="{ 'toggle-btn': true, 'left': selectedEye === 1, 'right': selectedEye === 2 }"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HomeView',
	data() {
		return {
            selectedEye: 1 as Number,
		};
	},
	methods: {
        switchEye() {
            console.log(this.selectedEye);
            if (this.selectedEye === 1) {
                this.selectedEye = 2;
            } else {
                this.selectedEye = 1;
            }
        }
	},
	components: {
    },
});
</script>

<style lang="scss">
.drawer-container { 
    overflow: hidden;

    .drawer {
        display: flex;
        justify-content: center;
        position: absolute;
        background-color: #FFFFFF;
        z-index: 999;
        height: 28vh;
        bottom: 0;
        border-top-left-radius: 20%;
        border-top-right-radius: 20%;
        width: 100%;
        -webkit-box-shadow: 0px -2px 10px -3px rgba(38,64,136,0.4);
        -moz-box-shadow: 0px -2px 10px -3px rgba(38,64,136,0.4);
        box-shadow: 0px -2px 10px -3px rgba(38,64,136,0.4);
        padding-top: 25px;

        .eye-toggle {
            border: 1px solid #7E93BA;
            border-radius: 999px;
            width: 125px;
            height: 20px;
            padding: 5px;

            .toggle-btn {
                background-color: #7E93BA;
                width: 48%;
                height: 100%;
                border-radius: 999px;
                transition: all 0.3s ease;
                display: flex;
            }

            .toggle-btn.left {
                float: left;
            }

            .toggle-btn.right {
                float: right;
            }
        }
    }
}
</style>