

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
		'_id'  : 'asd123klh213i',
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
		'_id'  : 'asd123klh213j',
		'name' : 'How many times have you used a checkbox question?',
		'type' : 'matrix',
		'page' : 'intro',
		'items': [
			{text: 'Once a week'},
			{text: '2-3 times a week'},
			{text: 'Once a day'},
			{text: 'Twice a day'}
		]
	},
	{
		'_id'  : 'asd123klh213h2k',
		'name' : 'How many times have you used a checkbox question?',
		'type' : 'rating',
		'page' : 'intro',
		'items': [
			{text: 'Once a week'},
			{text: '2-3 times a week'},
			{text: 'Once a day'},
			{text: 'Twice a day'}
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

