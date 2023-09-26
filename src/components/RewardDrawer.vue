<template>
    <div class="drawer-container">
        <div class="drawer" :class="{ open: editMode, closed: !editMode }">
            <div class="eye-toggle">
                <EyeControl eye="left"/>
                <EyeControl eye="right"/>
            </div>
            <div class="badge-container">
                <div class="default-holder badge" @click="selectEyeModel('./src/assets/models/eyes/default-eye.glb')">DEF</div>
                <div class="min-holder badge" @click="selectEyeModel('./src/assets/models/eyes/min-eye.glb')">MIN</div>
                <div class="star-holder badge" @click="selectEyeModel('./src/assets/models/eyes/star-eye.glb')">STR</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditModeStore } from '../store/editMode';
import EyeControl from './EyeControl.vue'

export default defineComponent({
    name: 'HomeView',
    setup () {
        const editModeStore = useEditModeStore();

        const selectEyeModel = (model: string) => {
            if (editModeStore.isEditMode) {
                if (editModeStore.isLeftEye) {
                    editModeStore.changeLeftEye(model);
                } else if (editModeStore.isRightEye) {
                    editModeStore.changeRightEye(model);
                }
            }
        };

        return {
            editModeStore,
            selectEyeModel,
        };
    },
    computed: {
        editMode(): boolean {
            return this.editModeStore.editMode;
        },
    },
    components: {
        EyeControl: EyeControl
    }
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
        align-items: center;
        position: fixed;
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
        flex-direction: column;
        padding-top: 25px;

        .badge-container {
            height: 100%;
            width: 75%;
            padding: 25px;
            display: flex;
            justify-content: center;
            gap: 20px;

            .badge {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #7E93BA;
                color: white;
            }
        }
    }
}
</style>