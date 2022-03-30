<template>
    <form @submit.prevent="handleLogin" class="flex items-center  flex-col my-20 pb-28 h-full">
        <div  class="flex items-center flex-col bg-slate-900 w-2/5 bg-opacity-60 px-6 my-3 rounded-md shadow">
            
            <h3 class="mt-3 text-2xl text-white">Sign Up</h3>
            <label for="email" class="w-full mt-3 mb-2 text-white text-lg">Email</label>
            <input type="text" id="email" class="bg-slate-300 w-full rounded-md  border-transparent border-4 border-solid pl-2 focus:border-teal-600 outline-none" placeholder="Email" v-model="emailData" required>
            
            <label for="password" class="w-full mt-3 mb-2 text-white text-lg">Password</label>
            <input type="password" id="password" class="bg-slate-300 w-full rounded-md  border-transparent border-4 border-solid pl-2 focus:border-teal-600 outline-none" placeholder="Password" v-model="passwordData" required>
            
            <label for="confirmPasword" class="w-full mt-3 mb-2 text-white text-lg">Confirm Password</label>
            <input type="password" id="confirmPasword" class="bg-slate-300 w-full rounded-md  border-transparent border-4 border-solid pl-2 focus:border-teal-600 outline-none" placeholder="Confirm Password" v-model="password2Data" required >
            <p v-if="pswMatch" class="text-rose-500"> Passwords don't match</p>
            
            <button @click="handleLogin" class="mt-6 bg-slate-900 hover:bg-slate-700  rounded-md w-1/2 h-10 text-white">
                Register
            </button>

            
            <button @click="isSignIn=true" class="my-3 bg-slate-900 hover:bg-slate-700  rounded-md w-1/2 h-10 text-white">
                Click to Sign In
            </button>
        </div>

                
        </form>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user"
    import { ref, reactive } from 'vue'

    let emailData = ref('')
    let passwordData = ref('')
    let password2Data = ref('')

    let pswMatch = ref(false)


    const userStore = useUserStore();
    const userPinia = storeToRefs(userStore);

    const isSignIn=userPinia.isSignIn; 


    async function handleLogin(){
        try{
            if(passwordData.value === password2Data.value){
                await userStore.signUp(emailData.value,passwordData.value)


            }else{
                pswMatch.value = true
                console.log(pswMatch +"  passwords not match")
            }
        }catch(err){
            console.log(err)
        }
  
    }
</script>

<style>

</style>