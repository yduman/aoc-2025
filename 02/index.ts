import { readFile } from "node:fs/promises";
import { argv } from "node:process";

const input = await readFile(argv[2] as string, "utf-8");
const ranges = input.split(",").map((s) => s.split("-").map(BigInt));
const results: bigint[] = [];

function isRepeatingPattern(s: string, exactRepetitions?: number): boolean {
	const len = s.length;
	for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
		if (len % patternLen !== 0) continue;
		const pattern = s.slice(0, patternLen);
		const repetitions = len / patternLen;
		if (exactRepetitions !== undefined && repetitions !== exactRepetitions)
			continue;
		if (pattern.repeat(repetitions) === s) {
			return true;
		}
	}
	return false;
}

function solve(repetitions?: number) {
	for (const range of ranges) {
		const start = range[0]!;
		const end = range[1]!;

		for (let i = start; i <= end; i++) {
			const numStr = i.toString();
			if (isRepeatingPattern(numStr, repetitions)) {
				results.push(i);
			}
		}
	}
}

// solve(2);
solve();
console.log(results.reduce((acc, curr) => acc + curr, BigInt(0)));
