<template>
    <div class="myGrid" >
        <div class="grid-title">
            {{ item }}
        </div>

        <div v-if="hovered" class="right">
            <button class="completeit" @click="$emit(markComplete(i))">✓</button>
            <button class="completeit" @click="$emit(makeUrgent(i))">!!</button> </div>
                            
            <div class="left"> 
                <div class="todoitem-details" v-if="details" ><br>
                    Description: {{ description }}<br>
                    Due: {{ duedate }}
                <br>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps(['item', 'hovered', 'details', 'description', 'duedate'])

</script>