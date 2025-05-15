let express=require("express")
const { reg, login, islogin, isadmin } = require("../controlers/usercont")
const { upload, add, getprod, addcom, edit, editimg, delprod } = require("../controlers/prodcont")
const { addcart, getcart, inc, dec, delcart } = require("../controlers/cartcont")

const fs = require('fs');
const path = './prodimgs';
if (!fs.existsSync(path)) fs.mkdirSync(path);

let route=new express.Router()
route.post("/reg",reg)
route.post("/login",login)
route.post("/add",upload.single("pimg"),islogin,isadmin,add)
route.get("/products",getprod)
route.post('/addcart',islogin,addcart)
route.get("/cart/:uid",islogin,getcart)
route.get("/inc/:cid",islogin,inc)
route.get("/dec/:cid",islogin,dec)
route.delete("/del/:cid",islogin,delcart)
route.put("/addcom",islogin,addcom)
route.put("/edit",islogin,isadmin,edit)
route.put("/editimg",upload.single("pimg"),islogin,isadmin,editimg)
route.delete("/delprod/:pid",islogin,isadmin,delprod)

module.exports=route