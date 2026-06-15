import $ from 'jquery';

function loadIncludes(parent) {
    if (!parent) parent = 'body';

    $(parent).find('[include]').each(function(i, e) {
        const url = $(e).attr('include');
        $.ajax({
            url,
            success(data) {
                $(e).html(data);
                $(e).removeAttr('include');
                loadIncludes(e);
            }
        });
    });
}

loadIncludes();