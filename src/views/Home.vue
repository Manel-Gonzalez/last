<template>
    <AppHeader/>
    <section>
        <h1>Card Task</h1>
        <NewTask @childAddTodo="addTodo"/>
        <div class="flex flex-row justify-between">
            <section class="bg-gray-100 rounded px-3 py-3 mx-3 my-3">
                <h2>To Do</h2>
                <TaskItem
                v-for="task in notCompletedTasks" :key="task.id" :item="task"
                @childDelete="removeTask" 
                @childEdit="editTask" 
                @childComplete="completeTask"/>
            </section>
            <section class="bg-gray-100 rounded px-3 py-3 mx-3 my-3">
                <h2>Completed</h2>
                <TaskItem
                v-for="task in completedTasks" :key="task.id" :item="task"
                @childDelete="removeTask" 
                @childEdit="editTask" 
                @childComplete="completeTask"/>
            </section>
        </div>



    </section>    
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useUserStore } from "../stores/user"
    import { ref, reactive } from 'vue'
    import { useTaskStore } from "../stores/task";
    import router from "../router";
    import AppHeader from "../components/AppHeader.vue";
    import NewTask from "../components/NewTask.vue";
    import TaskItem from "../components/TaskItem.vue";
    const tasks = ref([])
    const completedTasks = ref([])
    const notCompletedTasks = ref([])
    let haveTasks = ref(false)


    const userStore = useUserStore();
    const userPinia = storeToRefs(userStore);
    const taskStore = useTaskStore();

    // function that handleLogOut for user using pinia global Store
    async function handleLogOut(){
        try{
            await userStore.signOut();
            router.push({path:"/auth"})
        }catch(err){
            console.log(err);
        }
    }
    // Function that get all tasks from user
    async function getTasks(){
        tasks.value = await taskStore.fetchTasks();
        sortTask();
    }
    getTasks();

    //function to add individual task
    async function addTodo(newTodo){
        await useTaskStore().addTask(newTodo)
        getTasks();
    }

    //function to delete task
    async function removeTask(item){
        await useTaskStore().deleteTask(item.id);
        getTasks();
    }

    //function to edit task
    async function editTask(item){
        const newId= item.oldTask.id;
        const newTitle = item.newTask;
        await useTaskStore().editTask(newId,newTitle);
        getTasks();
    }
    async function completeTask(item){
        const newId= item.id;
        const isCompleted =!item.is_complete ;
        await useTaskStore().completeTask(newId,isCompleted);
        if(!haveTasks.value){
            haveTasks.value = false
        }else{
            haveTasks.value = true
        }
        console.log(haveTasks)
        console.log(isCompleted)
        getTasks();
    }

    async function sortTask(){
        completedTasks.value = [];
        notCompletedTasks.value = [];
        tasks.value.forEach(task => {
            if(task.is_complete === true) {
                completedTasks.value.push(task)
            } else {
                notCompletedTasks.value.push(task)
            }
        })
    }



</script>

<style>

</style>