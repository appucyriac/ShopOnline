let products = [
					{"id":"1",
					 "company":"a",
					 "name":"candle",
					 "size":"small",
					 "price":10,
					 "discount":5
					},
					{"id":"2",
					 "company":"a",
					 "name":"candle",
					 "size":"large",
					 "price":15,
					 "discount":6
					},
					{"id":"3",
					 "company":"b",
					 "name":"candle",
					 "size":"small",
					 "price":8,
					 "discount":4
					},
					{"id":"1",
					 "company":"a",
					 "name":"candle",
					 "size":"medium",
					 "price":12,
					 "discount":5
					}

	            ]

let local = new localStorageHandler();
$(document).ready(() => 
{
  local.set("product-catalog",JSON.stringify(products));

});