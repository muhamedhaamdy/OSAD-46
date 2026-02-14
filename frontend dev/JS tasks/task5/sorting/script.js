var nums = [];

for (let i = 0; i < 5; i++) {
        let input = prompt("Enter number " + (i + 1));
        nums.push(Number(input));
}
alert("u've entered"+ nums);
nums.sort(function(x, y) {
    return x-y;
});
alert("nums sorted asc"+ nums);
nums.reverse();
alert("nums sorted des"+ nums)

