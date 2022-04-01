function sigDigit (number) {

	if (number === null || number === undefined){
		return "?";
	} else if (Math.abs(number) >= 1.0){
		return Math.abs(Number(number)) >= 1.0e+12
		? (Math.abs(Number(number)) / 1.0e+12).toFixed(1) + " T"

		: Math.abs(Number(number)) >= 1.0e+9
		? (Math.abs(Number(number)) / 1.0e+9).toFixed(1) + " B"

		: Math.abs(Number(number)) >= 1.0e+6
		? (Math.abs(Number(number)) / 1.0e+6).toFixed(1) + " M"

		: Math.abs(Number(number)) >= 100
		? (Math.abs(Number(number))).toFixed(0)

		: Math.abs(Number(number)) >= 10
		? (Math.abs(Number(number))).toFixed(1)

		: Math.abs(Number(number)) >= 1
		? (Math.abs(Number(number))).toFixed(2)

		: Math.abs(Number(number));
	} else {
		return parseFloat((Math.abs(Number(number))).toPrecision(3));
	}
}

export default sigDigit;