
//Page Model

var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var PageSchema = new Schema({
	project_id: {
		type: Number,
		required: true
	},
    page_idx: {
        type: Number,
        require: false
    },
    title: {
        type: String,
        required: false
    },
    questions: {
        type: Array,
        required: true,
        default: []
    }
});

mongoose.model('Page', PageSchema);