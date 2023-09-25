<template>
    <div class="drawer-container">
        <div class="drawer" :class="{ open: editMode, closed: !editMode }">
            <div class="eye-toggle">
                <div class="toggle-btn left" @click="moveLeftEye">LEFT</div>
                <div class="toggle-btn right">RIGHT</div>
            </div>
            <div class="badge-container">
                <div class="default-holder badge">DEF</div>
                <div class="min-holder badge">MIN</div>
                <div class="star-holder badge">STR</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditModeStore } from '../store/editMode';

export default defineComponent({
	name: 'HomeView',
    methods: {
        moveLeftEye() {

        },
    },
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

        .eye-toggle {
            display: flex;
            gap: 10px;

            .toggle-btn {
                width: 75px;
                background-color: #ffffff;
                border: 1px solid #7E93BA;
                height: 100%;
                border-radius: 999px;
                color: #7E93BA;
                font-weight: 700;
            }
        }
    }
}
</style>