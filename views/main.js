n = new Date(); // get current date
// formatting the date
h = n.getHours();
M = n.getMinutes();
y = n.getFullYear();
// getMonth() counts January as 0 so we need +1 
m = n.getMonth() + 1;
d = n.getDate();
//check if it's AM or PM
if (h < 12){
document.getElementById("date").value = h + ":" + M + " AM " + m + "/" + d + "/" + y;
console.log('hello if')
}
else {
    document.getElementById("date").value = h + ":" + M + " PM " + m + "/" + d + "/" + y;
    console.log('hello else')
}