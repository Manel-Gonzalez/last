<template>
    <div class="flex flex-col">
        <SingIn v-if="isSignIn"/>
        <SingUp v-else/>

        <button v-if="isSignIn" @click="isSignIn=false" class="">
            Click to Sign Up
        </button>

        <button v-else @click="isSignIn=true">
            Click to Sign In
        </button>


    </div>




</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user"
    import { reactive } from 'vue'
    import SingIn from "../components/SingIn.vue";
    import SingUp from "../components/SingUp.vue";

    const x = useUserStore();
    const y = storeToRefs(x);

    const isSignIn=y.isSignIn; 
</script>

<style>

</style>