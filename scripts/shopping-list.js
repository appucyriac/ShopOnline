class localStorageHandler {
	constructor() {
		let ls = window.localStorage;
		this.get = ((key) => {
			return ls.getItem(key);
		});
		this.set = ((key, val) => {
			ls.setItem(key, val);
		});
	}
}

let lsh = new localStorageHandler(),
	shopListArray = [];

getInput = () => {
	let productType = $("#product-input")[0].value;
	productSize = $("#size-input")[0].value,
		newList = {
			type: productType,
			size: productSize
		};
	storeList(newList);
}

storeList = (newListItem) => {
	lsh.set("newShoplist", JSON.stringify(newListItem));
	searchCatalog();
}

searchCatalog = () => {
	$("ul").empty();
	$(".results__header").show();
	shopListArray = JSON.parse(lsh.get("newShoplist"));
	productCatalog = JSON.parse(lsh.get("product-catalog"));
	allNamesWithType = _.filter(productCatalog, {
		'type': shopListArray.type
	});
	allNamesWithSize = _.filter(productCatalog, {
		'type': shopListArray.type,
		'size': shopListArray.size
	});
	if (allNamesWithType.length != 0) {
		if (allNamesWithSize.length != 0) {
			found=allNamesWithSize;
			lsh.set("found",JSON.stringify(found));
			i=0;
			_.forEach(found, function(value) {
				$("#search-results").append("<li class=resultRow"+i+">"+
					'<input type="checkbox" class="'+value.id+'"/>' + value.name +
				 "&emsp;&emsp;&emsp;" + value.price + "&emsp;&emsp;&emsp;" + value.company +
				 '<input type="number" class="temp" min=0>' + "</li>");
				i=i+1;
			});
		} else {
			if (allNamesWithSize == "") {
				found=allNamesWithType;
				lsh.set("found",JSON.stringify(found));
				_.forEach(found, function(value) {
					$("#search-results").append("<li>" + value.name + 
						"&emsp;&emsp;&emsp;" + value.price + "&emsp;&emsp;&emsp;"
						 + value.company + "</li>");
				});
			} else {
				$(".results__header").hide();
				$("#search-results").append("<li>No results found !</li>");
			}
		}
	$(".proceedButton").show();
	} else {
		$(".results__header").hide();
		$("#search-results").append("<li>No results found !</li>");
	}
	//$('<input type="checkbox" class="resultRow"'+i+'/>').appendTo('li');

}
addToCart = () =>{
  foundResults=JSON.parse(lsh.get("found"));
  cart=[];
  checkedId=$('input:checked').map(function () { return $(this).attr('class'); }).get();
  quantity=$('.temp').map(function () { return $(this).val() }).get();
  _.forEach(checkedId, function(value){
  cart.push(_.filter(foundResults, {
		'id': value
	})); 
	});
    i=0;
  _.forEach(cart,function(value){
  	value[0]['qty']=quantity[i];
  	i++;
  });
  lsh.set("cart",JSON.stringify(cart)); 
  $(".results").hide();
  $(".checkout-box").show();
  calculateAmount();
}
calculateAmount = () =>{
cart=JSON.parse(lsh.get("cart"));
_.forEach(cart, function(value){
   newRow="<div><span>"+ value[0].name+"&emsp;" + "</span>"+  +"<span>"+ value[0].qty+"&emsp;" +
    "</span>"+"<span>"+ value[0].price + "</span></div>";
   $(".checkout-box").append(newRow);
});
productGst = JSON.parse(lsh.get("gst"));
}
