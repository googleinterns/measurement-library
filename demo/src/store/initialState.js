import airplaneEars from '../images/airplane_ears.jpg';
import bellyPet from '../images/belly_pet.jpg';
import bigYawn from '../images/big_yawn.jpg';
import caught from '../images/caught.jpg';
import curledFeetsies from '../images/curled_feetsies.jpg';
import downwardFacingCat from '../images/downward_facing_cat.jpg';
import eyeBoogies from '../images/eye_boogies.jpg';
import fluffy from '../images/fluffy.jpg';
import handsomeCat from '../images/handsome_cat.jpg';
import hardToCodeWith from '../images/hard_to_code_with.jpg';
import kitten from '../images/kitten.jpg';
import lightOfMyLife from '../images/light_of_my_life.jpg';
import litterNose from '../images/litter_nose.jpg';
import makinBiscuits from '../images/makin_biscuits.jpg';
import mirin from '../images/mirin.jpg';
import pawsUp from '../images/paws_up.jpg';
import petMyBelly from '../images/pet_my_belly.jpg';
import phoneBackground from '../images/phone_background.jpg';
import pinkToeBean from '../images/pink_toe_bean.jpg';
import shiny from '../images/shiny.jpg';
import snoozing from '../images/snoozing.jpg';
import snoring from '../images/snoring.jpg';
import snuggled from '../images/snuggled.jpg';
import solemn from '../images/solemn.jpg';
import spoiled from '../images/spoiled.jpg';
import stop from '../images/stop.jpg';
import tinyBlep from '../images/tiny_blep.jpg';
import tuckedInKitty from '../images/tucked_in_kitty.jpg';
import whatYouLookinAt from '../images/what_you_lookin_at.jpg';
import wheresPoe from '../images/wheres_poe.jpg';


import airplaneEarsThumbnail from '../images/thumbnails/airplane_ears.jpg';
import bellyPetThumbnail from '../images/thumbnails/belly_pet.jpg';
import bigYawnThumbnail from '../images/thumbnails/big_yawn.jpg';
import caughtThumbnail from '../images/thumbnails/caught.jpg';
import curledFeetsiesThumbnail from '../images/thumbnails/curled_feetsies.jpg';
import downwardFacingCatThumbnail from '../images/thumbnails/downward_facing_cat.jpg';
import eyeBoogiesThumbnail from '../images/thumbnails/eye_boogies.jpg';
import fluffyThumbnail from '../images/thumbnails/fluffy.jpg';
import handsomeCatThumbnail from '../images/thumbnails/handsome_cat.jpg';
import hardToCodeWithThumbnail from '../images/thumbnails/hard_to_code_with.jpg';
import kittenThumbnail from '../images/thumbnails/kitten.jpg';
import lightOfMyLifeThumbnail from '../images/thumbnails/light_of_my_life.jpg';
import litterNoseThumbnail from '../images/thumbnails/litter_nose.jpg';
import makinBiscuitsThumbnail from '../images/thumbnails/makin_biscuits.jpg';
import mirinThumbnail from '../images/thumbnails/mirin.jpg';
import pawsUpThumbnail from '../images/thumbnails/paws_up.jpg';
import petMyBellyThumbnail from '../images/thumbnails/pet_my_belly.jpg';
import phoneBackgroundThumbnail from '../images/thumbnails/phone_background.jpg';
import pinkToeBeanThumbnail from '../images/thumbnails/pink_toe_bean.jpg';
import shinyThumbnail from '../images/thumbnails/shiny.jpg';
import snoozingThumbnail from '../images/thumbnails/snoozing.jpg';
import snoringThumbnail from '../images/thumbnails/snoring.jpg';
import snuggledThumbnail from '../images/thumbnails/snuggled.jpg';
import solemnThumbnail from '../images/thumbnails/solemn.jpg';
import spoiledThumbnail from '../images/thumbnails/spoiled.jpg';
import stopThumbnail from '../images/thumbnails/stop.jpg';
import tinyBlepThumbnail from '../images/thumbnails/tiny_blep.jpg';
import tuckedInKittyThumbnail from '../images/thumbnails/tucked_in_kitty.jpg';
import whatYouLookinAtThumbnail from '../images/thumbnails/what_you_lookin_at.jpg';
import wheresPoeThumbnail from '../images/thumbnails/wheres_poe.jpg';


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
      quantity: 1,
      inCart: true,
      description: 'He wants to fly away with your heart.',
    },
    '431ec': {
      name: 'Belly Pet',
      image: bellyPet,
      thumbnail: bellyPetThumbnail,
      cost: 40,
      quantity: 1,
      inCart: false,
      description: 'He finally receives belly pets.',
    },
    'fef33': {
      name: 'Big Yawn',
      image: bigYawn,
      thumbnail: bigYawnThumbnail,
      cost: 60,
      quantity: 6,
      inCart: true,
      description: 'A cuddly yawning cat.',
    },
    'baf98': {
      name: 'Caught',
      image: caught,
      thumbnail: caughtThumbnail,
      cost: 28,
      quantity: 1,
      inCart: false,
      description: 'He\'s been caught hiding in the blankets!',
    },
    'da8e4': {
      name: 'Curled Feetsies',
      image: curledFeetsies,
      thumbnail: curledFeetsiesThumbnail,
      cost: 75,
      quantity: 1,
      inCart: false,
      description: 'Do not disturb. Featuring his pink toe bean!',
    },
    '7c353': {
      name: 'Downward Facing Cat',
      image: downwardFacingCat,
      thumbnail: downwardFacingCatThumbnail,
      cost: 70,
      quantity: 1,
      inCart: false,
      description: 'Beautiful high quality yoga inspiration.',
    },
    'afab5': {
      name: 'Eye Boogies',
      image: eyeBoogies,
      thumbnail: eyeBoogiesThumbnail,
      cost: 65,
      quantity: 1,
      inCart: false,
      description: 'We all feel this way sometimes...',
    },
    'n4if8': {
      name: 'Fluffy',
      image: fluffy,
      thumbnail: fluffyThumbnail,
      cost: 49,
      quantity: 0,
      inCart: true,
      description: 'A whole lot of floof.',
    },
    '7ba94': {
      name: 'Handsome Cat',
      image: handsomeCat,
      thumbnail: handsomeCatThumbnail,
      cost: 99,
      quantity: 1,
      inCart: false,
      description: 'BRAND NEW. Get this stunning print today.',
    },
    'd57fa': {
      name: 'Hard to Code With',
      image: hardToCodeWith,
      thumbnail: hardToCodeWithThumbnail,
      cost: 35,
      quantity: 1,
      inCart: false,
      description: 'Ever tried to do work with a cat laying on you?',
    },
    'a67fe': {
      name: 'Kitten',
      image: kitten,
      thumbnail: kittenThumbnail,
      cost: 45,
      quantity: 1,
      inCart: false,
      description: 'A rare look into Poe as a kitten.',
    },
    'f6ae1': {
      name: 'Light of My Life',
      image: lightOfMyLife,
      thumbnail: lightOfMyLifeThumbnail,
      cost: 59,
      quantity: 1,
      inCart: false,
      description: 'An evocative piece featuring Poe on his tower.',
    },
    '87a7f': {
      name: 'Litter Nose',
      image: litterNose,
      thumbnail: litterNoseThumbnail,
      cost: 49,
      quantity: 1,
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
      quantity: 1,
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
