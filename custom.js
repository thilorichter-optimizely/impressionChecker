var optly = new OptimizelyAPI({
                password: "test",
                client_id: 12254990965
            });

var accountInfo = optly.get("plan", function(res){
  console.log(res);
});
