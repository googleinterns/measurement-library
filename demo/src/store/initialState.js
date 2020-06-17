import airplaneEars from '../images/airplane_ears.png';
import bellyPet from '../images/belly_pet.png';
import bigYawn from '../images/big_yawn.png';
import caught from '../images/caught.png';
import curledFeetsies from '../images/curled_feetsies.png';
import downwardFacingCat from '../images/downward_facing_cat.png';
import eyeBoogies from '../images/eye_boogies.png';
import fluffy from '../images/fluffy.png';
import handsomeCat from '../images/handsome_cat.png';
import hardToCodeWith from '../images/hard_to_code_with.png';
import kitten from '../images/kitten.png';
import lightOfMyLife from '../images/light_of_my_life.png';
import litterNose from '../images/litter_nose.png';
import makinBiscuits from '../images/makin_biscuits.png';
import mirin from '../images/mirin.png';
import pawsUp from '../images/paws_up.png';
import petMyBelly from '../images/pet_my_belly.png';
import phoneBackground from '../images/phone_background.png';
import pinkToeBean from '../images/pink_toe_bean.png';
import shiny from '../images/shiny.png';
import snoozing from '../images/snoozing.png';
import snoring from '../images/snoring.png';
import snuggled from '../images/snuggled.png';
import solemn from '../images/solemn.png';
import spoiled from '../images/spoiled.png';
import stop from '../images/stop.png';
import tinyBlep from '../images/tiny_blep.png';
import tuckedInKitty from '../images/tucked_in_kitty.png';
import whatYouLookinAt from '../images/what_you_lookin_at.png';
import wheresPoe from '../images/wheres_poe.png';


import airplaneEarsThumbnail from '../images/thumbnails/airplane_ears.png';
import bellyPetThumbnail from '../images/thumbnails/belly_pet.png';
import bigYawnThumbnail from '../images/thumbnails/big_yawn.png';
import caughtThumbnail from '../images/thumbnails/caught.png';
import curledFeetsiesThumbnail from '../images/thumbnails/curled_feetsies.png';
import downwardFacingCatThumbnail from '../images/thumbnails/downward_facing_cat.png';
import eyeBoogiesThumbnail from '../images/thumbnails/eye_boogies.png';
import fluffyThumbnail from '../images/thumbnails/fluffy.png';
import handsomeCatThumbnail from '../images/thumbnails/handsome_cat.png';
import hardToCodeWithThumbnail from '../images/thumbnails/hard_to_code_with.png';
import kittenThumbnail from '../images/thumbnails/kitten.png';
import lightOfMyLifeThumbnail from '../images/thumbnails/light_of_my_life.png';
import litterNoseThumbnail from '../images/thumbnails/litter_nose.png';
import makinBiscuitsThumbnail from '../images/thumbnails/makin_biscuits.png';
import mirinThumbnail from '../images/thumbnails/mirin.png';
import pawsUpThumbnail from '../images/thumbnails/paws_up.png';
import petMyBellyThumbnail from '../images/thumbnails/pet_my_belly.png';
import phoneBackgroundThumbnail from '../images/thumbnails/phone_background.png';
import pinkToeBeanThumbnail from '../images/thumbnails/pink_toe_bean.png';
import shinyThumbnail from '../images/thumbnails/shiny.png';
import snoozingThumbnail from '../images/thumbnails/snoozing.png';
import snoringThumbnail from '../images/thumbnails/snoring.png';
import snuggledThumbnail from '../images/thumbnails/snuggled.png';
import solemnThumbnail from '../images/thumbnails/solemn.png';
import spoiledThumbnail from '../images/thumbnails/spoiled.png';
import stopThumbnail from '../images/thumbnails/stop.png';
import tinyBlepThumbnail from '../images/thumbnails/tiny_blep.png';
import tuckedInKittyThumbnail from '../images/thumbnails/tucked_in_kitty.png';
import whatYouLookinAtThumbnail from '../images/thumbnails/what_you_lookin_at.png';
import wheresPoeThumbnail from '../images/thumbnails/wheres_poe.png';


/**
 * The items in the store; each has name, image, cost, and
 * description. Each item is stored along with the quantity in the user's cart
 * and if it is in the user's cart. If the item is not in the cart,
 * the quantity is 0, but the converse is not always true: users that modify
 * how many items are in their cart will usually not want them to
 * disappear immediately.
 *
 * When adding a new item, generate a [v4 UUID](https://www.uuidgenerator.net/version4)
 * and copy the first five characters to serve as the unique item ID.
 * @typedef {!Object<string,
  *      {name:string, image:!Object, cost:number, quantity:number,
  *      inCart:boolean, description:string}>} ItemStore
  */
export const initialState = {
  items: {
    '1jef2': {
      name: 'Airplane Ears',
      image: airplaneEars,
      thumbnail: airplaneEarsThumbnail,
      cost: 25,
      quantity: 0,
      inCart: false,
      description: 'He wants to fly away with your heart.',
    },
    '431ec': {
      name: 'Belly Pet',
      image: bellyPet,
      thumbnail: bellyPetThumbnail,
      cost: 40,
      quantity: 0,
      inCart: false,
      description: 'He finally receives belly pets.',
    },
    'fef33': {
      name: 'Big Yawn',
      image: bigYawn,
      thumbnail: bigYawnThumbnail,
      cost: 60,
      quantity: 0,
      inCart: false,
      description: 'A cuddly yawning cat.',
    },
    'baf98': {
      name: 'Caught',
      image: caught,
      thumbnail: caughtThumbnail,
      cost: 28,
      quantity: 0,
      inCart: false,
      description: 'He\'s been caught hiding in the blankets!',
    },
    'da8e4': {
      name: 'Curled Feetsies',
      image: curledFeetsies,
      thumbnail: curledFeetsiesThumbnail,
      cost: 75,
      quantity: 0,
      inCart: false,
      description: 'Do not disturb. Featuring his pink toe bean!',
    },
    '7c353': {
      name: 'Downward Facing Cat',
      image: downwardFacingCat,
      thumbnail: downwardFacingCatThumbnail,
      cost: 70,
      quantity: 0,
      inCart: false,
      description: 'Beautiful high quality yoga inspiration.',
    },
    'afab5': {
      name: 'Eye Boogies',
      image: eyeBoogies,
      thumbnail: eyeBoogiesThumbnail,
      cost: 65,
      quantity: 0,
      inCart: false,
      description: 'We all feel this way sometimes...',
    },
    'n4if8': {
      name: 'Fluffy',
      image: fluffy,
      thumbnail: fluffyThumbnail,
      cost: 49,
      quantity: 0,
      inCart: false,
      description: 'A whole lot of floof.',
    },
    '7ba94': {
      name: 'Handsome Cat',
      image: handsomeCat,
      thumbnail: handsomeCatThumbnail,
      cost: 99,
      quantity: 0,
      inCart: false,
      description: 'BRAND NEW. Get this stunning print today.',
    },
    'd57fa': {
      name: 'Hard to Code With',
      image: hardToCodeWith,
      thumbnail: hardToCodeWithThumbnail,
      cost: 35,
      quantity: 0,
      inCart: false,
      description: 'Ever tried to do work with a cat laying on you?',
    },
    'a67fe': {
      name: 'Kitten',
      image: kitten,
      thumbnail: kittenThumbnail,
      cost: 45,
      quantity: 0,
      inCart: false,
      description: 'A rare look into Poe as a kitten.',
    },
    'f6ae1': {
      name: 'Light of My Life',
      image: lightOfMyLife,
      thumbnail: lightOfMyLifeThumbnail,
      cost: 59,
      quantity: 0,
      inCart: false,
      description: 'An evocative piece featuring Poe on his tower.',
    },
    '87a7f': {
      name: 'Litter Nose',
      image: litterNose,
      thumbnail: litterNoseThumbnail,
      cost: 49,
      quantity: 0,
      inCart: false,
      description: 'We\'ve all been there.',
    },
    'dsm44': {
      name: 'Makin Bisuits',
      image: makinBiscuits,
      thumbnail: makinBiscuitsThumbnail,
      cost: 37,
      quantity: 0,
      inCart: false,
      description: 'Kneading some biscuit dough.',
    },
    '5b280': {
      name: 'Mirin\'',
      image: mirin,
      thumbnail: mirinThumbnail,
      cost: 80,
      quantity: 0,
      inCart: false,
      description: 'That is the look of a cat that adores you.',
    },
    '3nv89': {
      name: 'Paws Up',
      image: pawsUp,
      thumbnail: pawsUpThumbnail,
      cost: 32,
      quantity: 0,
      inCart: false,
      description: 'This cat has it\'s paws where you can see them.',
    },
    'mv1dd': {
      name: 'Pet My Belly',
      image: petMyBelly,
      thumbnail: petMyBellyThumbnail,
      cost: 46,
      quantity: 0,
      inCart: false,
      description: 'He demands snuggles and belly pets.',
    },
    '45h84': {
      name: 'Phone Background',
      image: phoneBackground,
      thumbnail: phoneBackgroundThumbnail,
      cost: 58,
      quantity: 0,
      inCart: false,
      description: 'Legend has it that some developer had this image as their' +
          'phone background for an entire year.',
    },
    '3h488': {
      name: 'Pink Toe Bean',
      image: pinkToeBean,
      thumbnail: pinkToeBeanThumbnail,
      cost: 120,
      quantity: 0,
      inCart: false,
      description: 'The elusive pink toe bean in all its glory! A true rarity.',
    },
    '1acdc': {
      name: 'Shiny',
      image: shiny,
      thumbnail: shinyThumbnail,
      cost: 82,
      quantity: 0,
      inCart: false,
      description: 'A rare perspective.',
    },
    '4ddff': {
      name: 'Snoozing',
      image: snoozing,
      thumbnail: snoozingThumbnail,
      cost: 64,
      quantity: 0,
      inCart: false,
      description: 'Cats don\'t have to get up in the morning.',
    },
    '5fe55': {
      name: 'Snoring',
      image: snoring,
      thumbnail: snoringThumbnail,
      cost: 75,
      quantity: 0,
      inCart: false,
      description: 'Do cats drool? Find out when you buy this print.',
    },
    '250d4': {
      name: 'Snuggled',
      image: snuggled,
      thumbnail: snuggledThumbnail,
      cost: 95,
      quantity: 0,
      inCart: false,
      description: 'A soft looking inquisitive Poe.',
    },
    'ba731': {
      name: 'Solemn',
      image: solemn,
      thumbnail: solemnThumbnail,
      cost: 57,
      quantity: 0,
      inCart: false,
      description: 'Sometimes it is time for some quiet introspection.',
    },
    'ksd7d': {
      name: 'Spoiled',
      image: spoiled,
      thumbnail: spoiledThumbnail,
      cost: 49,
      quantity: 0,
      inCart: false,
      description: 'All the toys in the world and a nice bed to boot.',
    },
    'dda8e': {
      name: 'Stop!',
      image: stop,
      thumbnail: stopThumbnail,
      cost: 83,
      quantity: 0,
      inCart: false,
      description: 'Put the pencil down.',
    },
    'a1371': {
      name: 'Tiny Blep',
      image: tinyBlep,
      thumbnail: tinyBlepThumbnail,
      cost: 40,
      quantity: 0,
      inCart: false,
      description: 'The tiniest of bleps.',
    },
    '94864': {
      name: 'Tucked In Kitty',
      image: tuckedInKitty,
      thumbnail: tuckedInKittyThumbnail,
      cost: 30,
      quantity: 0,
      inCart: false,
      description: 'How does he do that without thumbs?',
    },
    'hjdf7': {
      name: 'What You Lookin\' At?',
      image: whatYouLookinAt,
      thumbnail: whatYouLookinAtThumbnail,
      cost: 25,
      quantity: 0,
      inCart: false,
      description: 'Move along, nothing to see here.',
    },
    'b442b': {
      name: 'Where\'s Poe?',
      image: wheresPoe,
      thumbnail: wheresPoeThumbnail,
      cost: 15,
      quantity: 0,
      inCart: false,
      description: 'Can you spot him?',
    },
  },
};
