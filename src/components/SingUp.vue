<template>
      <div  class="flex items-center flex-col">
        <h3> Sign Up </h3>
        <label for="email" class="w-1/3">Email</label>
        <input type="text" id="email" class="bg-slate-300 w-1/3" placeholder="Email" v-model="email">
        
        <label for="password" class="w-1/3">Password</label>
        <input type="password" id="password" class="bg-slate-300 w-1/3" placeholder="Password" >
        
        <label for="confirmPasword" class="w-1/3">Confirm Password</label>
        <input type="password" id="confirmPasword" class="bg-slate-300 w-1/3" placeholder="Confirm Password">
        
        <button>
            Register
        </button>



        
    </div>
</template>

<script >
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user"

</script>

<style>

</style>