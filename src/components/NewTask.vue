<template>
  <div class="flex flex-row flex-wrap lg:px-10">

    <input
      type="text"
      name="newTask"
      id="newTask"
      placeholder="New Task"
      class="h-8 w-8/12 pl-2 my-6 ml-2 bg-slate-300 rounded-md  border-transparent border-4 border-solid  focus:border-teal-600 outline-none"
      v-model="newTodo"

    />
    <button type="submit" class="h-8 ml-2 lg:ml-10 my-6 w-3/12 bg-blue-500 rounded" @click.prevent="addTodo">Add Task</button>
    <p v-if="emptyNew" class="text-red-400 ml-8 text-lg " >{{errorInput}}</p>
    <hr />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import router from "../router";
import AppHeader from "../components/AppHeader.vue";

const emit = defineEmits([
  "childAddTodo",
  ])

let newTodo = ref("")//empty for fill with new Task
let emptyNew = ref(false)// flag for show error or not
let errorInput = ref("")// empty for custom errors



// function adds task
function addTodo(){
    if (newTodo.value === "") {
        emptyNew.value = true // show error if empty
        errorInput.value = "Input must be  filled"
        
        setTimeout(()=>{
          emptyNew.value = false// hide error after 3sec
        }, 3000);
    }else {
      emptyNew.value = false  // hide error msg
      emit("childAddTodo", newTodo.value);// sends info to parent
      newTodo.value = ""  //clears input field
    }
}
</script>

<style></style>
