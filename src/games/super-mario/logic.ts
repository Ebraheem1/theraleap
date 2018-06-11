import {
  giftX,
  giftY,
  flowerX,
  flowerY,
  obs2X,
  obs2Y,
  giftTaken,
  flowerTaken,
  steelTaken,
  obs2Inc,
  enablSteelTaken,
  enableGiftTaken,
  enableFlowerTaken
} from "./draw";

var game = 0;

export const collisionCheck = (
  marioX: number,
  marioY: number,
  width: number
) => {
  var condition1 = giftX - 20 >= marioX - 50 && giftX - 20 <= marioX + 50;
  var condition2 = giftX + 20 >= marioX - 50 && giftX + 20 <= marioX + 50;
  //Check on the Heart
  //X-Condition
  if ((condition1 || condition2) && !giftTaken) {
    condition1 = giftY + 15 >= marioY - 50 && giftY + 15 <= marioY + 50;
    condition2 = giftY - 15 >= marioY - 50 && giftY - 15 <= marioY + 50;
    //Y-Condition
    if ((condition1 || condition2) && !giftTaken) {
      marioX += 200;
      enableGiftTaken();
      if (marioX >= width - 50) {
        game = 1;
      }
    }
  }
  //Check on the Flower
  condition1 = flowerX - 20 >= marioX - 50 && flowerX - 20 <= marioX + 50;
  condition2 = flowerX + 20 >= marioX - 50 && flowerX + 20 <= marioX + 50;
  if ((condition1 || condition2) && !flowerTaken) {
    condition1 = flowerY + 20 >= marioY - 50 && flowerY + 20 <= marioY + 50;
    condition2 = flowerY - 20 >= marioY - 50 && flowerY - 20 <= marioY + 50;
    if ((condition1 || condition2) && !flowerTaken) {
      marioX -= 80;
      enableFlowerTaken();
      if (marioX <= 0) {
        game = -1;
      }
    }
  }
  //Check on the Steel--This steel is fancy and has nothing to do especially
  //with the treatment, thus we make its damage negligible
  condition1 = obs2X - 20 >= marioX - 50 && obs2X - 20 <= marioX + 50;
  condition2 = obs2X + 20 >= marioX - 50 && obs2X + 20 <= marioX + 50;
  if ((condition1 || condition2) && !steelTaken) {
    condition1 = obs2Y + 15 >= marioY - 50 && obs2Y + 15 <= marioY + 50;
    condition2 = obs2Y - 15 >= marioY - 50 && obs2Y - 15 <= marioY + 50;
    if ((condition1 || condition2) && !steelTaken && obs2Inc > 0) {
      marioX -= 20;
      enablSteelTaken();
      if (marioX <= 0) {
        game = -1;
      }
    }
  }
  return marioX;
};

export const checkGameover = () => {
  var temp = game;
  game = 0;
  return temp;
};
