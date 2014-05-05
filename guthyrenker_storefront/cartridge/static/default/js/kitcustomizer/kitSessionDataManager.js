// JavaScript Document
function EventDispatcher(){
    this._listeners = {};  
}

 
EventDispatcher.prototype.addEventListener = function(type, listener){
	if (typeof this._listeners[type] == "undefined"){
        this._listeners[type] = [];
	}
	this._listeners[type].push(listener);
}

 

EventDispatcher.prototype.dispatch = function(event){
    if (typeof event == "string"){
        event = { type: event };
    }
    if (!event.target){
        event.target = this;
    }
    if (!event.type){  //falsy
        throw new Error("Event object missing 'type' property.");
    }
    if (this._listeners[event.type] instanceof Array){
        var listeners = this._listeners[event.type];
        for (var i=0, len=listeners.length; i < len; i++){
            listeners[i].call(this, event);
        }
    }
}
 

EventDispatcher.prototype.removeEventListener = function(type, listener){
    if (this._listeners[type] instanceof Array){
        var listeners = this._listeners[type];
        for (var i=0, len=listeners.length; i < len; i++){
            if (listeners[i] === listener){
                listeners.splice(i, 1);
                break;
            }
        }
    }
}


function KitSessionDataManager() {
	var _this=this;
	this.widgetData=null;
	this.EVENT_REFRESH = "dataRefresh";
	
    this.putData=function(data) {
		$.jStorage.set("loggedin", data.loggedin);
		$.jStorage.set("memberprice", data.memberprice);
		$.jStorage.set("kitcost", data.kitcost);
		$.jStorage.set("weeks", data.weeks);
		$.jStorage.set("savings", data.savings);
		$.jStorage.set("products", data.products);
		$.jStorage.set("itemadded", data.itemadded);
		$.jStorage.set("itemaddedindex", data.itemaddedindex);
		$.jStorage.set("maxproducts", data.maxproducts);
		$.jStorage.set("loggedinsoft", data.loggedinsoft);
		$.jStorage.set("lastshipmentdate", data.lastshipmentdate);
		$.jStorage.set("nextshipmentdate", data.nextshipmentdate);
		$.jStorage.set("shipping", data.shipping);
		$.jStorage.set("trackingURL", data.trackingURL);
		//_this.widgetData=data;
		_this.dispatch(_this.EVENT_REFRESH);			
	}
		
	this.getData=function() {
		this.widgetData.loggedin=$.jStorage.get("loggedin");
		this.widgetData.memberprice=$.jStorage.get("memberprice");
		this.widgetData.kitcost=$.jStorage.get("kitcost");
		this.widgetData.savings=$.jStorage.get("savings");
		this.widgetData.weeks=$.jStorage.get("weeks");
		this.widgetData.products=$.jStorage.get("products");
		this.widgetData.itemadded=$.jStorage.get("itemadded");
		this.widgetData.itemaddedindex=$.jStorage.get("itemaddedindex");
		this.widgetData.maxproducts=$.jStorage.get("maxproducts");
		this.widgetData.loggedinsoft=$.jStorage.get("loggedinsoft");
		this.widgetData.lastshipmentdate=$.jStorage.get("lastshipmentdate");
		this.widgetData.nextshipmentdate=$.jStorage.get("nextshipmentdate");
		this.widgetData.shipping=$.jStorage.get("shipping");
		this.widgetData.trackingURL=$.jStorage.get("trackingURL");
	}
}

KitSessionDataManager.prototype = new EventDispatcher();
KitSessionDataManager.prototype.constructor = KitSessionDataManager;