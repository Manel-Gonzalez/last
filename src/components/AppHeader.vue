<template>
    <header class="flex flex-row bg-slate-900 bg-opacity-80 h-16 ">
        <span class="mx-3 mt-4 text-white h-fit ">{{ user.email }}</span>
        <button @click="handleLogOut" class="bg-red-500 mt-4 rounded px-2 mr-2 h-fit"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg></button>

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