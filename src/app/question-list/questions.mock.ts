

let _questions = [
{
	'_id'  : 'asd123klh213h',
	'name' : 'How many times have you used a checkbox question?',
	'type' : 'checkbox',
	'page' : 'intro',
	'items': [
		{text: 'Once a week'},
		{text: '2-3 times a week'},
		{text: 'Once a day'},
		{text: 'Twice a day'}
	]
},
{
	'_id'  : 'asd123klh213h',
	'name' : 'How many times have you used a checkbox question?',
	'type' : 'radio',
	'page' : 'intro',
	'items': [
		{text: 'Once a week'},
		{text: '2-3 times a week'},
		{text: 'Once a day'},
		{text: 'Twice a day'}
	]
},
{
	'_id'  : 'asd123klh213h',
	'name' : 'How many times have you used a checkbox question?',
	'type' : 'radio-click',
	'page' : 'intro',
	'items': [
		{text: 'Once a week'},
		{text: '2-3 times a week'},
		{text: 'Once a day'},
		{text: 'Twice a day'}
	]
}
];


export class MockQuestions {
	public questions = _questions;
}