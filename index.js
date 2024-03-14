import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;
let temp="";
const article1 = {
  "title":'Yar Pirate Ipsum',
  "author":'tsakos',
  "article":"Coxswain galleon Davy Jones' Locker main sheet code of conduct quarter lanyard Privateer yo-ho-ho loaded to the gunwalls. Yardarm scuppers handsomely warp parrel avast case shot hempen halter me jury mast. Run a rig belaying pin bring a spring upon her cable Jack Ketch Privateer squiffy skysail hail-shot schooner black jack.\r\n" +
  '\r\n' +
  "Ballast heave to Chain Shot poop deck Sink me gaff black jack nipperkin chantey spanker. Fire ship Jack Tar Sink me sutler heave down measured fer yer chains wench chase guns Corsair pillage. Galleon squiffy draught lad doubloon crack Jennys tea cup carouser scourge of the seven seas fire ship Cat o'nine tails.\r\n" +
  '\r\n' +
  "Smartly salmagundi jib splice the main brace hands furl list bilged on her anchor galleon ballast. Clipper jolly boat pink mutiny come about keelhaul loot heave to lass snow. Stern no prey, no pay ballast Buccaneer Jack Ketch schooner spyglass rope's end six pounders league."
}
const article2 = {
  "title":'Selvage DSA laboris',
  "author":'Hipster',
  "article":"I'm baby hell of selvage DSA laboris neutral milk hotel thundercats church-key praxis jean shorts. Tacos sriracha excepteur waistcoat venmo. Portland butcher you probably haven't heard of them Brooklyn direct trade excepteur pour-over JOMO mollit scenester. Tempor you probably haven't heard of them kogi veniam, eu quinoa taiyaki mukbang disrupt consectetur mixtape umami id. Seitan paleo edison bulb, drinking vinegar literally marxism echo park ugh. Listicle marxism iPhone chambray unicorn tousled. Gorpcore keffiyeh chia tonx adipisicing pok pok deserunt lyft nulla food truck deep v vexillologist shaman velit. Bespoke JOMO gentrify brunch, craft beer VHS cornhole consectetur vegan tacos four dollar toast listicle live-edge proident. Eiusmod helvetica cred est cardigan. Shabby chic echo park tacos marfa."
}
const article3 = {
  "title":'Ipsum brains',
  "author":'Zombie',
  "article":"Zombie ipsum brains reversus ab cerebellum viral inferno, brein nam rick mend grimes malum cerveau cerebro. De carne cerebro lumbering animata cervello corpora quaeritis. Summus thalamus brains sit​​, morbo basal ganglia vel maleficia? De braaaiiiins apocalypsi gorger omero prefrontal cortex undead survivor fornix dictum mauris. Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, imo evil braaiinns stalking monstra hypothalamus adventus resi hippocampus dentevil vultus brain comedat cerebella pitiutary gland viventium. Qui optic gland animated corpse, brains cricket bat substantia nigra max brucks spinal cord terribilem incessu brains zomby. The medulla voodoo sacerdos locus coeruleus flesh eater, lateral geniculate nucleus suscitat mortuos braaaains comedere carnem superior colliculus virus. Zonbi cerebellum tattered for brein solum oculi cerveau eorum defunctis cerebro go lum cerebro. Nescio brains an Undead cervello zombies. Sicut thalamus malus putrid brains voodoo horror. Nigh basal ganglia tofth eliv ingdead."
}
const posts = [article1,article2,article3];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts});
  
});

app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.get("/posts", (req, res) => {
  
  res.render("posts.ejs", {posts: posts});
});

app.get('/poster/:thatPost', (req, res) => {
  let post1Title = req.params.thatPost
  let currentPost = [];


  posts.forEach((post) => {
    if (post1Title === post.title) {
      let index= posts.indexOf(post);
      currentPost = posts[index];
      
    }
  })
  
  res.render("poster.ejs", {currentPost:currentPost});
  
})

app.get('/edit/:thatPost', (req, res) => {
  let post2Title = req.params.thatPost
  let currentPost2 = [];
  temp=post2Title;


  posts.forEach((post) => {
    if (post2Title === post.title) {
      let index= posts.indexOf(post);
      currentPost2 = posts[index];
      
    }
  })
  
  res.render("edit.ejs", {currentPost2:currentPost2});
  
})

app.get('/delete/:thatPost', (req, res) => {
  let post2Title = req.params.thatPost
  let currentPost2 = [];
  temp=post2Title;


  posts.forEach((post) => {
    if (post2Title === post.title) {
      let index= posts.indexOf(post);
      currentPost2 = posts[index];
      
    }
  })
  
  res.render("delete.ejs", {currentPost2:currentPost2});
  
})


app.post('/submit', (req, res) => {
  
  const postObj = {
    "title":req.body.postTitle,
    "author":req.body.postAuthor,
    "article":req.body.postArticle
  }
  
  if ((postObj.title!=="") && (postObj.article!=="")){
    posts.push(postObj);
    res.render("index.ejs", {posts: posts});
  }
  else {
    res.render("form.ejs");
  }
})

app.post('/edit', (req, res) => {
  const editObj = {
    "title":req.body.editTitle,
    "author":req.body.editAuthor,
    "article":req.body.editArticle
  }
  if ((temp === 'Yar Pirate Ipsum') || (temp === "Selvage DSA laboris") || (temp === 'Ipsum brains')){
    res.render("index.ejs", {posts: posts});
  }
  else{
  posts.forEach((post) => {
    
    if (temp === post.title) {
      let index= posts.indexOf(post);
      posts.splice(index, 1);
    }
  })
 
  
  if ((editObj.title!=="") && (editObj.article!=="")){
    posts.push(editObj);
    res.render("index.ejs", {posts: posts});
  }
  else {
    res.render("edit.ejs");
  }
 }

 
})

app.post('/delete', (req, res) => {

  if ((temp === 'Yar Pirate Ipsum') || (temp === "Selvage DSA laboris") || (temp === 'Ipsum brains')){
    res.render("index.ejs", {posts: posts});
  }
  else{
  posts.forEach((post) => {
    
    if (temp === post.title) {
      let index= posts.indexOf(post);
      posts.splice(index, 1);
    }
    
  })
 
  res.render("index.ejs", {posts: posts});
 }

 
})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


