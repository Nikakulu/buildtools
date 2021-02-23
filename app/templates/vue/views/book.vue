<template>
    <div>
        <delegate-duties-archives ref="book"></delegate-duties-archives>
    </div>
</template>

<script>
    import delegateDutiesArchives from '@/components/book/delegateDutiesArchives'
    export default {
        name: "book",
        components:{delegateDutiesArchives},
        mounted(){
            this.$refs.book.openArchives();
        }
    }
</script>

<style scoped>

</style>