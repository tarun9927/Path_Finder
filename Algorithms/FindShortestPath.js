export function getNodesInShortestPathOrder(destinationNode){
    const NodesInShortestPathOrder=[];
    let currentNode=destinationNode;
    while (currentNode!==null){
        NodesInShortestPathOrder.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return NodesInShortestPathOrder;
}