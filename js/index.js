 var ajax = new Vue({
	    	el:'#container',
	    	data:{
	    		teacher:[],
	    		subjects:[],
	    		banner:[],
	    	},
	    	mounted:function(){
               this.getData();
               this.swiperBanner();
	    	},
	    	methods:{
                getData:function(){
                	  var that = this ;
	                  $.ajax({
	                  	 'url':"http://api.zhituteam.com/api/index",
	                  	 'type':"get",
	                  	 'data':{
	                  	 	teacherLists:[],
	                  	 },
	                  	 'dataType':"json",
	                  	 'success':function(res){
	                  	 	that.teacher = res.data.teacher;
	                  	 	that.subjects = res.data.subjects;
	                  	 	var newBanner = [];
	                  	 	for(var i =0 ;i<5 ;i++){
	                  	 		newBanner.push(res.data.banner[0]);
	                  	 	}
	                  	 	that.banner = newBanner;
	                  	 	console.log(that.banner);
	                  	 },
	                  	 'error':function(res){
	                  	 	alert("111");
	                  	 }
	                  }),
	                  
	                   
	                  console.log(this.teacher);
	            },
	            swiperBanner:function(){
		                  	var mySwiper = new Swiper('.swiper-container',{
							loop: true,
							direction:'horizontal',
							autoplay:true,
					        observer: true,
					        observeParents:true,
					      })
	            },
	    	},
	    })