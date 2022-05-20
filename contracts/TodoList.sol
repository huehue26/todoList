// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// truffle init (getting basic files for truffle)
// truffle compile (checking for errors)
// truffle migrate --reset (to reset previous contracts as contracts are immutable)
// truffle console (go to truffle env)
    // todoApp = await TodoList.deployed()
    // todoApp.address
    // account = await web3.eth.getCoinbase() (will give account which is used to transfer ether {The ganache account} )
    // web3.eth.getBalance(account)  (will give balance of account)
// taskCount = await todoApp.tasksCount(account) (as tasksCount is a map it will give us function which we have to extract the count)
// taskCount.toNumber()
// Similarly accesing the tasks
// task1 = await todoApp.tasks(account,0)
// We can also access the elements of the tasks by task1[2],task1[1],task1[0]

contract TodoList {
    struct Task {
        uint id;
        string content;
        bool status;
    }
    event taskCreated (
        uint id,
        string content,
        bool status
    );
    event taskCompleted (
        uint id,
        bool status
    );
    event undoneTaskDone (
        uint id,
        bool status
    );
    mapping(address => mapping(uint => Task)) public tasks;
    mapping(address => uint) public tasksCount;

    constructor() {
        addTask("Wake up early");
    }

    function addTask(string memory _content) public {
        uint taskCount = tasksCount[msg.sender];
        Task memory newTask = Task(taskCount,_content,false);
        tasks[msg.sender][taskCount] = newTask;
        emit taskCreated(taskCount, _content, false);
        tasksCount[msg.sender]++;
    }
    
    function completedTask(uint _id) public {
        Task memory compTask = tasks[msg.sender][_id];
        compTask.status = !compTask.status;
        tasks[msg.sender][_id] = compTask;
        emit taskCompleted(_id, true);
    }

    function undoneTask(uint _id) public {
        Task memory compTask = tasks[msg.sender][_id];
        compTask.status = !compTask.status;
        tasks[msg.sender][_id] = compTask;
        emit taskCompleted(_id, false);
    }

}
