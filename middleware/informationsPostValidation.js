//Middleware qui permet de vérifier le contenu d'un post avant sa création
exports.verifPost =  (req, res, next) => {
  const content=req.body;
 if (content.length<3){
    res.status(400).send({message:"Le contenu de votre publication doit contenir plus de 3 caractères"})

  }else{
      next();
  }
};

//Middleware qui permet de vérifier le contenu d'un commentaire avant sa création
exports.verifComment =  (req, res, next) => {
    const content=req.body.content;
    if(content.length<3){
        res.status(400).send({message:"Le contenu de votre commentaire doit contenir plus de 3 caractères"})
    }else{
        next();
    }
  };


