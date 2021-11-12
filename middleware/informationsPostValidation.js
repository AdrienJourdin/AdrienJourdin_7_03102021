

//Middleware qui permet de vérifier si l'utilisateur du token
exports.verifPost =  (req, res, next) => {
  const title=req.body.title;
  const content=req.body.content;
  if(title.length<3){
      res.status(400).send({message:"Le titre de votre publication doit contenir plus de 3 caractères"})
  }else if (content.length<3){
    res.status(400).send({message:"Le contenu de votre publication doit contenir plus de 3 caractères"})

  }else{
      next();
  }
};

exports.verifComment =  (req, res, next) => {
    const content=req.body.content;
    if(content.length<3){
        res.status(400).send({message:"Le titre de votre publication doit contenir plus de 3 caractères"})
    }else{
        next();
    }
  };


