window.onload = function() {
	var submits = document.getElementById("submit");
	//获取焦点
	document.getElementById('user').focus();
	document.getElementById('user').select();
	//增加
	submits.onclick = function() {
		//获取用户信息
		var user = document.getElementById("user").value;
		//获取密码
		var password = document.getElementById("password").value;
		//获取籍贯
		var place = document.getElementById("place");
		//获取索引
		var index = place.selectedIndex;
		//获取选中值
		var placeValue = place.options[index].text;
		//获取兴趣
		var interests = document.getElementsByName("interest");
		//获取value值
		var selectValue="";
		for(var i = 0; i < interests.length; i++) {
			var interest = interests[i];
			if(interest.checked==true) {
				selectValue=selectValue+interest.value+",";
			}
		}
		//获取文本值
		var selectedValue="";
		for(var i=0;i<interests.length;i++){
			if(interests[i].checked){
//			nextSibling是获得当前对象的下一个对象
//			nodeValue是返回一个节点的值
				selectedValue=selectedValue+interests[i].value+" ";
//				selectedValue=selectedValue+interests[i].nextSibling.nodeValue;
			}
		}
		selectedValue=selectedValue.replace(/(\s*$)/g, "");//去掉后面空格
		var radioValue="";
		var identitys=document.getElementsByName("identity");
		for(var i=0;i<identitys.length;i++){
			if(identitys[i].checked){
				radioValue=radioValue+identitys[i].nextSibling.nodeValue;
			}
		}
		//增加
		add(user,password,placeValue,selectedValue,radioValue);
	}
	
	//重置
	document.getElementById('reset').onclick=function(){
		resets();
	};
	
	function add(user,password,placeValue,selectedValue,radioValue){
		//创建一个框架节点
		var tr =document.createElement("tr");
		var td1 =document.createElement("td");
		var td2 =document.createElement("td");
		var td3 =document.createElement("td");
		var td4 =document.createElement("td");
		var td5 =document.createElement("td");
		var td6 =document.createElement("td");
		var td7 =document.createElement("td");
		
		//赋值
		//setAttribute：修改节点属性
		var input1=document.createElement("input");
		input1.setAttribute('type','checkbox');
		input1.setAttribute('name','item');
		td1.appendChild(input1);
		//获取到的值进行赋值,innerHTML获取到的值会把标签同时获取
		td2.innerHTML=user;
		td3.innerHTML=password;
		td4.innerHTML=placeValue;
		td5.innerHTML=selectedValue;
		td6.innerHTML=radioValue;
		//操作添加
		//创建一个input节点
		var input2=document.createElement("input");
		input2.setAttribute('type','button');
		input2.setAttribute('value','删除');
		input2.setAttribute('onclick','del(this)');
		//追加节点
		td7.appendChild(input2);
		
		var input3=document.createElement("input");
		input3.setAttribute('type','button');
		input3.setAttribute('name','update');
		input3.setAttribute('value','修改');
		//添加修改事件
		input3.setAttribute('onclick','modify(this)');
		td7.appendChild(input3);
		
		//将所有td标签对放入tr中
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);
		tr.appendChild(td7);
		var table=document.getElementById('listTable');
		table.appendChild(tr);
		//重置（方法）
		resets();
	}
	
	//全选
	checkAll=function (obj){
		var checked=obj.checked;
		var item=document.getElementsByName("item");
		for(var i=0;i<item.length;i++){
			if(item[i].checked){
				item[i].checked=null;
			}else{
				item[i].checked=checked;
			}
			item[i].checked=checked;	
		}
	}
	
	//删除单项
	del=function(obj){
		var parentTr=obj.parentNode.parentNode;
		var parentTable = parentTr.parentNode;
		parentTable.removeChild(parentTr);
	}
	//删除选中
	delRow=function(){
		var items=document.getElementsByName("item");
		for(var i=1;i<items.length;i++){
			if(items[i].checked){
				var parentNode=items[i].parentNode.parentNode;
				var tables=parentNode.parentNode;
				tables.removeChild(parentNode);
				i--;
			}
		}
	}
}

var	rowIndex;
//修改回显
function modify (obj){
	//重置
	resets();
	//获取
	var user=document.getElementById('user');
	var password = document.getElementById("password");
	var place = document.getElementById("place");
	var index = place.selectedIndex;
	var placeValue = place.options[index].text;
	//获取tr和td对，以及选中的下标
	var tr = obj.parentNode.parentNode;
    var td = tr.getElementsByTagName('td');
	rowIndex=obj.parentNode.parentNode.rowIndex;
	//赋值
	user.value=td[1].innerHTML;

	password.value=td[2].innerHTML;
	placeValue=td[3].innerHTML;
	for(var i=0;i<place.options.length;i++){
		var value= place.options[i].text;
		if(value==placeValue){
			place.options[i].selected=true;
		}
	}
	var interValue=td[4].innerHTML;
	var str= interValue.split(" ");
	var interests = document.getElementsByName("interest");
	for(var i=0;i<str.length;i++){
		for (let j=0;j<interests.length;j++) {
			if(interests[j].value==str[i]){
				interests[j].checked=true;
			}
		}
	}
	var identitys=document.getElementsByName("identity");
	//这里更新到的值会出现换行，造成字符串无法比较
	var identValue=td[5].innerText;
	identValue=identValue.replace(/[\r\n]/g,"");//去掉换行符
	if(identValue=="党员"){
		identitys[0].checked=true;
	}else if(identValue=="团员"){
		identitys[1].checked=true;
	}else if(identValue=="群众"){
		identitys[2].checked=true;
	}
	//回显完毕后，修改按钮事件
	var addButton=document.getElementById('submit');
	try{
		if(addButton.getAttribute("value")=="提交"){
			addButton.setAttribute('value','更新');
			addButton.setAttribute('id','update');
			addButton.setAttribute('onclick','update()');
		}
	}catch(e){
		//TODO handle the exception
	}
}

//修改
function update(){
	//获取
	var table=document.getElementById('listTable');
	var user=document.getElementById('user');
	var password = document.getElementById("password");
	var place = document.getElementById("place");
	var index = place.selectedIndex;
	var placeValue = place.options[index].text;
	var interests = document.getElementsByName("interest");
	//获取文本值
	var selectedValue="";
	for(var i=0;i<interests.length;i++){
		if(interests[i].checked){
			selectedValue=selectedValue+interests[i].value+" ";
		}
	}
	//去掉末尾空格
	selectedValue=selectedValue.replace(/(\s*$)/g, "");
	var radioValue="";
	var identitys=document.getElementsByName("identity");
	for(var i=0;i<identitys.length;i++){
		if(identitys[i].checked){
			radioValue=radioValue+identitys[i].nextSibling.nodeValue;
		}
	}
	
	//赋值
	table.rows[rowIndex].cells[1].innerHTML=user.value;
	table.rows[rowIndex].cells[2].innerHTML=password.value;
	table.rows[rowIndex].cells[3].innerHTML=placeValue;
	table.rows[rowIndex].cells[4].innerHTML=selectedValue;
	table.rows[rowIndex].cells[5].innerText=radioValue;
	
	//更新成功后，将按钮改回原来按钮，同时重置
	var updateButton=document.getElementById('update');
	updateButton.setAttribute('value','提交');
	updateButton.setAttribute('type','button');
	updateButton.setAttribute('id','submit');
	updateButton.setAttribute('onclick','add()');
	resets();
}

//重置
function resets(){
	var inputs=document.getElementsByTagName("input");
	for(var i=0;i<inputs.length;i++){
		if(inputs[i].type=='text'){
			inputs[i].value="";
		}else if(inputs[i].type=='password'){
			inputs[i].value="";
		}else if(inputs[i].type=='checkbox'){
			if(inputs[i].checked){
				inputs[i].checked=false;
			}
		}else if(inputs[i].type=='radio'){
			if(inputs[i].checked){
				inputs[i].checked=false;
			}
		}
	}
	//重置下拉框
	var place=document.getElementById('place');
	place.selectedIndex=0;
	//获取焦点
	document.getElementById('user').focus();	
}