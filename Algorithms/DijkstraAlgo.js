export function dijkstra(grid, startNode, destinationNode){
    const visitedNodesInOrder = [];
    startNode.distance=0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const ClosestNode = unvisitedNodes.shift();
        if (ClosestNode.isWall) continue;
        if (ClosestNode.distance===Infinity) return visitedNodesInOrder;
        ClosestNode.isVisited=true;
        visitedNodesInOrder.push(ClosestNode);
        if (ClosestNode===destinationNode) return visitedNodesInOrder
        updateUnvisitedNeighbors(ClosestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors){
        neighbor.distance=node.distance+neighbor.weight;
        neighbor.previousNode=node;
    }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors=[];
    const {col,row} = node;
    if (row>0) neighbors.push(grid[row-1][col]);
    if (row<grid.length-1) neighbors.push(grid[row+1][col]);
    if (col>0) neighbors.push(grid[row][col-1]);
    if (col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor=>!neighbor.isVisited);
}

function getAllNodes(grid){
    const nodes=[];
    for (const row of grid){
        for (const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}
