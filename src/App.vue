<template>
	<v-app>

	<h1 :style="{textAlign:'center', marginTop:'20px'}" class="text-h1">Magnifique To-do List</h1>

	<div :style="{marginLeft:'25px'}">Tâches restantes: {{ store.count }}</div>

	<form method = "POST" @submit.prevent="ajoutTache" class="form-inline">
		<v-text-field placeholder="Entrez une tâche à ajouter" v-model="nouvtache" :style="{width:'20rem', marginLeft:'30px'}"></v-text-field>
		<v-btn color="primary" type="submit">Ajouter une <strong :style="{color:'red', margin:'5px'}"> tâche</strong></v-btn>
	</form>

	<!--<v-btn @click="store.increment">Bouton pour augmenter le total</v-btn>-->

	<p v-if="estFinie()" :style="{marginLeft:'30px'}">Vous n'avez aucune tâche à faire...</p>
	<p v-else :style="{marginLeft:'35px'}">Voici votre To-do List <br>
	<v-checkbox label="Cacher les tâches terminées" v-model="cacherTaches" :style="{marginLeft:'0px'}"></v-checkbox>
</p>
	
<v-list>
        <v-list-item v-for="tache in triTodolist" :key="tache.date">
                <v-list-item-title>
                    <v-checkbox v-model="tache.completed" color="red" :label="tache.title" :style="{textDecoration: tache.completed?'line-through':'', marginLeft:'20px'}" @change="tache.completed ? store.decrement() : store.increment()"></v-checkbox>
                </v-list-item-title>
        </v-list-item>
</v-list>


</v-app>
</template>


<script setup>
import {computed, ref} from 'vue'
import { useCountStore } from '@/stores/count'
// remplacé par v-checkbox de Vuetify: import Checkbox from './Checkbox.vue';
// remplacé par v-btn de Vuetify: import Bouton from './Bouton.vue';

const todolist = ref([]); //exemple d'élément de la liste: {title: "Faire les courses", completed: false, date: Date.now()}

const nouvtache = ref("")
const cacherTaches = ref(false)
const store = useCountStore()


const ajoutTache = () => {
	if (nouvtache.value !== ""){
		todolist.value.push({title: nouvtache.value,
		completed : false,
		date: Date.now()
	});
	nouvtache.value = "";
	store.increment();
	}
}

const estFinie = () => {
	return store.count == 0;
}

const triTodolist = computed(() => {
	if (!estFinie()){
		const triTodolist = todolist.value.toSorted((a,b) => a.completed > b.completed ? 1:-1)
		if (cacherTaches.value == true){
			return triTodolist.filter(t => t.completed == false)
		}
	return triTodolist
	}
})

/*const tachesRestantes = computed(() => {
	return todolist.value.filter(t => t.completed == false).length; inutile car on utilise store.count maintenant
})*/

</script>


<style>
.form-inline {
    display: flex;
    align-items: center;
}
.form-inline > * {
    margin-right: 10px;
}

.text-h1 {
	color: goldenrod;
}
</style>