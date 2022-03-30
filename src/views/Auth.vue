<template>
    <div class="flex flex-col py-60 ">
        <h1 class="text-center text-4xl text-slate-50 drop-shadow-4xl font-bold ">Welcome to The Vue Task App</h1>
        <SingIn v-if="isSignIn"/>
        <SingUp v-else/>

        
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