var teacher = new Vue({
	el:'#app',
	data:{
		list:{},
		// banner:[],
		// teacher[],
		// subjects[],
	},
	mounted: function(){
		this.getData(); 
	},
	methods: {
		getData:function(){
			var that = this;
			var a = window.location.search.split("=")[1];
			$.ajax({
				url:'http://api.zhituteam.com/api/teacher/info/id',
				type:'get',
				datatype:'json',
				data:{
					id:a,
					
				},
				success:function(res){
					console.log(res.data);
					that.list = res.data.teacher;
					that.list.id=a;
					console.log(a);
				},
				error:function(res){
					alert(111);
				},
			});
			console.log(this.list);
			console.log(that.list);
		},
	},
})
