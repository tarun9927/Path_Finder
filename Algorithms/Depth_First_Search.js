export function Depth_First_Search(grid, startNode, DestinationNode){
    const visitedNodesInOrder=[];
    const stack=[startNode];
    while (!!stack.length){
        const current_node=stack[stack.length-1];
        console.log(current_node.row);
        const neighbors=getNeighbors(current_node,grid);
        if (current_node.isVisited || current_node.isWall || !neighbors.length){
            stack.pop();
            continue;
        }
        stack[stack.length-1].isVisited=true;
        visitedNodesInOrder.push(current_node);
        if (current_node===DestinationNode) {break;}
        for (const neighbor of neighbors){
            neighbor.previousNode=current_node;
            stack.push(neighbor);
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