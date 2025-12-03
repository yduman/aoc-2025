import { readFile } from "node:fs/promises";
import { argv } from "node:process";

const input = await readFile(argv[2] as string, "utf-8");
const lines = input.split("\n");

function solve1() {
	let result = 0;

	for (const line of lines) {
		let max = 0;
		for (let i = 0; i < line.length; i++) {
			for (let j = i + 1; j < line.length; j++) {
				const jolt = parseInt(line[i]!, 10) * 10 + parseInt(line[j]!, 10);
				max = Math.max(max, jolt);
			}
		}
		result += max;
	}

	return result;
}

function solve2() {
	let result = 0n;

	for (const line of lines) {
		if (line.length === 0) continue;
		let jolt = "";
		let start = 0;
		for (let i = 0; i < 12; i++) {
			const r = 12 - i;
			const end = line.length - r;
			let maxD = "0";
			let maxI = start;
			for (let j = start; j <= end; j++) {
				if (line[j]! > maxD) {
					maxD = line[j]!;
					maxI = j;
				}
			}
			jolt += maxD;
			start = maxI + 1;
		}
		result += BigInt(jolt);
	}

	return result;
}

console.log(solve1());
console.log(solve2());
