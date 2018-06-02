function getQuery(){
						var str = (location.search.length > 0 ? location.search.substring(1) : ''),
						args = {},
						items = str.length ? str.split("&") : [],
						item = null,
						name = null,
						value = null;
						for (i=0; i < items.length; i++){
							item = items[i].split("=");
							name = decodeURIComponent(item[0]);
							value = decodeURIComponent(item[1]);
							if (name.length) {
								args[name] = value;
							}
						}
						return args;
					}

var ajax = new Vue({
	    	el:'#app',
	    	data:{
	                condition:null,
                    teacherList: [],
                    grade: '年级',
                    subject: '学科',
                    teacherType: '教师类型',
                    isShowGrade: false ,
                    isShowType: false ,
                    isShowSubject: false ,
                    isShowAllSelect: false,
                    searchGrade: null,
                    searchSubject: null,
                    searchType: null,
	    	},
	    	mounted:function(){
                this.searchSubject = this.getQuery().id;
                var data ={
                	'subject' :this.searchSubject,
                	'offset' : 0,
                	'limit' :20,
                          }
                	this.getList(data);
	    	},
	    	methods:{
                	getQuery:function(){
						var str = (location.search.length > 0 ? location.search.substring(1) : ''),
						args = {},
						items = str.length ? str.split("&") : [],
						item = null,
						name = null,
						value = null;
						for (i=0; i < items.length; i++){
							item = items[i].split("=");
							name = decodeURIComponent(item[0]);
							value = decodeURIComponent(item[1]);
							if (name.length) {
								args[name] = value;
							}
						}
						return args;
					},
                    getList:function(dataObj){
                    	var that = this;
                    	// var subjecId = that.getQuery().id;
                    	$.ajax({
                    		'url': 'http://api.zhituteam.com/api/teacher/lists',
                    		'type': "get",
                    		'dataType': 'json',
                    		'data': dataObj,
                    		success:function(res){
                    			that.teacherList = res.data.teacher;
                    			if (that.condition == null) {
                    				res.data.condition.grade.forEach(function(item){
                    				item.isSelected = false;
                    			})
                    			res.data.condition.subject.forEach(function(item){
                    				item.isSelected = false;
                    			})
                    			res.data.condition.type.forEach(function(item){
                    				item.isSelected = false;
                    			})
                    			};
                    			that.condition = res.data.condition;
                                that.condition.subject.forEach(function(j){
                                	if (that.searchSubject == j.id) {
                                		that.subject = j.label;
                                		j.isSelected = true;
                                		that.isShowAllSelect = false;
                                		that.isShowSubject = true;
                                	}
                                })
                            }
                    	})
                    },
                    clickGrade:function(){
                    	this.isShowGrade = true ;
                    	this.isShowSubject = false;
                    	this.isShowType = false;
                    	this.isShowAllSelect = true;
                    },
                    clickSubject:function(){
                    	this.isShowSubject = true;
                    	this.isShowGrade = false;
                    	this.isShowType = false;
                    	this.isShowAllSelect = true;
                    },
                    clickType:function(){
                    	this.isShowType =true;
                    	this.isShowSubject = false;
                    	this.isShowGrade = false;
                    	this.isShowAllSelect = true;
                    },
                    clickItem:function(item){
                    	this.condition.grade.forEach(function(t){
                               t.isSelected = false;
                           })
                           this.condition.subject.forEach(function(t){
                               t.isSelected = false;
                           })
                           this.condition.type.forEach(function(t){
                               t.isSelected = false;
                           })
                           item.isSelected =true;
                           this.isShowAllSelect = false;
                           if (this.isShowGrade) {
                           	  this.grade = item.label;
                           	  this.searchGrade = item.id;
                           }
                            if (this.isShowSubject) {
                           	  this.subject = item.label;
                           	  this.searchSubject = item.id;
                           }
                            if (this.isShowType) {
                           	  this.teacherType = item.label;
                           	  this.searchType = item.id;
                           }
                           var data = {
                                'grade' : this.searchGrade ,
                                'subject' : this.searchSubject,
                                'type' : this.searchType,
                                'limit' : 20,
                                'offset' : 0,
                           }       
                           this.getList(data)            
                    }
                }
	    	})