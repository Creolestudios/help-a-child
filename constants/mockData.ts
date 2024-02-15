import { MenuItem } from "../components/layout/Header/Header";
import { ContentStatus } from "../types/content-types/Status.type";
import { Testimonial } from "../types/content-types/Testimonial.type";

export const MENU_COLS: MenuItem[] = [
  {
    id: "1",
    name: "Kinderen",
    children: [
      {
        id: "cat-1",
        name: "Category",
        children: [
          {
            id: "item-1",
            name: "Menu item c1 1",
            link: "#menuItem",
          },
          {
            id: "item-2",
            name: "Menu item c1 2",
            link: "#menuItem",
          },
          {
            id: "item-3",
            name: "Menu item c1 3",
            link: "#menuItem",
          },
          {
            id: "item-4",
            name: "Menu item c1 4",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Ouders",
    children: [
      {
        id: "cat-2-1",
        name: "Category",
        children: [
          {
            id: "item-2-1",
            name: "Menu item c1 1",
            link: "#menuItem",
          },
          {
            id: "item-2-2",
            name: "Menu item c1 2",
            link: "#menuItem",
          },
          {
            id: "item-2-3",
            name: "Menu item c1 3",
            link: "#menuItem",
          },
          {
            id: "item-2-4",
            name: "Menu item c1 4",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Vrijwilliger",
    children: [
      {
        id: "cat-3-1",
        name: "Category",
        children: [
          {
            id: "item-3-1",
            name: "Menu item c1 1",
            link: "#menuItem",
          },
          {
            id: "item-3-2",
            name: "Menu item c1 2",
            link: "#menuItem",
          },
          {
            id: "item-3-3",
            name: "Menu item c1 3",
            link: "#menuItem",
          },
          {
            id: "item-3-4",
            name: "Menu item c1 4",
            link: "#menuItem",
          },
        ],
      },
    ],
  },
];

export const FORUM_POSTS = [
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
  {
    author: "Mathijs",
    age: 18,
    likes: 126,
    authorType: "Buddy",
    postDate: new Date(),
    tags: ["Tag 1", "Tag 2"],
    title:
      "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
  },
];

export const TEMP_QUOTES: Testimonial[] = [
  {
    id: "test",
    title: "Jongen (14) over zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Ze zorgt ervoor dat ik rustiger ben en niet met stomme dingen in mijn hoofd zit. Dat ik het meteen kan zeggen en alles kwijt kan wat mij dwars zit over de scheiding, en ook over andere dingen. Ik vind het fijn dat ik mijn Buddy daarvoor heb.",
  },
  {
    id: "test",
    title: "Meisje (19) over haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Het is fijn weer even m'n hart te kunnen luchten. De meeste mensen die ik tot nu toe heb gesproken, begrepen het namelijk niet écht. Dan kunnen ze het nog zo lief bedoelen, maar het geeft niet het gevoel dat je begrepen wordt, en dat voelt zo rot. Dankjewel voor al je lieve berichtjes steeds.",
  },
  {
    id: "test",
    title: "Meisje (12) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Ik heb eigenlijk niemand om mee te praten nu over hoe ik me echt voel behalve jij.",
  },

  {
    id: "test",
    title: "Meisje (21) over haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Ik ben zo blij dat ik dingen met mijn Buddy kan delen. Ik weet wel dat ze het niet kan oplossen, maar doordat ik het inspreek is het wel weer uit mijn hoofd en ik weet dat zij er niet over zal oordelen, bedankt daarvoor!",
  },

  {
    id: "test",
    title: "Jongen (12) tegen zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Ik heb super goed nieuws, want toen ik net jou als Buddy kreeg voelde ik me echt niet goed en gewoon super slecht maar nu sinds ik al m'n gevoel heb verteld aan m'n vader voel ik me beter!",
  },

  {
    id: "test",
    title: "Jongen (12) over zijn Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Ze zorgt ervoor dat ik rustiger ben en niet met stomme dingen in mijn hoofd zit. Dat ik het meteen kan zeggen en alles kwijt kan wat mij dwars zit over de scheiding, en ook over andere dingen. Ik vind het fijn dat ik mijn Buddy daarvoor heb. Iemand waar ik contact mee heb, maar ook gewoon lekker mee kan kletsen.",
  },

  {
    id: "test",
    title: "Meisje (21) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Lieve Buddy, ondanks dat we elkaar nog helemaal niet zo lang kennen wil ik je toch laten weten dat je in korte tijd al veel voor me hebt betekend. Het voelt echt alsof ik een zus heb die precies weet wat ik voel. Je geeft me zelfvertrouwen. Dankjewel!",
  },

  {
    id: "test",
    title: "Meisje (10) tegen haar Buddy:",
    author: "",
    date: "",
    date_updated: "",
    user_updated: "Help a child",
    status: "published" as ContentStatus,
    description:
      "Maar nu ben jij een soort van mijn dagboek en het coole van dit dagboek is dat ze terug praat!",
  },
];
