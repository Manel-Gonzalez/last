import { defineStore } from 'pinia';
import { supabase } from '../supabase';
import { useUserStore } from './user'
 
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null
  }),
  actions: {
    //action to get all task from the user
    async fetchTasks () {
      const { data: tasks } = await supabase
        .from('tasks').select('*').order('id', { ascending: true });//takes all tasks and show in ascending id order
      this.tasks = tasks;
      return tasks
    },
    //action to add 1 post
    async addTask(title){
      const {data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title : title,
          is_complete: false

        },
      ]);
    },
    //action to delete 1 post
    async deleteTask(id){
      const {data, error } = await supabase
      .from("tasks")
      .delete()
      .match({id: id})
    },
    //action for edit tasks
    async editTask(id, title){
      const { data, error } = await supabase
      .from('tasks')
      .update({ title: title })
      .match({ id: id})
    },
    //action for complete task
    async completeTask(id, boolean){
      let { data: tasks, error } = await supabase
        .from('tasks')
        .update({is_complete: boolean})
        .match({id: id})
    }
  }
});