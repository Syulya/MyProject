// $('.logo').on('click', function(e){
// 	console.log('it is work');
		
// });

// var qFirst = $('span.first').text(),
// 	q1t = $('input.q1t').text(),
// 	qSecond = $('span.second').text();
// console.log(qFirst, q1t, qSecond);

// var question = {
// 	part1: qFirst,
// 	part2: qSecond,
// 	right: q1t
// }
// console.log(JSON.stringify(question));
// var D = [];

// D.push(JSON.stringify(question));
// console.log(D);
// $.each(D,function(index,element){
// 	console.log(index,element)


// 	// var persona = $('<div>',{
// 	// 	class: 'persona',
// 	// 	text: 'Имя' + element.name + ', Возраст:' +
// 	// 	element.age + ', Ник:' + element.username
// 	// }).appendTo(container)
// });

//плагин для записи данных из формы в массив
$.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
if (o[this.name]) {
if (!o[this.name].push) {
o[this.name] = [o[this.name]];
}
o[this.name].push(this.value || '');
} else {
o[this.name] = this.value || '';
}
});
return o;
};

//Запись данных в LocalStorage из инпутов при закрытии страницы
$('.btn-test').on('click', function(e){
	var formTest = $('#form-test').serializeArray()
	//console.log(formTest);
	formTest=JSON.stringify(formTest)
	localStorage.setItem("formTest", formTest);
	// var outform = JSON.parse(formTest);
	// console.log(outform);
});
//Запись данных из LocalStorage в инпуты при загрузке страницы
$('.btn-read').on('click', function(e){
	var formData = localStorage.getItem("formTest");

	if(!formData)
		return;
	formData = JSON.parse(formData)
	$.each(formData, function(index, element){
		var key = element.name;
		var value = element.value;

		$('#form-test').find('[name='+key+']').val(value);
		console.log(element);
	});

	// $('#form-storage [name]').each(function(index,element){

	// });
});