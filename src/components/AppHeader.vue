<template>
    <header class="flex flex-row bg-slate-900 bg-opacity-80 h-16 ">
        <span class="mx-3 mt-4 text-white h-fit ">{{ user.email }}</span>
        <button @click="handleLogOut" class="bg-red-500 mt-4 rounded px-2 h-fit ">Log Out</button>

    </header>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user";
    import { ref, reactive } from 'vue';
    import router from "../router";

    const userStore = useUserStore();
    const userPinia = storeToRefs(userStore);

    const user = ref(userPinia.user);

    async function handleLogOut(){
        try{
            await userStore.signOut();
            router.push({path:"/auth"})
        }catch(err){
            console.log(err);
        }
    }

</script>

<style>

</style>