import {Router} from "express"
import * as userController from '../controller/user.controller'

const router = Router();

router.post("/login", userController.login)
router.post("/logout", userController.logout)

router.post('/register', userController.createUser);
router.put("/update", userController.updateUser)
router.delete("/delete", userController.deleteUser)
router.get("/profile", userController.getUser)

export default router