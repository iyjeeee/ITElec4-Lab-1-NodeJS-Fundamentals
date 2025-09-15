let names = ["Alice", "Bob", "Charlie", "Eddie", "Frank"];

// Add
names.push("George"); // Add George to the end
console.log(names); //["Alice", "Bob", "Charlie", "Eddie", "Frank", "George"]

// Remove
names.pop(); // Remove the last element
console.log(names); //["Alice", "Bob", "Charlie", "Eddie", "Frank"]

// Update
let index = names.indexOf("Eddie"); // Find the index of "Eddie"
if (index !== -1) // Check if "Eddie" exists
{ 
    names[index] = "Edward"; // Update "Eddie" to "Edward"
    console.log(names); //["Alice", "Bob", "Charlie", "Edward", "Frank"]
}

names.forEach( (x) => { // Check each name
    if (x === "Alice") // If the name is "Alice"
    {
        console.log("Found Alice!"); // Print "Alice"
    }
});

