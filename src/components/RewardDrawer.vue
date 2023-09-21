<template>
    <div class="drawer-container">
        <div class="drawer" :class="{ open: editMode, closed: !editMode }">
            <div class="eye-toggle">
                <div class="toggle-btn left"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditModeStore } from '../store/editMode';

export default defineComponent({
	name: 'HomeView',
    computed: {
        editMode(): boolean { 
            const editStore = useEditModeStore();
            return editStore.isEditMode();
        }
    },
	components: {
    },
});
</script>

<style lang="scss">
.drawer-container {
    .drawer.closed {
        transform: translateY(30vh);
    }

    .drawer.open {
        transform: translateY(0vh);
    }

    .drawer {
        transition: all 250ms ease;
        display: flex;
        justify-content: center;
        position: absolute;
        background-color: #FFFFFF;
        z-index: 999;
        height: 35vh;
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