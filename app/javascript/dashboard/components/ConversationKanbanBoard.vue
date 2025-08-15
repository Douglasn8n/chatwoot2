<script setup>
/* global axios */
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const statuses = ['open', 'pending', 'snoozed', 'resolved'];
const columns = ref({
  open: [],
  pending: [],
  snoozed: [],
  resolved: [],
});

function onDragStart(event, conversation) {
  event.dataTransfer.setData('conversation-id', conversation.id);
}

function onDrop(event, status) {
  const conversationId = event.dataTransfer.getData('conversation-id');
  if (!conversationId) return;
  axios.patch(
    `/api/v1/accounts/${route.params.accountId}/conversations/${conversationId}/update_status`,
    { status }
  );
}
</script>

<template>
  <div class="flex space-x-4">
    <div v-for="status in statuses" :key="status" class="w-1/4">
      <h3 class="mb-2 text-lg font-semibold">
        {{ $t(`CONVERSATIONS.KANBAN.${status.toUpperCase()}`) }}
      </h3>
      <div
        class="min-h-[200px] rounded bg-white p-2"
        @drop.prevent="onDrop($event, status)"
        @dragover.prevent
      >
        <div
          v-for="conversation in columns[status]"
          :key="conversation.id"
          class="mb-2 cursor-move rounded bg-gray-100 p-2"
          draggable="true"
          @dragstart="onDragStart($event, conversation)"
        >
          {{ conversation.title }}
        </div>
      </div>
    </div>
  </div>
</template>
