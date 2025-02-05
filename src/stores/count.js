// filepath: /home/ruben/Programmation/todolist-pinia/src/stores/count.js
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useCountStore = defineStore('count', () => {
  const count = ref(0);
  
  const increment = () => {
    count.value++;
  };

  const decrement = () => {
    count.value--;
  };

  return { count, increment, decrement };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCountStore, import.meta.hot));
}