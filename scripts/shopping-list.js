class localStorageHandler{
  constructor(){
      let ls = window.localStorage;
      this.get = ((key)=>
      {
           return ls.getItem(key);
      });
      this.set = ((key, val)=> 
      {
           ls.setItem(key,val);
      });
  }
}

let lsh = new localStorageHandler(),
    shopListArray = [],
    flag = false;

getInput = () =>
{ 
  let productName = $("#product-input")[0].value; 
      productSize = $("#size-input")[0].value,
      newList = {
                      name:productName,
                      size:productSize
                };
  storeList(newList);
}

storeList =(newListItem)=>{
lsh.set("newShoplist",JSON.stringify(newListItem));
searchCatalog();
}

searchCatalog = () =>
{
  $("ul").empty();
  $(".results__header").show();  
  shopListArray = JSON.parse(lsh.get("newShoplist"));
  productCatalog = JSON.parse(lsh.get("product-catalog"));
  temp1 = _.filter(productCatalog, { 'name': shopListArray.name});
  temp2 = _.filter(productCatalog, { 'name': shopListArray.name,'size': shopListArray.size});
  if(temp1.length != 0)
  {if(temp2.length != 0)
   {
   	_.forEach(temp2,function(value){
   		$("#search-results").append("<li>"  + value.name + "&emsp;&emsp;&emsp;"+ value.price + "&emsp;&emsp;&emsp;" + value.company + "</li>");
   	});
   }
   else
   {
   	_.forEach(temp1,function(value){
   		$("#search-results").append("<li>"  + value.name + "&emsp;&emsp;&emsp;"+ value.price + "&emsp;&emsp;&emsp;" + value.company + "</li>");
   	});
   }
  }
  else
  {
  	$(".results__header").hide(); 
  	$("#search-results").append("<li>No results found !</li>");
  }
}

