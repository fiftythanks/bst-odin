// 1. Build a Node class/factory. It should have an attribute for the key it stores as well as its left and right children.
class Node {
  constructor(key, left = null, right = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }
}

// 2. Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }
  // 4. Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not.
  findNode(value) {
    let previous = null;
    let current = this.root;

    while (value !== current.key) {
      previous = current;
      if (value < current.key && current.left !== null) {
        current = current.left;
      } else if (value > current.key && current.right !== null) {
        current = current.right;
      } else {
        throw new Error("There's no node with such a");
      }
    }

    const parent = previous;
    const target = current;

    return { target, parent };
  }
  deleteItem(value) {
    let isRoot = false;
    let side = 'left';
    const { target, parent } = this.findNode(value);
    if (parent === null) {
      isRoot === true;
    } else if (value > parent.key) {
      side = 'right';
    }

    if (target.left === null && target.right === null) {
      isRoot ? (this.root = null) : (parent[`${side}`] = null);
    } else if (target.left !== null && target.right === null) {
      isRoot ? (this.root = target.left) : (parent[`${side}`] = target.left);
    } else if (target.left === null && target.right !== null) {
      isRoot ? (this.root = target.right) : (parent[`${side}`] = target.right);
    } else if (target.left !== null && target.right !== null) {
      let successor = target.right;
      let successorParent = target;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      target.key = successor.key;

      if (successorParent === target) {
        target.right = successor.right;
      } else {
        successorParent.left = successor.right;
      }
    }
  }
  insert(value) {
    let current = this.root;

    while (
      !(value < current.key && current.left === null) &&
      !(value > current.key && current.left === null)
    ) {
      if (value < current.key) {
        current = current.left;
      } else if (value > current.key) {
        current = current.right;
      } else {
        return;
      }
    }

    if (value < current.key) {
      current.left = new Node(value);
    } else {
      current.right = new Node(value);
    }
  }
  // 6. Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list.
  levelOrder(callback) {
    if (typeof callback !== 'function')
      throw new Error('The argument must be a function!');

    const queue = [this.root];

    // Iterative method
    /* let current = this.root;

    while (queue.length > 0) {
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      callback(current);
      queue.shift();
      current = queue[0];
    } */

    // Recursive method
    function traverse(node) {
      if (queue.length === 0) return;
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      callback(node);
      queue.shift();
      traverse(queue[0]);
    }

    traverse(this.root);
  }
  // 7. Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder.
  inOrder(callback) {
    if (typeof callback !== 'function')
      throw new Error('The argument must be a function!');

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }
  preOrder(callback) {
    if (typeof callback !== 'function')
      throw new Error('The argument must be a function!');

    function traverse(node) {
      if (node === null) return;

      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }
  postOrder(callback) {
    if (typeof callback !== 'function')
      throw new Error('The argument must be a function!');

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }
}

// 3. Write a buildTree(array) function that takes an array of key (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function buildTree(array) {
  if (array.length === 0) return null;

  // Remove duplicates
  array = Array.from(new Set(array));

  // Sort the array
  array.sort((a, b) => a - b);

  const midIndex = Math.floor(array.length / 2);
  const midElement = array[midIndex];

  const left = buildTree(array.slice(0, midIndex));
  const right = buildTree(array.slice(midIndex + 1));

  const root = new Node(midElement, left, right);

  return root;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.key}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const array = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 6, 7, 10, 243412, 12, 3, 5, 29, 0, 11, -55, 99,
  45, 9, 67, 6345, 324,
];
const tree = new Tree(array);
console.log(prettyPrint(tree.root));
tree.inOrder((node) => console.log(node.key));
