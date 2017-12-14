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
		"id": "1",
		"company": "a",
		"name": "blue candle",
		"type": "candle",
		"size": "medium",
		"price": 12,
		"discount": 5
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

});