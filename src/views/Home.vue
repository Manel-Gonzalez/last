<template>
    <AppHeader/>
    <section class="md:px-12">
        <h1 class="text-center text-6xl text-slate-50 drop-shadow-4xl font-bold my-10">Card Task</h1>
        <div class="w-full bg-slate-900 bg-opacity-80 min-h-fit rounded-md shadow pb-10">
            <NewTask @childAddTodo="addTodo"/>
            <div class=" justify-between w-full flex flex-col md:flex-row">
                <div class="w-auto md:w-1/2 h-full mx-3">
                    <h2 class="text-white text-4xl text-center mt-4">To Do</h2>
                    <section class="flex flex-row flex-wrap">
                        <TaskItem
                        v-for="task in notCompletedTasks" :key="task.id" :item="task"
                        class="bg-amber-200 "
                        @childDelete="removeTask"
                        @childEdit="editTask" 
                        @childComplete="completeTask"/>
                 </section>  
                </div>
                <div class="w-auto md:w-1/2 h-full mx-3">
                    <h2 class="text-white text-4xl text-center mt-4">Completed</h2>
                    <section class="flex flex-row flex-wrap">
                        <TaskItem
                        v-for="task in completedTasks" :key="task.id" :item="task"
                        class="last:mb-20 md:last:mb-2 bg-emerald-400"
                        @childDelete="removeTask" 
                        @childEdit="editTask" 
                        @childComplete="completeTask"/>
                    </section>
                </div>
            </div>

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