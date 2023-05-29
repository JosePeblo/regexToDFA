class Edge {
    constructor(next, cost) {
        this.next = next;
        this.cost = cost;
    }
}

class Graph {
    constructor() {
        this.adjList = new Map();
        this.start = null;
        this.end = null;
    }

    /**
     * 
     * @param {String | null} cost 
     * @returns {Graph}
     */
    static newSimpleAutomata(cost){
        const graph = new Graph();

        let size = graph.adjList.size;
        graph.start = size;
        graph.adjList.set(size, []);
        graph.adjList.get(size).push(new Edge(size + 1, cost));
        
        size = graph.adjList.size;
        graph.end = size;
        graph.adjList.set(size, []);

        return graph;

    }

    /**
     * @returns {Graph}
     */
    plus(){
        this.adjList.get(this.end).push(new Edge(this.start, null));
        return this;
    }

    /**
     * @returns {Graph}
     */
    times(){
        this.plus();

        const first = this.start;
        const last = this.end;

        const finish = this.adjList.size;
        const prev = finish + 1;

        this.adjList.set(prev, [new Edge(first, null), new Edge(finish, null)]);
        this.adjList.set(finish, []);
        this.adjList.get(last).push(new Edge(finish, null));

        this.start = prev;
        this.end = finish;
        return this;
    }

    /** 
     * @param {Graph} second 
     */
    concat(second){
        let size = this.adjList.size;
        const firstEnd = this.end;
        const secondStart = second.start + this.adjList.size;
        const secondEnd = second.end + this.adjList.size;
        
        second.adjList.forEach((value, key) => {
            this.adjList.set(key + size, value);
            this.adjList.get(key + size).forEach((elem) => {
                elem.next = elem.next + size;
            });
        });

        this.end = secondEnd;
        this.adjList.get(firstEnd).push(new Edge(secondStart, null));
        return this;
    }

    /** 
     * @param {Graph} second 
     */
    or(second){
        let size = this.adjList.size;
        const firstStart = this.start;
        const firstEnd = this.end;
        const secondStart = second.start + this.adjList.size;
        const secondEnd = second.end + this.adjList.size;

        second.adjList.forEach((value, key) => {
            this.adjList.set(key + size, value);
            this.adjList.get(key + size).forEach((elem) => {
                elem.next = elem.next + size;
            });
        });

        size = this.adjList.size;
        this.adjList.set(size, [new Edge(firstStart, null), new Edge(secondStart, null)]);
        this.adjList.set(size + 1, []);

        this.adjList.get(firstEnd).push(new Edge(size + 1, null));
        this.adjList.get(secondEnd).push(new Edge(size + 1, null));

        this.start = size;
        this.end = size + 1;

        return this;
    }
}

module.exports = Graph;