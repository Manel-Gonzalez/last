<template>
  <div>

    <input
      type="text"
      name="newTask"
      id="newTask"
      placeholder="New Task"
      class="rounded mx-3 px-3 bg-slate-300"
      v-model="newTodo"

    />
    <p v-if="emptyNew" class="text-red-400" >{{errorInput}}</p>
    <button type="submit" class="bg-blue-500 rounded px-2 my-2" @click.prevent="addTodo">
      Add Task
    </button>
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
