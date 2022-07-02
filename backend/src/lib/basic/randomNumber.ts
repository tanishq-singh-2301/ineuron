const randomNumber: Function = (numberOfDigit: number): string => Math.random().toString().slice(2, numberOfDigit + 2);

export default randomNumber;