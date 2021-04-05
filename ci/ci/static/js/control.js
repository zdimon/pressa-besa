$( document ).ready(function() {
   
    $('.git-pull').on('click', (e) => {
        id = $(e.target).attr('data-id');
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