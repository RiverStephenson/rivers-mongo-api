"use strict";
const usernames = [
    'rivstep',
    'treeTrunk',
    'malrosicious',
];
const thoughts = [
    'That is little trinket is interesting',
    'How many licks does it take to get to the center of a tootsie pop?',
    'One, T-hooo, *crunch*',
];
const possibleReactions = [
    'Love This',
    'HUH??',
    'Awesomeee',
];
// Get a random item given an array
// const getRandomArrItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
// Gets a random full name
// const getRandomName = () =>
//   `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;
// Function to generate random thoughts that we can add to the database. Includes thought reactions.
// const getRandomReactions = (int: number) => {
//   let results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       published: Math.random() < 0.5,
//       description: getRandomArrItem(thoughts),
//       buildSuccess: Math.random() < 0.5,
//       reactions: [...getThoughtReactions(1)],
//     });
//   }
//   return results;
// };
// Create the reactions that will be added to each thought
// const getThoughtReactions = (int: number) => {
//   if (int === 1) {
//     return getRandomArrItem(possibleReactions);
//   }
//   const results = [];
//   for (let i = 0; i < int; i++) {
//     results.push({
//       reactionBody: getRandomArrItem(possibleReactions),
//       username: getRandomName(),
//     });
//   }
//   return results;
// };
// Export the functions for use in seed.js
// export { getRandomName, getRandomReactions };
