import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra} from '../Algorithms/DijkstraAlgo';
import {Breadth_First_Search} from '../Algorithms/Breadth_first_search';
import {getNodesInShortestPathOrder} from '../Algorithms/FindShortestPath';
import {Depth_First_Search} from '../Algorithms/Depth_First_Search';
import './path_finder.css'

const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const END_NODE_ROW = 10;
const END_NODE_COL = 35;

export default class PathFinder extends Component{
    constructor(){
        super();
        this.state={
            grid:[],
            mouseIsPressed: false
        };
    }
    
    componentDidMount(){
        const grid =getinitialgrid();
        this.setState({grid:grid});
    }

    handleMouseClick(row,col){
        if (this.state.mouseIsPressed){
            this.setState({mouseIsPressed: false});
            return;    
        }
        const newGrid=getNewGridWithWalls(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseEnter(row, col){
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWalls(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    ResetGrid(){
      const grid=getinitialgrid();
      this.setState({grid: grid});
    }

    visualizeDijkstra(){
      const {grid} = this.state;
      const startNode=grid[START_NODE_ROW][START_NODE_COL];
      const destinationNode=grid[END_NODE_ROW][END_NODE_COL];
      const visitedNodesInOrder=dijkstra(grid, startNode, destinationNode);
      const nodesInShortestPathOrder=getNodesInShortestPathOrder(destinationNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBFS(){
      const {grid} = this.state;
      const startNode=grid[START_NODE_ROW][START_NODE_COL];
      const destinationNode=grid[END_NODE_ROW][END_NODE_COL];
      const visitedNodesInOrder=Breadth_First_Search(grid, startNode, destinationNode);
      const nodesInShortestPathOrder=getNodesInShortestPathOrder(destinationNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    
    visualizeDFS(){
      const {grid} = this.state;
      const startNode=grid[START_NODE_ROW][START_NODE_COL];
      const destinationNode=grid[END_NODE_ROW][END_NODE_COL];
      const visitedNodesInOrder=Depth_First_Search(grid, startNode, destinationNode);
      const nodesInShortestPathOrder=getNodesInShortestPathOrder(destinationNode);
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
    
    animate(visitedNodesInOrder, nodesInShortestPathOrder){
      for (let i=0; i<=visitedNodesInOrder.length; i++){
        if (i===visitedNodesInOrder.length){
          setTimeout (() => {
            this.animateShortestPath(nodesInShortestPathOrder);
            for (const row of this.state.grid){
              for (const node of row){
                console.log(node);
              }
            }
          },10*i);
        return;
        }
        setTimeout(() => {
          const node=visitedNodesInOrder[i];
          if ((node.col!==START_NODE_COL || node.row!==START_NODE_ROW) && (node.col!==END_NODE_COL || node.row!==END_NODE_ROW)){
          document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
          }
        },10*i);
      }
    }

    animateShortestPath(nodesInShortestPathOrder){
      for (let i=0; i<nodesInShortestPathOrder.length;i++){
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          if ((node.col!==START_NODE_COL || node.row!==START_NODE_ROW) && (node.col!==END_NODE_COL || node.row!==END_NODE_ROW)){
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }
        }, 50 * i);
      }
    }

    render() {
        const {grid, mouseIsPressed} = this.state;
    
        return (
          <>
            <div className="grid">
              <img src={require('./logo.png')} alt="" />
              {grid.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall, weight,isVisited} = node;
                      return (
                        <Node
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          mouseIsPressed={mouseIsPressed}
                          onClick={(row, col) => this.handleMouseClick(row, col)}
                          onMouseEnter={(row, col) =>
                            this.handleMouseEnter(row, col)
                          }
                          row={row}
                          weight={weight}
                          isVisited={isVisited}></Node>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="nav-bar">
              <button onClick={() => this.ResetGrid()}>
                Reset Grid
              </button>
              <button onClick={() => this.visualizeDijkstra()}>
                Dijkstra's Algorithm
              </button>
              <button onClick={() => this.visualizeBFS()}>
                BFS
              </button>
              <button onClick={() => this.visualizeDFS()}>
                DFS
              </button>
            </div>
          </>
        );
      }
}
const getinitialgrid= () =>{
    const grid=[];
    for (let row=0; row<20; row++){
        const currentRow=[];
        for (let col=0; col<50; col++){
            currentRow.push(createNode(col,row));
        }
        grid.push(currentRow);
    }
    return grid;
};
const createNode=(col,row)=>{
    return {
        col,
        row,
        isStart: row===START_NODE_ROW && col===START_NODE_COL,
        isFinish: row===END_NODE_ROW && col===END_NODE_COL,
        distance: Infinity,
        isWall: false,
        previousNode: null,
        weight:1,
        isVisited: false,
    };
};

const getNewGridWithWalls = (grid, row,col)=>{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col]=newNode;
    return newGrid;
};