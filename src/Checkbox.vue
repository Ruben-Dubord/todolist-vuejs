<template>
    <label :style="{marginLeft:'35px'}"><input type="checkbox" v-model="model">{{ label }}</input></label>
</template>

<script setup>

const props = defineProps({
    label: String
})

const emits = defineEmits(['check', 'uncheck'])

const onChange = (event) => {
    if (event.currentTarget.checked){
        emits('check', event.currentTarget)
    }
    else{
        emits('uncheck', event.currentTarget)
    }
}

const model = defineModel()

</script>