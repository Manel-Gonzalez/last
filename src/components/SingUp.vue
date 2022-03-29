<template>
    <div >
        <form @submit.prevent="handleLogin" class="flex items-center  flex-col my-16">

            <div  class="flex items-center flex-col bg-emerald-500 w-2/5 bg-opacity-1 px-3 my-3 rounded-md shadow">
                <h3 class="mt-3 text-xl">Sign Up</h3>
                <label for="email" class="w-full mt-3">Email</label>
                <input type="text" id="email" class="bg-slate-300 w-full rounded-md" placeholder="Email" v-model="emailData" required>
                
                <label for="password" class="w-full mt-3 ">Password</label>
                <input type="password" id="password" class="bg-slate-300 w-full rounded-md" placeholder="Password" v-model="passwordData" required>
                
                <label for="confirmPasword" class="w-full mt-3">Confirm Password</label>
                <input type="password" id="confirmPasword" class="bg-slate-300 w-full rounded-md  border-transparent border-2 border-solid active:border-teal-600" placeholder="Confirm Password" v-model="password2Data" required >
                <p v-if="pswMatch" class="text-rose-500"> Passwords don't match</p>
                
                <button @click="handleLogin" class="mt-6 bg-slate-900 rounded-md w-1/2 h-10 text-white">
                    Register
                </button>

                
                <button @click="isSignIn=true" class="my-3 bg-slate-900 rounded-md w-1/2 h-10 text-white">
                    Click to Sign In
                </button>
            </div>

                
        </form>
    </div>
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