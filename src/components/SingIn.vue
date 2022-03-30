<template>
    <form @submit.prevent="handleLogin" class="flex items-center flex-col my-20 pb-28 h-full">
        <div class="flex items-center flex-col  bg-slate-900 bg-opacity-60 px-6 my-3 md:w-2/5 w-5/5 rounded-md shadow">

            <h3 class="mt-3 text-2xl text-white"> Sign In </h3>
            <label for="email" class="w-full mt-3 mb-2 text-white text-lg">Email</label>
            <input type="text" id="email" class="bg-slate-300 w-full rounded-md  border-transparent border-4 border-solid pl-2 focus:border-teal-600 outline-none" placeholder="Email" v-model="emailData">
            
            <label for="password" class="w-full mt-3 mb-2 text-white text-lg">Password</label>
            <input type="password" id="password" class="bg-slate-300 w-full rounded-md  border-transparent border-4 border-solid pl-2 focus:border-teal-600 outline-none" placeholder="Password" v-model="passwordData">
            
            <button @click="handleLogIn"  class="mt-6 bg-slate-900 hover:bg-slate-700  rounded-md w-1/2 h-10 text-white">
                Log In
            </button>

            <button @click="isSignIn=false"  class="my-3 bg-slate-900 hover:bg-slate-700 rounded-md w-1/2 h-10 text-white ">
                Click to Sign Up
            </button>
        </div>
    </form>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user"
    import { ref, reactive } from 'vue'
    import router from '../router';

    let emailData = ref("");
    let passwordData = ref("")

   const userStore = useUserStore();
    const userPinia = storeToRefs(userStore);

    const isSignIn=userPinia.isSignIn; 

    async function handleLogIn(){
        try{
            await userStore.signIn(emailData.value, passwordData.value)
            router.push({path:"/"})
        }catch(err){
            console.log(err)
        }
    }
</script>

<style>

</style>