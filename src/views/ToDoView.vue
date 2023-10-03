<script setup>

import { ref } from 'vue'

const todoList = ref([])
const todoneList = ref([])
const todoId = ref(0)
const todoItem = ref('')
const todoDone = ref(false)
const todoUrgent = ref(false)

const hover = ref(false)

function addItem(){
    todoList.value.push({
        id: todoId.value++,
        item: todoItem.value,
        complete: todoDone.value,
        urgent: todoUrgent.value}
    )
}

function completeItem(){
    todoneList.value.push({
        id: todoId.value++,
        item: todoItem.value,
        complete: todoDone.value,
        urgent: todoUrgent.value,
        }
    )
}

function removeItem(item){
    todoList.value = todoList.value.filter((t) => t !== item)
    completeItem()
    
}
function makeUrgent(item){
    item.urgent = !item.urgent
}





</script>
<template>

<div id="no" class="myGrid">
    <main>To Do List: </main>
    <input type="text" v-model="todoItem">
    <button class="buttonstyle" @click="addItem">add item to todo list</button>

    <left>
    <ul>
        <li v-for="i in todoList" :key="i.id">
            <!-- <span>{{ i.item }}</span> -->
            <!-- <span v-if=" i.urgent"> {{ i.item }}</span>
            <span v-else> u no fail</span> -->
            <span @mouseover="hover = true" @mouseleave="hover = false">
            <span :class="{urgentitem:i.urgent}"> {{ i.item }}</span>

            <span v-if="hover">
            <button class="removeit" @click="removeItem(i)">✓</button>
            <button @click="makeUrgent(i)">!!</button> </span></span>
        </li>
    </ul>
    </left>
    <right class="right">
        this is to done list
        <ul>
        <li v-for="i in todoneList" :key="i.id">
            <!-- <span>{{ i.item }}</span> -->
            <!-- <span v-if=" i.urgent"> {{ i.item }}</span>
            <span v-else> u no fail</span> -->
            <span @mouseover="hover = true" @mouseleave="hover = false">
            <span :class="{urgentitem:i.urgent}"> {{ i.item }}</span>

            <span v-if="hover">
            <button class="removeit" @click="removeItem(i)">✓</button>
            <button @click="makeUrgent(i)">!!</button> </span></span>
        </li>
    </ul>
    </right>
</div>


</template>
<style scoped>

#no{
    border: 1pc;
}

.myGrid{
    display: grid;
    grid-template-columns: 1fr, 1fr;
    grid-template-areas: 
    "a a" 
    "b c";
    margin: 2rem 0;
}
.myGrid main{
    grid-area: a;
    padding: 1rem;
    background-color: pink;
}
.myGrid section:left{
    grid-area: b;
    padding: 1rem;
    background-color: aqua;
}
.myGrid section:right{
    grid-area: c;
    padding: 1rem;
    background-color: magenta;
}
.urgentitem{
    color: red;
    background-color: orange;
}
.todolist{
    color: pink;
    padding-top: 10%;
    padding-left: 5%;
}

.removeit{
    color: rgb(72, 255, 0);
    background-color: rgba(255, 255, 255, 0);
    border: 0cap;
}

#urgent{
    color: red;
}

</style>