<script setup>

import {ref, computed} from 'vue'

const todoList = ref([])
const todoId = ref(0)
const todoItem = ref('')
const todoDescrip = ref('')
const todoDate = ref('')
const todoHovered = ref(false)
const todoDetails = ref(false)

const todoDone = ref(false)
const todoUrgent = ref(false)

const showList = ref(true)

const headermsg = ref('Your ToDo List')

const showToDoOptions = ref(true)
const listViewButton = ref('ToDo List')
const newToDoButton = ref('New ToDo?')

function addItem(){
    todoList.value.push({
        id: todoId.value++,
        item: todoItem.value,
        complete: todoDone.value,
        urgent: todoUrgent.value,
        hoverItem: todoHovered.value,
        description: todoDescrip.value,
        dateDue: todoDate.value,
        showDetails: todoDetails.value,
        }
    )
    todoItem.value = ''
    todoDescrip.value = ''
    todoDate.value = ''
    optionsform()
}

function makeUrgent(item){
    item.urgent = !item.urgent
}

function markComplete(item){
    item.complete = !item.complete
}

function deleteItem(item){
    todoList.value = todoList.value.filter((t) => t !== item)
}

function showListdo(){
    showList.value = !showList.value
    if (showList.value === true){
        headermsg.value = "Your ToDo List",
        listViewButton.value = "Done List"
    }
    else 
    headermsg.value = "Your Done List",
    listViewButton.value = "ToDo List"
}



const completedTasks = computed(() => 
  todoList.value.filter(todoDone => todoDone.complete)
);

const pendingTasks = computed(() => 
  todoList.value.filter(todoDone => !todoDone.complete)
);


function optionsform(){
    showToDoOptions.value = !showToDoOptions.value
    if ( showToDoOptions.value){
        newToDoButton.value = "Create new todo?"
    }
    else newToDoButton.value = "Cancel todo"
}


function showDetails(i){
    i.showDetails = !i.showDetails
}

</script>

<template>

<div class="container">
    <div class="header-box">
        <h2 class="list-header" msg="headermsg">{{ headermsg }}</h2>
        <div class="button-section">
            <button class="button-show" @click="showListdo">{{ listViewButton }}</button>
            <button class="button-show" @click="optionsform">{{ newToDoButton }}</button>
        </div>
    </div>

    <div class="todo-form" v-if="!showToDoOptions" >
        Name: <input v-model="todoItem" placeholder="Item Name">
        <br>
        Description: <input v-model="todoDescrip" placeholder="Description">
        <br>    
        Date: <input type="date" v-model="todoDate">
        <br>
        <button class="button-show" @click="addItem">Add Item</button>
    </div>


    <div class="pending-tasks" v-if="showList">
        <span v-for="i in pendingTasks" :key="i.id">
            <li @click="showDetails(i)" class="my-grid" @mouseover="i.hoverItem = true" @mouseleave="i.hoverItem = false"  >    
                <div class="grid-title" :class="{urgentitem:i.urgent}">
                    {{ i.item }}
                </div>
                <div class="right">
                    <span v-if="i.hoverItem" >
                        <button class="completeit" @click.stop="markComplete(i)">✓</button>
                        <button class="completeit" @click.stop="makeUrgent(i)">!!</button> 
                    </span>
                </div>  
                <div class="left" > 
                    <div class="todoitem-details" v-if="i.showDetails" ><br>
                        Description: {{ i.description }}<br>
                        Due: {{ i.dateDue }}<br>
                    </div>
                </div>
            </li>
        </span>        
    </div>

    <div class="pending-tasks" v-if="!showList">
        <span v-for="i in completedTasks" :key="i.id">
            <li @click="showDetails(i)" class="my-grid" @mouseover="i.hoverItem = true" @mouseleave="i.hoverItem = false"  >    
                <div class="grid-title" :class="{urgentitem:i.urgent}">
                    {{ i.item }}
                </div>
                <div class="right">
                    <span v-if="i.hoverItem" >
                        <button class="completeit" @click.stop="markComplete(i)">✔</button>
                        <button class="completeit" @click.stop="makeUrgent(i)">!!</button> 
                        <button class="completeit" @click.stop="deleteItem(i)">✘</button> 
                    </span>
                </div>  
                <div class="left" > 
                    <div class="todoitem-details" v-if="i.showDetails" ><br>
                        Description: {{ i.description }}<br>
                        Due: {{ i.dateDue }}<br>
                    </div>
                </div>
            </li>
        </span>        
    </div>
    <!-- <div>
        <h1>this should be from component</h1>
        <ToDoComponent v-for="(item, index) in todoList"
            :item="item.item"
            :hovered="item.hovered"
            :details="item.details"
            :description="item.description"
            :duedate="item.dateDue"/>
    </div> -->


</div>
</template>

<style scoped>

.container {
    max-width: 600px;
    margin: 50px auto;
    background: #6e6290;
    padding: 20px;
    border-radius: 8px;
}

.todo-form {
    background-color: #5b3164;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
}

.header-box{
    margin-bottom: 5%;
}

.my-grid{
    display: grid;
    grid-template-columns: 1fr, 3fr;
    grid-template-areas: 
    "a b" 
    "c c";
    margin: 2rem 0rem;

    border: none;
    padding: 5px 10px;
    cursor: pointer;
    background: #412650;
    color: #cac4c4;
    border-radius: 4px;
    font-size: 0.8em;
    
    width: 100%;      
    height: 100%;     
    position: relative;
}

.grid-title{
    font-size: 140%;
    color: #fff;
}

.completeit{
    border: none;
    cursor: pointer;
    background: #33333300;
    color: #a93db5;
    border-radius: 0px;
    font-size: 100%;

}

.urgentitem{
    color: orange;
}

h2 {
    text-align: center;
    color: #333;
    border-bottom: 2px solid #5b386a;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.list-header{
    color: rgb(222, 125, 219);
    text-align: center;
    margin-bottom: 10px;
}

li {
    border-bottom: 1px solid #e7e7e7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(35, 35, 35);
}

li:last-child {
    border-bottom: none;
}



.button-section{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.button-show {
    border: none;
    padding: 5% 15%;
    cursor: pointer;
    background: #2c203b;
    color: #fff;
    border-radius: 0px;
    font-size: 0.8em;
    text-align: center;
}

.button-show:hover {
    background: #5b416d;
}

</style>
