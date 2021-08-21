export const conversor = (coin, value) => {
  let str = value.toString();
  console.log("aca el value en str", str);

  var thousands = Intl.NumberFormat().format(Number(str));
  console.log("aca thousand ", thousands);

  let array = thousands.split(".");
  console.log("aca array ", array);

  if (coin === "btc") {
    var decimals = array[1].slice(0, 8);
  }

  if (coin === "usd") {
    var decimals = array[1].slice(0, 2);
    console.log(decimals);
  }

  let result = thousands + "," + decimals;

  return result;
};
