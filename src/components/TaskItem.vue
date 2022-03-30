<template>
  <div>
    <p class="">{{ item.title }}</p>
    <button @click="deleteTask" class="bg-red-500 rounded px-2">Delete</button>
    <button @click="showEdit" class="bg-blue-500 rounded px-2 mx-2">Edit</button>
    <button @click="completeTask" class="bg-green-500 rounded px-2">Complete</button>
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
