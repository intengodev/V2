
//Question Model

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var QuestionSchema = new Schema({
	project_id: {
		type: Number,
		required: true
	},
    page_idx: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    shortname: {
        type: String,
        required: false
    },
	concept_id: {
		type: Number,
		required: false
	},
	items: {
		type: Array,
		required: true,
        default: []
	}
});

mongoose.model('Question', QuestionSchema);