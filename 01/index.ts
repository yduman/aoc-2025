import { readFile } from "node:fs/promises";
import { argv } from "node:process";

const input = await readFile(argv[2] as string, "utf-8");
const rotations = input.split("\n").filter(Boolean);

function rotateDial(currentPosition: number, rotation: string) {
	const direction = rotation[0];
	const steps = parseInt(rotation.slice(1), 10);

	if (direction === "R") {
		return (currentPosition + steps) % 100;
	} else {
		return (((currentPosition - steps) % 100) + 100) % 100;
	}
}

function countZeroPasses(currentPosition: number, rotation: string) {
	const direction = rotation[0];
	const steps = parseInt(rotation.slice(1), 10);

	if (direction === "L") {
		if (currentPosition === 0) return Math.floor(steps / 100);
		if (steps >= currentPosition)
			return Math.floor((steps - currentPosition) / 100) + 1;
		return 0;
	} else {
		if (currentPosition === 0) return Math.floor(steps / 100);
		const first = 100 - currentPosition;
		if (steps >= first)
			return Math.floor((steps + currentPosition - 100) / 100) + 1;
		return 0;
	}
}

function solve1() {
	for (const rotation of rotations) {
		currentPosition = rotateDial(currentPosition, rotation);
		if (currentPosition === 0) result++;
	}
	return result;
}

function solve2() {
	for (const rotation of rotations) {
		result += countZeroPasses(currentPosition, rotation);
		currentPosition = rotateDial(currentPosition, rotation);
	}
	return result;
}

let currentPosition = 50;
let result = 0;
// console.log(solve1());
console.log(solve2());
