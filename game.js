const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: 'You have been tasked to save the princess. Before you enter the castle, you notice a shimmering necklace on the ground.',
    image: '',
    options: [
      {
        text: 'Take the necklace',
        setState: { TakenNecklace: true },
        nextText: 2,
      },
      {
        text: 'Leave the necklace',
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text: 'With the necklace in hand, you bravely step into the castle. The air is thick with an eerie silence, but you suddenly hear a voice whispering, "Follow the glow."',
    options: [
      {
        text: 'Follow the glow',
        requiredState: (currentState) => currentState.TakenNecklace,
        setState: { TakenNecklace: true, sword: true },
        nextText: 4,
      },
      {
        text: 'Ignore the mysterious sounds and continue forward',
        requiredState: (currentState) => currentState.TakenNecklace,
        setState: { TakenNecklace: true },
        nextText: 4,
      },
    ],
  },
  {
    id: 3,
    text: 'You decided to leave the necklace, but as you enter the castle, you are surrounded by dark energy. The necklace was a protective amulet, and without it, you succumb to the castle\'s enchantments. Your journey ends here.',
    options: [
      {
        text: 'Restart the game',
        nextText: 1,
      },
      {
        text: 'Quit',
        nextText: -1,
      },
    ],
  },
  // ... Previous text nodes ...

{
    id: 4,
    text: 'Following the glow, you find a hidden passage that leads to a small room with a merchant. The merchant offers you a magical sword in exchange for the necklace.',
    options: [
      {
        text: 'Accept the magical sword',
        requiredState: (currentState) => currentState.TakenNecklace,
        setState: { TakenNecklace: false, magicalSword: true },
        nextText: 5,
      },
      {
        text: 'Politely decline the offer',
        requiredState: (currentState) => currentState.TakenNecklace,
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text: 'With the magical sword in hand, you continue your journey through the castle. As you explore further, you encounter a group of shadowy creatures. What will you do?',
    options: [
      {
        text: 'Fight the shadowy creatures with your magical sword',
        requiredState: (currentState) => currentState.magicalSword,
        nextText: 6,
      },
      {
        text: 'Try to sneak past the creatures',
        nextText: 7,
      },
    ],
  },
  {
    id: 6,
    text: 'You bravely engage the shadowy creatures in combat, wielding your magical sword. After a fierce battle, the creatures disperse, and you emerge victorious. Exhausted, you decide to rest for a moment.',
    options: [
      {
        text: 'Rest in the castle',
        nextText: 8,
      },
      {
        text: 'Continue exploring',
        nextText: 8,
      },
    ],
  },
  {
        id: 7,  // The text node that leads to death
        text: 'You attempt to sneak past the shadowy creatures, but they sense your presence. A chase ensues through the castle corridors. In a desperate move, you find a hidden trapdoor and escape to the castle\'s basement.',
        options: [
          {
            text: 'Explore the castle basement',
            nextText: 8,
          },
          {
            text: 'Try to find your way back upstairs',
            nextText: 18,  // This leads to the death text node
          },
        ],
      },
  {
    id: 8,
    text: 'As you explore the castle, you come across a mystical portal. Do you enter it?',
    options: [
      {
        text: 'Enter the portal',
        nextText: 9,
      },
      {
        text: 'Continue exploring the castle',
        nextText: 10,
      },
    ],
  },
  
  {
    id: 9,
    text: 'You find yourself in a parallel dimension filled with strange creatures. They seem friendly. Do you stay or return through the portal?',
    options: [
      {
        text: 'Stay and explore',
        nextText: 11,
      },
      {
        text: 'Return through the portal',
        nextText: 10,
      },
    ],
  },
  {
    id: 10,
    text: 'You continue exploring the castle and discover a hidden treasure room. Choose a treasure to take:',
    options: [
      {
        text: 'Golden Crown',
        nextText: 12,
      },
      {
        text: 'Magical Amulet',
        nextText: 12,
      },
      {
        text: 'Ancient Book',
        nextText: 12,
      },
    ],
  },
  {
    id: 11,
    text: 'You stay in the parallel dimension, exploring its wonders and making new friends. Your journey takes an unexpected turn as you encounter Maeklith, the guardian of this dimension. Do you challenge Maeklith to a battle?',
    options: [
      {
        text: 'Challenge Maeklith',
        nextText: 13,
      },
      {
        text: 'Attempt to negotiate',
        nextText: 14,
      },
    ],
  },
  {
    id: 12,
    text: 'Congratulations! You have found a treasure. Your adventure continues.',
    options: [
      {
        text: 'Continue exploring',
        nextText: 15,
      },
      {
        text: 'Leave the treasure room',
        nextText: 15,
      },
    ],
  },
  {
    id: 13,
    text: 'The battle with Maeklith is fierce, but you manage to slay the guardian. As a reward, you obtain a powerful artifact. Your journey takes an exciting turn.',
    options: [
      {
        text: 'Continue exploring the parallel dimension',
        nextText: 15,
      },
      {
        text: 'Return to the castle',
        nextText: 10,
      },
    ],
  },
  {
    id: 14,
    text: 'You attempt to negotiate with Maeklith, and surprisingly, the guardian agrees to let you explore the dimension peacefully. Your adventure continues with newfound allies.',
    options: [
      {
        text: 'Explore with newfound allies',
        nextText: 15,
      },
      {
        text: 'Return to the castle',
        nextText: 10,
      },
    ],
  },
  {
    id: 15,
    text: 'As you explore further, you come across a room with a locked door. A mysterious key lies nearby. What will you do?',
    options: [
      {
        text: 'Use the mysterious key',
        nextText: 16,
      },
      {
        text: 'Search for another way',
        nextText: 17,
      },
    ],
  },
  {
    id: 16,
    text: 'The mysterious key unlocks the door, revealing a chamber where the princess is held captive. You have successfully found and saved the princess! As a token of gratitude, she gives you a kiss.',
    options: [
      {
        text: 'Celebrate your victory',
        nextText: 19,
      },
      {
        text: 'Continue the adventure',
        nextText: 10,
      },
    ],
  },
  {
    id: 17,
    text: 'Your search for another way takes time, and as you explore further, you encounter unforeseen challenges. The princess\'s fate remains uncertain, and your journey becomes more perilous.',
    options: [
      {
        text: 'Continue the search',
        nextText: 19,
      },
      {
        text: 'Return to the locked door',
        nextText: 16,
      },
    ],
  },
  {
    id: 19,
    text: 'Your celebration is interrupted by a sudden disturbance. see what happens in the next adventure',
    options: [
      {
        text: 'thank you for playing',
        nextText: 20,
      },
      {
        text: 'untill next time',
        nextText: 21,
      },
    ],
  },
]

startGame();