<template>
    <teleport to = "body">
      <div v-if = "modalOpen" class="modal">
        <div>
          삭제 되었습니다.
          <button @click="modalOpen = false">
            닫기
          </button>
        </div>
      </div>
    </teleport>
</template>

<script lang = 'ts'>
    interface IModal {
        name : string;
        props: string[];
        data : () => void;
    };

    export default {
        name: 'Modal',
        props: ['modalOpen'],
        data() {return {}; }
    } as IModal;
</script>

<style scoped>
    .modal {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
 
        bottom: 70px;
        left: 30px;
        
        width: 400px;
        height: 300px;

        background: #565656;
    }
</style>