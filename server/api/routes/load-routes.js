import express from "express"
import { GetAllLoads,CreateLoad, GetLoadById} from "../controllers/load-controller.js"
import uploadImage from "../../middlewares/uploadImage.js"

const router = express.Router()

router.get("/", GetAllLoads)
router.get("/:id", GetLoadById)
router.post("/create", uploadImage, CreateLoad)
// router.post("/connected", ConnectedDriver)
// router.post("/connecting", ConnectingDriver)
// router.post("/cancel",  CanceledConnecting)
// router.post("/disconnect",  DisconnectConnecting)

export default router