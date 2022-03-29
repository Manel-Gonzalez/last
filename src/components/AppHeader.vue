<template>
    <header>

        <button @click="handleLogOut" class="bg-red-500 rounded px-2">Log Out</button>

    </header>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user"
    import { ref, reactive } from 'vue'
    import router from "../router";
    

    const userStore = useUserStore();
    const userPinia = storeToRefs(userStore);

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