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
	$(".checkout-box").hide();
	$(".bill").hide();
	$(".cart-button__proceedToCheckoutButton").hide();
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
			found = allNamesWithSize;
			lsh.set("found", JSON.stringify(found));
			_.forEach(found, function(value) {
				$("#search-results").append("<li class=resultRow>" +
					'<input type="checkbox" class="' + value.id + '"/>' + value.name +
					"&emsp;&emsp;&emsp;" + value.price + "&emsp;&emsp;&emsp;" + value.company +
					'<input type="number" class="' + value.id + '"min=1>' + "</li>");
			});
			$(".cart-button").show();
			$(".results").show();
		} else {
			if ($("#size-input")[0].value == "") {
				found = allNamesWithType;
				lsh.set("found", JSON.stringify(found));
				_.forEach(found, function(value) {
					$("#search-results").append("<li class=resultRow>" +
						'<input type="checkbox" class="' + value.id + '"/>' + value.name +
						"&emsp;&emsp;&emsp;" + value.price + "&emsp;&emsp;&emsp;" + value.company +
						'<input type="number" class="' + value.id + '" min=1>' + "</li>");
				});
				$(".cart-button").show();
				$(".results").show();
			} else {
				$(".results__header").hide();
				$("#search-results").append("<li>No results found !</li>");
			}
		}

	} else {
		$(".results__header").hide();
		$("#search-results").append("<li>No results found !</li>");
	}
}
addToCart = () => {
	let flag = false;
	$(".qty-empty-warning").hide();
	$(".checked-empty-warning").hide();

	foundResults = JSON.parse(lsh.get("found"));
	cart = JSON.parse(lsh.get("cart"));
	quantity = [];
	checkedId = $('input:checked').map(function() {
		return $(this).attr('class');
	}).get();
	_.forEach(checkedId, function(value) {
		q = $("input." + value + "[type=number]")[0].value;
		if (q != "") {
			quantity.push(q);
		} else {
			flag = true;
		}
	});

	if (checkedId.length != 0) {
		if (!flag) {
			_.forEach(checkedId, function(value) {
				cart.push(_.filter(foundResults, {
					'id': value
				}));
			});
			i = 0;
			_.forEach(cart, function(value) {
				if(value[0]['qty']==null)
				 {
				 	value[0]['qty'] = quantity[i];
				    i++;
			     }
			});
			cart = _.compact(cart);
			lsh.set("cart", JSON.stringify(cart));
			$(".cart-button__proceedToCheckoutButton").show();

		} else
			$(".qty-empty-warning").show();
	} else
		$(".checked-empty-warning").show();
	displayCart();
}
calculateAmount = () => {
	let total = 0,
		gstAmount = 0,
		discount = 0
	$(".checkout-box").show();
	$(".bill").show();
	$(".results").hide();
	$(".cart-button").hide();

	cart = JSON.parse(lsh.get("cart"))
	productGst = JSON.parse(lsh.get("gst"));
	$("ul").empty();
	_.forEach(cart, function(value) {
		newRow = '<li class="bill__list-item"><span>' + value[0].name + "&emsp;" + "</span>" + "<span>" + value[0].qty + "&emsp;" +
			"</span>" + "<span>" + value[0].price + "</span></li>";
		$(".bill__list").append(newRow);
	});

	_.forEach(cart, function(value) {
		temp = productGst[value[0].type];
		gstAmount += (value[0].price * (temp / 100)) * value[0].qty;
		discount += (value[0].price * (value[0].discount / 100)) * value[0].qty;
		total += (value[0].price) * value[0].qty;

	});
	total = (total + gstAmount) - discount;
	grandTotal = {
		grandTotal: total,
		saved: discount,
		gst: gstAmount
	}
	lsh.set("grandTotal", JSON.stringify(grandTotal));
	$(".bill__grand-total")[0].innerHTML = "Total : " + grandTotal.grandTotal + "Rs."
	$(".bill__saved")[0].innerHTML = "You saved : " + grandTotal.saved + "Rs.";
	$(".bill__gst-amount")[0].innerHTML = "Gst: " + grandTotal.gst + "Rs.";
}
displayCart = () =>
{
	     $("ul.cart-box").empty();
		_.forEach(cart, function(value) {
		newRow = '<li class="bill__list-item"><span>' + value[0].name + "&emsp;" + "</span>" + "<span>" + value[0].qty + "&emsp;" +
			"</span>" + "<span>" + value[0].price + "</span></li>";
		$(".cart-box").append(newRow);
	});
	$(".cart-block").show();
}