<template>
<div class="scene-container">
    <div class="text-wrapper">
        <p v-for="paragraph in scene.text" v-html="paragraph"></p>
    </div>
    <div class="choice-wrapper" v-if="scene.isActive">
        <a href="#" v-on:click="select(choice)" v-for="choice in scene.choices" class="choice" v-html="choice.choice"></a>
    </div>
</div>
</template>

<script>
export default {
    props: ['scene'],
    methods: {
        select(choice) {
            this.$atrament.makeChoice(choice.id).then(() => {
		this.$atrament.renderScene();
		this.$SmoothScroll(document.getElementById('atrament-container').scrollHeight,300,undefined,document.getElementById('atrament-container'));
	    });
        }
    }
};
</script>

<style>
.text-wrapper {
    padding: 10px;
    border-top: 1px dashed #333333;
}

.choice-wrapper {
    text-align: left;
    padding-top: 0px;
    padding: 10px;
}

.choice-wrapper a {
    display: block;
    width: 97%;
    background-color: rgba(127,127,127,0.3);
    text-align: center;
    padding: 6px;
    margin-bottom: 5px;
    color: #333399;
}

@media (max-width: 400px) {
    .choice-wrapper a {
        padding-top: 12px;
        padding-bottom: 12px;
    }
}


.choice {
    display: block;
    width: 100%;
    text-decoration: none;
}
</style>
