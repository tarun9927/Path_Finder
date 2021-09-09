export function Breadth_First_Search(grid, startNode, finishNode){
    const visitedNodesInOrder=[];
    const unvisitedNodes=[startNode];
    while (!!unvisitedNodes.length){
        const u=unvisitedNodes.shift()
        if (u.isVisited || u.isWall) {continue;}
        u.isVisited=true;
        visitedNodesInOrder.push(u)
        if (u===finishNode) {return visitedNodesInOrder;}
        const neighbors=getNeighbors(u,grid);
        for (const neighbor of neighbors){
            neighbor.previousNode = u;
            unvisitedNodes.push(neighbor);
        }
    }
    return visitedNodesInOrder;

}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }