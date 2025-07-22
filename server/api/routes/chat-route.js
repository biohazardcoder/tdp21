import express from 'express';

import { GetChatByDriverAndClient,AddMessageToChat,DeleteChatByChatId} from '../controllers/chat-controller.js';

const router = express.Router();
router.post('/', GetChatByDriverAndClient);
router.post('/message', AddMessageToChat),
router.delete('/', DeleteChatByChatId)

export default router;