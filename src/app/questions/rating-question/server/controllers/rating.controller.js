

exports.save = function(dto){
    console.log('rating saving: ');
    console.log(dto);

    return {
        status: 'success',
        msg: 'save successfully'
    };
}