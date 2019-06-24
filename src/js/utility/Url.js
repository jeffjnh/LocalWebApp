export const getQuery = (name, url) => {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + name + '=([^&#]*)', 'i' );
    var str = reg.exec(href);
    return str ? str[1] : null;
};