<template>
  <div class="lg:w-5/12  md:1/2 w-full px-4 py-2  my-2 first:mt-8 md:first:mt-2 lg:mx-4 rounded bg-opacity-60">
    <p class="text-lg truncate text-xl">{{ item.title }}</p>
    <button @click="deleteTask" class="bg-red-500 rounded transition-colors duration-50 hover:animate-pulse ease-out text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
    <button @click="showEdit" class="bg-blue-500 rounded lg:mx-2 mx-6 my-2 transition-colors duration-50 hover:animate-pulse ease-out text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </button>
    <button @click="completeTask" class="bg-green-500 rounded transition-colors duration-50 hover:animate-pulse ease-out text-white"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>

    
    <div v-if="showInput" class="flex flex-row py">
      <div >
        <input type="text" placeholder="New Title" v-model="editValue">
        <p v-if="emptyEdit" class="text-red-400" >{{errorInput}}</p> 
      </div>
      <button @click="editTask" class="bg-blue-500 rounded px-2 h-fit">Change title</button>
    </div>

  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, reactive } from "vue";
import { useTaskStore } from "../stores/task";
import AppHeader from "../components/AppHeader.vue";

let errorInput = ref("");

let emptyEdit = ref(false);
let editValue = ref("");
let showInput = ref(false);


const emit = defineEmits(["childDelete", "childEdit", "childComplete"]);

const props = defineProps(["item"]);
console.log(props.item.title);

// function that deletes a task
function deleteTask() {
  emit("childDelete", props.item); // sends info to parent
}
// function that edits a task
function editTask() {
  if (editValue.value === "") {
      emptyEdit.value = true;
      errorInput.value = "Title must be filled"
      setTimeout(()=>{
          emptyEdit.value = false// hide error after 3sec
        }, 3000);
  }else{
    emptyEdit.value = false
    const editValues = {
      oldTask: props.item,
      newTask: editValue.value
    }
    emit("childEdit", editValues); // sends info to parent
    console.log(editValues)
    editValue.value= ""
    showInput.value = false
  }
}

function showEdit(){
  if(showInput.value){
    showInput.value = false
  }else {
   showInput.value = true
  }
}

function completeTask(){
  emit("childComplete", props.item); // sends info to parent component
}


</script>

<style></style>
