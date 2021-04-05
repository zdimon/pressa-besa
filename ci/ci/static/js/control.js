$( document ).ready(function() {
   
    $('.git-pull').on('click', (e) => {
        id = $(e.target).attr('data-id');
        
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/pull/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });
    

});