var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){
    res.redirect('/home')
    next();
  }else{
    res.render('login',{"Loginerr":req.session.userLoginErr})
    req.session.userLoginErr= false
  }

});

function doLogin(loginDatas){
  const loginEmail=loginDatas.Email;
  const loginPassword=loginDatas.Password;
  var response={}

  var user={Email: "jisochacko@gmail.com", Password:'12345'}
  if(user.Email=== loginEmail && user.Password=== loginPassword){
    console.log('Login Success');
    response.user=user;
    response.status=true;
  }
  else{
    console.log('Login Failed');
    response.user=null;
    response.status=false;
  }
  return response;
}

router.post('/home',(req,res)=>{
  console.log("Logged In");
  var response=doLogin(req.body);
  if(response.status){
    console.log("Success");
    req.session.user=response.user;
    res.redirect('/home')
  }else{
    console.log("Failed");
    req.session.user=null;
    req.session.userLoginErr="Invalid Username or Password"
    res.redirect('/')
  }
})

router.get('/logout', (req, res) => {
	// req.session.destroy()
	req.session.user = null
	res.redirect('/')
})

module.exports = router;
