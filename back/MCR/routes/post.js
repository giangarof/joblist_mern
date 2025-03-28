import express from 'express';
const router = express.Router();
import { 
    administrator, 
    protect,
    Admin_Or_Owner_Post
    
 } from '../../middleware/admin.js';
import { 
    createPost, 
    findAll,
    findPost,
    deletePost,
    update

} from '../controllers/post.js';
import asyncHandler from '../../middleware/asyncHandler.js';

router.get('/', asyncHandler(findAll))
router.get('/:id', asyncHandler(findPost))

router.post('/create', protect, asyncHandler(createPost))

router.put('/update/:id', protect, Admin_Or_Owner_Post, asyncHandler(update))
router.delete('/delete/:id', protect, Admin_Or_Owner_Post, asyncHandler(deletePost))

export default router;