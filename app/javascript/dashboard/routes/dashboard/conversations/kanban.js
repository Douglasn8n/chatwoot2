import { frontendURL } from '../../../helper/URLHelper';
import ConversationKanbanBoard from '../../../components/ConversationKanbanBoard.vue';

const CONVERSATION_PERMISSIONS = [
  'administrator',
  'agent',
  'conversation_manage',
  'conversation_unassigned_manage',
  'conversation_participating_manage',
];

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/conversations/kanban'),
      name: 'conversations_kanban',
      meta: { permissions: CONVERSATION_PERMISSIONS },
      component: ConversationKanbanBoard,
    },
  ],
};
