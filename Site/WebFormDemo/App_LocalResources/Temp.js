window.installHelper=function(scope,name){
	scope[name]=function(){
		return new Util(arguments);
	};
}