<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div class="tree-genealogy">
            <!-- <TreeChart :json="treeData" @click-node="clickNode"/> -->
            <VueFamilyTree :tree="tree" @card-click="cardClick"/>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import breadcrumb from '@/components/layout/Breadcrumb.vue'
import VueFamilyTree from 'vue-family-tree';
import TreeChart from "vue-tree-chart";

export default {
    components: {
        breadcrumb, VueFamilyTree, TreeChart
    },
    data(){
        return {
            breadcrumb_title: 'Phả đồ',
            tree: [],
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        async loadData(){
            const data = await axios.get('http://localhost:3000/api/genealogy');
            this.tree = data.data.treeData; 
            //this.treeData = data.data.treeData; 
        },
        clickNode(node){
            console.log(node.name);
        },
        cardClick (item) {
            console.log(item);
        }
    }
}
</script>
<style scoped>
.tree-genealogy{
    width: 100%;
}
::-webkit-scrollbar {
  /* width: 5px; */
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: blueviolet; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: blueviolet; 
}
</style>