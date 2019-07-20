export function mysqlDateToJsDate(date){
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = date.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

    console.log(d);
    return d;
// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
}