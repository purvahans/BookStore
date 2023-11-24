const router = require("express").Router();
const booksModdle = require("../models/booksModdle");


//POST REQ
router.post("/add",async(req,res) => {
    try{
        const data=req.body;
        const newBook = new booksModdle(data);
        await newBook.save().then(() => {
            res.status(200).json({message: "Book added Successfully"});
        });

    }
    catch (error){
        console.log(error);
    }
})


//GET REQ
router.get("/getBooks",async (req,res) =>{
    let books;
try{
   books= await booksModdle.find();
   res.status(200).json({books});
        
    }


catch (error){
    console.log(error);
}
});

//GET REQ BY ID
router.get("/getBooks/:id",async (req,res)=> {
    let book;
    const id =req.params.id;
     try{
       book= await booksModdle.findById(id);
        res.status(200).json({book});
res     }
     catch(error){
        console.log(error);
     }
})


//UPDATE BOOKS BY ID
router.put('/updateBook/:id',async (req,res) => {
    const id=req.params.id;
    
    const {bookname,description,author,image,price }=req.body;
    let book;
    try{
         book= await booksModdle.findByIdAndUpdate(id, {
        bookname,
        description,
        author,
        image,
        price
         
   });
   await book.save().then(() => res.json({message:"Data Updated" }));
        }
      catch(error){
         console.log(error);
      }
});

//DELETE BOOK BY ID
router.delete("/deleteBook/:id",async(req,res) => {
    const id=req.params.id;
    
    try{
        await booksModdle
        .findByIdAndDelete(id)
        .then(() => res.status(201).json({message:"DELETED SUCCESSFULLY"}));
    }
    catch(error){
        console.log(error);
     }
    
});

module.exports = router;