const prompt = require("prompt-sync")();

const name = prompt("What is your name ? ");
console.log("Hi", name, "Welcome, Your Adventure Begins");

const shouldWePlay = prompt("Do you want to play ? ");

if (shouldWePlay.toLowerCase() === "yes" || "y") {
  console.log("Adventure Awaits !");

  //Game Logic
  const leftOrRight = prompt(
    "You enter a forest, there are two paths, Left or Right,. Make Your Choice..? "
  );
  if (leftOrRight.toLowerCase() === "left") {
    console.log(
      "You venture down the left path, you eventually end up at a river.... Wait there is a bridge further down stream"
    );
    const bridgeCross = prompt("Do You Dare Cross The Bridge..? ");
    if (bridgeCross.toLowerCase() === "yes" || "y") {
      console.log(
        "You hastily attempt to cross the bridge, you notice the supports creek as you step onto the bridge... Just as you leave the bridge it collapses and disappears down the raging river... You made it home!"
      );

    //   Additional Game choices here
    
} else {
      console.log(
        "You decide not to try and cross the bridge.. You wonder the river bank for hours and ultimately end up lost in the woods.."
      );
    }
  } else {
    console.log(
      "You venture down the right path, after walking for what feels like hours, the path gets thinner and less obvious. Before you know it you are struck by a rock on the back of the head, you fall unconscious..."
    );
  }
} else if (shouldWePlay.toLowerCase() === "no" || "n") {
  console.log("Goodbye for now");
} else {
  console.log("Invalid Input ....");
}
