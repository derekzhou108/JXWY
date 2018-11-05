'use strict';

function changeFilter(tpage) {
    let newList = [];
    if (tpage == 'all') {
        newList = ROLEINFO;
    }
    else {
        newList = ROLEINFO.filter(res => res.color == tpage)
    }
    document.querySelector('#p-list').innerHTML = template('person-tpl-list', newList);

}

$(function () {
    document.querySelector('#p-list').innerHTML = template('person-tpl-list', ROLEINFO);
    const scrollBox = new ScrollBox('.list-content');

    $('.tool-bar>ul').on('click', 'li a', function () {
        if (!!$(this).data('type')) {
            $(this).parent('li').addClass('active').siblings().removeClass('active');
            changeFilter($(this).data('type'))

        }
        else {
            $(this).parents('li').siblings().removeClass('active');
            const val = $('.search-input').val();
            const reg = new RegExp(val);
            const newValues = ROLEINFO.filter(res => res.name.match(reg));
            document.querySelector('#p-list').innerHTML = template('person-tpl-list', newValues);
        }
        scrollBox.scrollUpdate();
    });
});




