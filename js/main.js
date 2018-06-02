$(function(){
	var mySwiper = new Swiper('.swiper-container',{
		loop: true,
    	//初⃓始⃓化的⃓时⃓候⃓Slide的⃓值⃓为⃓0
		// initialSlide: 1,
		//滑⃓动⃓方⃓向⃓
		//horizontal 水⃓平⃓
		//vertical 垂⃓直⃓
	    direction: 'horizontal',
	    //滑⃓动⃓的⃓速⃓度⃓手⃓指⃓松⃓开⃓至⃓silde贴⃓合⃓的⃓时⃓间⃓
	    // speed: 3000,
	    //自⃓动⃓播⃓放⃓时⃓间⃓间⃓隔⃓
	    autoplay: 2000,
	    //可⃓显⃓示⃓数⃓量⃓
	    // slidesPerView: 2,
	    //滑⃓块⃓居⃓中⃓
	    // centeredSlides: true,
	    observer:true,
	    observeParents:true,
	    // mousewheelControl : true,
    	// mousewheelReleaseOnEdges : true,
    	// spaceBetween: 50
	})
	$.ajax({
		url: "http://api.zhituteam.com/api/index",
		type: "get",
		dataType: "json",
		success: function(res){
			var subjectStr = "";
			for(var i = 0;i < res.data.subjects.length;i++){
				subjectStr+='<li><span class="people-img"><img src="'+res.data.subjects[i].icon+'"></span><span class="class-name">'+res.data.subjects[i].name+'</span></li>';
			}
			$(".option ul").html(subjectStr);
			var bannerStr = "";
			for(var i = 0;i < res.data.banner.length;i++){
				bannerStr+='<div class="swiper-slide"><img src="'+res.data.banner[i].image+'"></div>'
			}
			$(".swiper-wrapper").html(bannerStr);
			var teacherStr = "";
			for(var i = 0;i < res.data.teacher.length;i++){
				var subjectStr = "";
				for(var j = 0;j < res.data.teacher[i].subject.length;j++){
					subjectStr+='<span class="class-box">'+res.data.teacher[i].subject[j].label+'</span>'
				}
				var gradeStr = "";
				for(var j = 0;j < res.data.teacher[i].grade.length;j++){
					gradeStr+='<span class="kuang">'+res.data.teacher[i].grade[j].label+'</span>'
				}
				teacherStr+='<div class="teacher-list-item"><div class="list-item"><div class="teacher-img"><img src="'+res.data.teacher[i].image+'"></div><div class="teacher-introduced"><div class="box1 clearfix"><span class="teacher-name">'+res.data.teacher[i].name+'</span><span class="subject-box">'+subjectStr+'</span><span class="kuang-box">'+gradeStr+'</span><div class="right">已授200课程</div></div><p class="teach-age">9年教龄</p><div class="label clearfix"><div class="label-list clearfix"><img src="images/true.png"><span>专职教师</span></div><div class="label-list clearfix"><img src="images/true.png"><span>专职教师</span></div><div class="label-list clearfix"><img src="images/true.png"><span>专职教师</span></div></div></div></div></div>';
			}
			$(".teacher-list").html(teacherStr);
		},
		error: function(res){
			alert("失败");
		}
	})
})