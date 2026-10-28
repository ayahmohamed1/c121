export interface GiftData {
  senderName: string;
  receiverName: string;
  envelopeImage: string;
  cardMessage: string;
  birthdayImage: string;
  birthdayTitle: string;
  birthdayText: string;
  balloonImage: string;
  birthdayWishesTitle: string;
  birthdayWishesMessage: string;
  thingsWeWannaDo: string[];
  loveLetterTitle?: string;
  loveLetterSubtitle?: string;
  loveLetterParagraphs?: string[];
  musicCoverImage: string;
  musicUrl: string;
  songTitle: string;
}

const defaultThings: string[] = [
  " First of all see u again next ramadan please 🙏🏻",
  "travel together any where 🫰🏻",
  "make more and more memories and always be the “trios”",
  "Stay together till the day i see you as a bride and forever ♾️ ❤️‍🩹",
];

export const defaultLoveLetterParagraphs: string[] = [
  "Chipsy gebna motabal😭",
  "A song named “سوا سوا“",
  "3no cafe",
  "Ramadan 2026",
  "Hayber shebin🫰🏻🫰🏻🫰🏻🫰🏻",

];

const jomanaGift: GiftData = {
  senderName: "mariam",
  receiverName: "jomanaa❣️",
  envelopeImage: "/images/envelope-placeholder.png",
  cardMessage: "Check out these awesome surprises made just for you, jomana! ✨",
  birthdayImage: "/images/kid-placeholder.jpg",
  birthdayTitle: "To my favorite person,",
  birthdayText:
    "Hope we have better photos🙏🏻 miss u to the moon bgdd❤️",
  balloonImage: "/images/balloon-19.png",
  birthdayWishesTitle: "Happy 19th Birthday, jomana! 🎂✨",
  birthdayWishesMessage:
    "Happy birthday to my beautiful jomana 🤍🎂 I hope your day is as special and beautiful as you are. I’m so grateful to have you in my life, and I hope this new chapter brings you endless happiness, love, success, and everything your heart wishes for. You deserve all the beautiful things in this world. May we make a million more memories together and stay close no matter what. I love you so much, and I’m so lucky to have you. Happy birthday once again, my girl! 🤍",
  thingsWeWannaDo: defaultThings,
  loveLetterTitle: "things remind me of you",
  loveLetterSubtitle: "To My jomana, With All My Love <3",
  loveLetterParagraphs: defaultLoveLetterParagraphs,
  musicCoverImage: "/images/song-cover.jpg",
  musicUrl: "/music/our-song.mp3",
  songTitle: "Our Special Track",
};

const giftData: Record<string, GiftData> = {
  jomana: jomanaGift,
  ahmed: jomanaGift,
  amir: jomanaGift,
  aya: {
    ...jomanaGift,
    senderName: "Aya",
    cardMessage: "Check out these awesome surprises for YOU!",
  },
};

export default giftData;