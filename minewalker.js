
let seedrandom = require("seedrandom");

class Space {
	constructor(mine=false, flag=false, mined=false, count=0) {
		this.mine = mine;
		this.flag = flag;
		this.mined = mined;
		this.count = 0;
	}
	setFlag(value=undefined) {
		if (value == undefiend) {
			this.flag = !this.flag;
			return
		}
		this.flag = value;
	}
}

class Minewalker {
	constructor(args={}) {
		this.width = Math.max(args.width, 4) || 8;
		this.height = Math.max(args.height, 4) || 8;
		this.mines = Math.max(args.mines, 1) || Math.max(this.width * this.height / 4, 1);
		this.seed = args.seed || Math.floor(Math.random() * 9999) + 1;
		this.checks = args.checks || [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
		this.map = []
	}
	plantMines(random) {
		for (let mine = 0; mine < this.mines; mine++) {
			let pos;
			do {
				pos = [Math.floor(random() * this.width), Math.floor(random() * this.height)];
			} while (this.map[pos[0], pos[1]].mine);
			this.map[pos[0]][pos[1]].mine = true;
		}
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				for (let check of this.checks) {
					let pos = [x + check[0], y + check[1]];
					if (pos[0] >= 0 && pos[0] < this.width && pos[1] >= 0 && pos[1] < this.height && this.map[pos[0]][pos[1]].mine) {
						this.map[x][y].count++;
					}
				}
			}
		}
	}
	generateMap() {
		let pos = [Math.floor(this.width / 2), Math.floor(this.height / 2)];
		let random = seedrandom(this.seed);
		do {
			this.map = Minewalker.emptyMap(this.width, this.height);
			this.plantMines(random);
		} while (this.map[pos[0]][pos[1]].count || this.map[pos[0]][pos[1]].mine);
	}
	static emptyMap(width, height) {
		let map = [];
		for (let x = 0; x < width; x++) {
			map.push([]);
			for (let y = 0; y < height; y++) {
				map[x].push(new Space());
			}
		}
		return map;
	}
}

module.exports = Minewalker;

