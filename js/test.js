
// const isVerified = "";
// // if(isVerified == true){
// //     console.log("user is verified")
// // }
// // else{
// //     console.log("user is not verified")
// // }
// console.log(
//     `${isVerified === true ? "user is verified" : "user is not verified"}`
// );

function getTimeString(time){
    const gour = parseInt(time/3600);
    let remainingSecond = time% 3600;
    const minite = parseInt(remainingSecond % 60);
    remainingSecond = remainingSecond% 60;
    return`${hour} hour ${minite} second ago`;
}
console.log(getTimeString(4320));