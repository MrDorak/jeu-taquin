const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE ** 2;

export function isSolvable(tiles) {
    let product = 1;
    let nbTilesWithoutLast = TILE_COUNT - 1;
    let nbTilesTotal = nbTilesWithoutLast + 1;
    for (let i = 1; i <= nbTilesWithoutLast; i++) {
        for (let j = i + 1; j <= nbTilesTotal; j++) {
            product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
        }
    }

    return Math.round(product) === 1;
}

export function isSolved(tiles) {
    for (let i = 0, l = tiles.length; i < l; i++) {
        if (tiles[i] !== i) {
            return false;
        }
    }
    return true;
}

export function getMatrixPosition(index) {
    return {
        row: Math.floor(index / GRID_SIZE),
        col: index % GRID_SIZE,
    };
}

export function shuffle(tiles) {
    const shuffledTiles = [
        ...tiles
            .filter(t => t !== tiles.length - 1) // remove last tile from sorting algo
            .sort(() => Math.random() - 0.5),
        tiles.length - 1, // add last tile back, at the last position
    ];

    return isSolvable(shuffledTiles) && !isSolved(shuffledTiles) ? shuffledTiles : shuffle(shuffledTiles);
}

export function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getMatrixPosition(srcIndex);
    const { row: destRow, col: destCol } = getMatrixPosition(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
}

export function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split("=")[0] !== param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}