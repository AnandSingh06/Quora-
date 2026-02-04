
import express from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";
let posts=[{
    id:uuidv4(),
    username:"AnandSingh",
    content:"I love coding thats why currently i am writing a code."
},
{
    id:uuidv4(),
    username:"rahulKumar",
    content:"Hardwork is a key of sucess"
},
{   id:uuidv4(),
    username:"ankitbhadiya",
    content:"I got selected for my 1st Interview"
}
];


const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(path.resolve(),"public")));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.get("/post",(req,res)=>{
    res.render("index", { posts});
});

app.get("/post/new",(req,res)=>{
    res.render("new");
    
});
app.post("/post",(req,res)=>{
    let{username,content}=req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    // res.send("Added Successfully");
    res.redirect("/post");
      
});
app.get("/post/:id",(req,res)=>{
    let{id}=req.params;
    // console.log(id);
    
    // res.send("its working");
    let post=posts.find((p)=>id===p.id);
    res.render("show" ,{post})
    
})
app.patch("/post/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post");
});

app.get("/post/:id/edit",(req,res)=>{
     let{id}=req.params;
     let post=posts.find((p)=>id===p.id); 
     res.render("edit.ejs");
});
app.delete("/post/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id !==p.id); 
    res.redirect("/post");
});
const port =8081;
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);

})