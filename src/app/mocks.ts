/**
db.questions.insert([
	{
		'name' : 'Which is your favorite mobile phone provider right now?',
		'type' : 'checkbox',
		'project_id': 20,
		'page_idx' : 1,
		'items': [
			{text: 'Apple'},
			{text: 'Samsung'},
			{text: 'Google'},
			{text: 'Other'}
		]
	},
	{
		'name' : 'What\'s the best phone on the market right now?',
		'type' : 'checkbox',
		'project_id': 20,
		'page_idx' : 2,
		'items': [
			{text: 'iPhone 7'},
			{text: 'Note 7'},
			{text: 'S7 Edge'},
			{text: 'Google Pixel'}
		]
	},
	{
		'name' : 'How many times have you used a checkbox question?',
		'type' : 'matrix',
		'project_id': 20,
		'page_idx' : 3,
		'items': [
			{text: 'Once a week'},
			{text: '2-3 times a week'},
			{text: 'Once a day'},
			{text: 'Twice a day'}
		],
		"options": [
			{text: 'Dont Agree'},
			{text: 'Neutral'},
			{text: 'Definately Agree'}
		]
	},
	{
		'name' : 'What mobile phone options are important to use as a consumer?',
		'type' : 'rating',
		'project_id': 20,
		'page_idx' : 4,
		'items': [
			{text: 'A Waterproof Design'},
			{text: 'A MST Payment Solution'},
			{text: 'Quick Charging'},
			{text: 'AI assitance'}
		]
	}
]);

db.questions.remove({});

db.questions.drop();
 */

let _questions = [
	{
		'name' : 'Which is your favorite mobile phone provider right now?',
		'type' : 'checkbox',
		'page_idx' : 1,
		'items': [
			{text: 'Apple'},
			{text: 'Samsung'},
			{text: 'Google'},
			{text: 'Other'}
		]
	},
	{
		'name' : 'What\'s the best phone on the market right now?',
		'type' : 'checkbox',
		'page_idx' : 2,
		'items': [
			{text: 'iPhone 7'},
			{text: 'Note 7'},
			{text: 'S7 Edge'},
			{text: 'Google Pixel'}
		]
	},
	{
		'name' : 'How many times have you used a checkbox question?',
		'type' : 'matrix',
		'page_idx' : 3,
		'items': [
			{text: 'Once a week'},
			{text: '2-3 times a week'},
			{text: 'Once a day'},
			{text: 'Twice a day'}
		],
		"options": [
			{text: 'Dont Agree'},
			{text: 'Neutral'},
			{text: 'Definately Agree'}
		]
	},
	{
		'name' : 'What mobile phone options are important to use as a consumer?',
		'type' : 'rating',
		'page_idx' : 4,
		'items': [
			{text: 'A Waterproof Design'},
			{text: 'A MST Payment Solution'},
			{text: 'Quick Charging'},
			{text: 'AI assitance'}
		]
	}];

let pages 	   = {
	'1': {
		_id: '012an231',
		'title': 'page 1 title',
		'questions': ['asd123klh213h']
	},
	'2': {
		_id: '012an232',
		'title': 'page 2 title',
		'questions': ['asd123klh213i']
	},
	'3': {
		_id: '012an233',
		'title': 'page 3 title',
		'questions': ['asd123klh213j']
	},
	'4': {
		_id: '012an234',
		'title': 'page 4 title',
		'questions': ['asd123klh213h2k']
	}
};



// "project": {
// 	"type": ['ideation', 'prediction_market', 'pairwise'] //suggestion only - ideation
// 	"capabilities": {
// 		"optimization_tool": [
// 			{ project_id: 12, jwt: 'lkjhre' },
// 			{ project_id: 12 }
// 		],
// 		"prediction_market": [],
// 		"pairwise": []
// 	}
// };


export class Mocks {
	public questions = _questions;
	public pages 	 = pages;
}

