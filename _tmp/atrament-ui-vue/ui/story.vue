<template>
    <div class="story-container" v-if="story">
        <scene-component v-for="scene in story" :scene="scene" :key="scene.id"></scene-component>
    </div>
</template>

<script>
import Scene from './scene.vue';

export default {
    props: ['story'],
    components: {
        'scene-component': Scene
    }
};
</script>

<style>
.story-container {
    width: 100%;
    margin: auto;
}
</style>
