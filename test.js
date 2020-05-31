var mum = [1,2,3,4];
var dad = [];
mum.forEach(s => {
    dad.push(s);
});
dad.splice(2,1);
p(dad);

function p(o) {
    console.log(o);
}