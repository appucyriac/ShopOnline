const products = [{
		"id": "1",
		"company": "a",
		"name": "red candle",
		"type": "candle",
		"size": "small",
		"price": 10,
		"discount": 5
	}, {
		"id": "2",
		"company": "a",
		"name": "green candle",
		"type": "candle",
		"size": "large",
		"price": 15,
		"discount": 6
	}, {
		"id": "3",
		"company": "b",
		"name": "red candle",
		"type": "candle",
		"size": "small",
		"price": 8,
		"discount": 4
	}, {
		"id": "4",
		"company": "a",
		"name": "blue candle",
		"type": "candle",
		"size": "medium",
		"price": 12,
		"discount": 5
	},
	{
		"id": "5",
		"company": "lux",
		"name": "blueberry",
		"type": "soap",
		"size": "bath",
		"price": 30,
		"discount": 5
	},
	{
		"id": "6",
		"company": "lifebouy",
		"name": "red",
		"type": "soap",
		"size": "bath",
		"price": 20,
		"discount": 3
	},
		{
		"id": "6",
		"company": "colgate",
		"name": "maxfresh",
		"type": "toothpaste",
		"size": "big",
		"price": 20,
		"discount": 3
	}


]
const gst = {
	"soap": 1,
	"candle": 2,
	"toothpaste": 1
}

let local = new localStorageHandler();
$(document).ready(() => {
	local.set("product-catalog", JSON.stringify(products));
	local.set("gst", JSON.stringify(gst));
	cart=[];
	local.set("cart",JSON.stringify(cart));

});